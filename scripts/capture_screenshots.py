"""Capture live screenshots of every *.paragu-ai.com client site.

Overwrites public/screenshots/{slug}.jpg in the repo with a 1440x900 viewport
shot. Run with the project venv Python.

Usage:
    python scripts/capture_screenshots.py              # capture all
    python scripts/capture_screenshots.py --slug nexa  # capture one

Requires the Python 3.13 venv at C:/Users/kyrian/AppData/Local/Programs/Python/Python313/
to have `playwright` installed (uv pip install --python ... playwright).
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

REPO = Path(__file__).resolve().parent.parent
CLIENTS_JSON = REPO / "lib" / "clients.json"
OUT_DIR = REPO / "public" / "screenshots"
VIEWPORT = {"width": 1440, "height": 900}

# Slugs that have NO live site (return 4xx/timeout) — skip silently
DEAD = {
    "superspuma", "trentina-cerveza", "fun4me-store", "tsuki-restaurante",
    "de-abasto-a-casa", "meal-prep", "rockabar", "cuidadoamiga",
    "salud-abierta", "barbershop-peluqueria", "peluqueria-barbershop",
}

# Map client.slug → subdomain prefix (most are slug itself; special cases below)
SLUG_OVERRIDES = {
    "trentina-cerveza": "treinta-cerveza",
    "tsuki-restaurante": "tsuki",
    "de-abasto-a-casa": "de-abasto-a-casa",
    "meal-prep": "meal-prep",
    "cuidadoamiga": "cuidadoamiga",
    "salud-abierta": "salud-abierta",
    "barbershop-peluqueria": "barbershop-peluqueria",
    "peluqueria-barbershop": "peluqueria-barbershop",
}


def load_clients() -> list[dict]:
    data = json.loads(CLIENTS_JSON.read_text(encoding="utf-8"))
    return data["clients"]


def capture_one(page, url: str, out_path: Path) -> str:
    try:
        page.goto(url, wait_until="networkidle", timeout=20_000)
    except PWTimeout:
        # fall back to domcontentloaded if networkidle never settles
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=15_000)
        except Exception as e:
            return f"FAIL load: {type(e).__name__}: {str(e)[:120]}"

    # let any lazy images settle
    page.wait_for_timeout(800)

    # Scroll to top (in case of sticky offset)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(300)

    page.screenshot(path=str(out_path), type="jpeg", quality=82, full_page=False)
    return "OK"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", help="Capture only one slug")
    ap.add_argument("--limit", type=int, default=0, help="Capture first N (for testing)")
    ap.add_argument("--overwrite", action="store_true", help="Re-capture even if file exists")
    args = ap.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    clients = load_clients()
    if args.slug:
        clients = [c for c in clients if c["slug"] == args.slug]
    if args.limit:
        clients = clients[: args.limit]

    successes, failures, skipped = 0, 0, 0
    t0 = time.time()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport=VIEWPORT, device_scale_factor=1)
        page = context.new_page()

        for c in clients:
            slug = c["slug"]
            if slug in DEAD:
                print(f"  [skip]  {slug} (known dead)")
                skipped += 1
                continue

            subdomain = SLUG_OVERRIDES.get(slug, slug)
            url = f"https://{subdomain}.paragu-ai.com/"
            out = OUT_DIR / f"{slug}.jpg"

            if out.exists() and not args.overwrite and not args.slug:
                print(f"  [exist] {slug} — skipping (use --overwrite to re-capture)")
                skipped += 1
                continue

            print(f"  [run]   {slug} -> {url}")
            status = capture_one(page, url, out)
            if status == "OK":
                successes += 1
                print(f"          wrote {out.name} ({out.stat().st_size // 1024} KB)")
            else:
                failures += 1
                print(f"          {status}")

        browser.close()

    dt = time.time() - t0
    print(f"\nDone in {dt:.1f}s — {successes} ok, {failures} failed, {skipped} skipped")
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
