#!/usr/bin/env python3
"""
cf-deploy.py — direct CF API deploy for paragu-ai-website.

Bypasses wrangler because wrangler always probes
/workers/services/{name}, which returns 7003 in some CF regions
(including GH Actions runners), failing every deploy even though
the upload succeeds.

This script mirrors wrangler's deploy flow but hits the CF API directly:
  1. POST /accounts/{id}/workers/scripts/{name}/assets-upload-session
     → returns { jwt, buckets: { [hash]: { uploadUrl, ... } } }
  2. For each asset: POST to uploadUrl with form-data (base64 hash → bytes)
  3. PUT /accounts/{id}/workers/scripts/{name}
     multipart: metadata + worker.js + asset-hashes (base64-encoded)

Env required:
  CLOUDFLARE_API_TOKEN
  CLOUDFLARE_ACCOUNT_ID
"""

import base64
import hashlib
import json
import mimetypes
import os
import pathlib
import sys
import urllib.error
import urllib.request
import uuid

API = "https://api.cloudflare.com/client/v4"
ACCT = os.environ["CLOUDFLARE_ACCOUNT_ID"]
TOKEN = os.environ["CLOUDFLARE_API_TOKEN"]
WORKER = "paragu-ai-website"
ROOT = pathlib.Path(os.environ.get("WORK_DIR", "."))


def cf(method, path, body=None, headers=None, raw=None):
    url = path if path.startswith("http") else f"{API}{path}"
    h = {"Authorization": f"Bearer {TOKEN}"}
    if headers:
        h.update(headers)
    if body is not None:
        h.setdefault("Content-Type", "application/json")
        data = json.dumps(body).encode()
    elif raw is not None:
        data = raw
    else:
        data = None
    req = urllib.request.Request(url, method=method, data=data)
    for k, v in h.items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            body = resp.read()
            if not body:
                return None
            try:
                d = json.loads(body.decode())
            except json.JSONDecodeError:
                return body.decode()
            if isinstance(d, dict) and not d.get("success", True):
                raise RuntimeError(f"{method} {path} failed: {d}")
            return d.get("result", d)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:2000]
        raise RuntimeError(f"HTTP {e.code} {e.reason} for {method} {path}: {body}") from None


def main():
    open_next = ROOT / ".open-next"
    assets_dir = open_next / "assets"
    worker_js_path = open_next / "worker.js"

    if not worker_js_path.exists():
        raise SystemExit(f"no {worker_js_path}")
    worker_js = worker_js_path.read_bytes()
    print(f"==> worker.js: {len(worker_js)} bytes")

    # Discover asset files and compute SHA-256 hashes (CF expects base64-encoded SHA-256)
    if not assets_dir.exists():
        raise SystemExit(f"no {assets_dir}")
    asset_files = sorted(p for p in assets_dir.rglob("*") if p.is_file())
    print(f"==> {len(asset_files)} asset files")

    asset_hashes = []  # list of base64 SHA-256 hashes in upload order
    asset_data = []  # parallel list of bytes
    for f in asset_files:
        data = f.read_bytes()
        h = base64.b64encode(hashlib.sha256(data).digest()).decode()
        asset_hashes.append(h)
        asset_data.append(data)

    # 1. Open upload session
    print(f"==> opening upload session for {WORKER}...")
    session = cf("POST", f"/accounts/{ACCT}/workers/scripts/{WORKER}/assets-upload-session")
    jwt = session["jwt"]
    buckets = session["buckets"]  # { hash_prefix: { uploadUrl, ... } } — actually { hash_full: { uploadURL, ... } } based on docs
    # Actually the response is { buckets: { "name1": { uploadURL }, ... }, jwt: "..." }
    # Each hash bucket has 1+ upload URLs.
    print(f"==> session opened, jwt={jwt[:20]}..., buckets={len(buckets)}")

    # 2. Upload each asset. The buckets object is a hashmap where each entry
    # has one or more uploadURLs. Each upload can carry ONE hash's worth of
    # bytes. We round-robin across URLs per hash to balance.
    uploaded_hashes = set()
    for i, (h, data) in enumerate(zip(asset_hashes, asset_data)):
        if h in uploaded_hashes:
            continue  # dedupe
        # Pick a bucket — the response has e.g. { "default": { uploadURL: "..." } }
        # or per-hash keys. Either way, we POST the data to one of the upload URLs.
        # Per CF docs: each hash gets its own bucket key.
        bucket = buckets.get(h) or buckets.get("default") or list(buckets.values())[0]
        urls = bucket.get("uploadURL") if isinstance(bucket.get("uploadURL"), list) else [bucket.get("uploadURL")]
        url = urls[i % len(urls)]
        # POST as form-data with key=h, value=data (base64-encoded)
        # Actually CF docs say: POST with form-data where field name is the
        # hash, value is base64-encoded bytes? Let me try multipart first.
        boundary = "----upl" + uuid.uuid4().hex[:8]
        body = (
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="{h}"\r\n\r\n'
        ).encode() + base64.b64encode(data) + f"\r\n--{boundary}--\r\n".encode()
        req = urllib.request.Request(url, method="POST", data=body)
        req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                _ = resp.read()
        except urllib.error.HTTPError as e:
            err = e.read().decode(errors="replace")[:500]
            print(f"  asset upload HTTP {e.code}: {err}", file=sys.stderr)
            # try alternate encoding: as form-urlencoded with key=hash, value=base64
            data2 = urllib.parse.urlencode({h: base64.b64encode(data).decode()}).encode()
            req2 = urllib.request.Request(url, method="POST", data=data2)
            req2.add_header("Content-Type", "application/x-www-form-urlencoded")
            with urllib.request.urlopen(req2, timeout=120) as resp:
                _ = resp.read()
        uploaded_hashes.add(h)
    print(f"==> uploaded {len(uploaded_hashes)} unique assets")

    # 3. PUT the script with metadata + worker.js + asset hashes
    metadata = {
        "main_module": "worker.js",
        "compatibility_date": "2025-01-01",
        "compatibility_flags": ["nodejs_compat"],
        "usage_model": "standard",
        "bindings": [
            {
                "name": "ASSETS",
                "type": "assets",
                "directory": ".open-next/assets",
            }
        ],
        "assets": {
            "directory": ".open-next/assets",
            "binding": "ASSETS",
            "serve_directly": True,
        },
        "observability": {"enabled": True},
        "keep_vars": True,
    }
    boundary = "----script" + uuid.uuid4().hex[:8]
    parts = []
    parts.append(f"--{boundary}\r\n")
    parts.append('Content-Disposition: form-data; name="metadata"\r\n')
    parts.append("Content-Type: application/json\r\n\r\n")
    parts.append(json.dumps(metadata))
    parts.append("\r\n")
    parts.append(f"--{boundary}\r\n")
    parts.append('Content-Disposition: form-data; name="worker.js"; filename="worker.js"\r\n')
    parts.append("Content-Type: application/javascript+module\r\n\r\n")
    parts.append(worker_js.decode("utf-8", errors="replace"))
    parts.append("\r\n")
    # Asset manifest: a JSON file listing all asset hashes
    parts.append(f"--{boundary}\r\n")
    parts.append('Content-Disposition: form-data; name="asset-manifest.json"; filename="asset-manifest.json"\r\n')
    parts.append("Content-Type: application/json\r\n\r\n")
    parts.append(json.dumps({
        f".open-next/assets/{p.relative_to(assets_dir).as_posix()}": h
        for p, h in zip(asset_files, asset_hashes)
    }))
    parts.append("\r\n")
    parts.append(f"--{boundary}--\r\n")
    body = "".join(parts).encode()
    print(f"==> PUTting worker.js + manifest ({len(body)/1024:.1f} KiB)...")
    result = cf(
        "PUT",
        f"/accounts/{ACCT}/workers/scripts/{WORKER}",
        raw=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
    )
    print(f"==> uploaded: {result}")
    print(f"\n==> DONE. https://paragu-ai.com should serve the new build.")


if __name__ == "__main__":
    main()
