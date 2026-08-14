# Supabase 2026 Secret Proxy — Deploy Runbook (paragu-ai-website)

The proxy lives at `supabase/functions/paragu-proxy/` in this repo. It holds
the Supabase 2026 `sb_secret_*` key in the Edge Function runtime and forwards
browser requests with the user's JWT preserved for RLS.

## When you need this

- Migrating to Supabase 2026 (key format `sb_publishable_*` / `sb_secret_*`)
- Browser-side code does `supabase.from('...').select(...)` and gets
  `401 "Secret API key required"` even though the app boots
- You want a hard guarantee that `sb_secret_*` never reaches the browser bundle

## When you do NOT need this

- The app is server-side rendered (this Next.js + Cloudflare Pages app does
  not actually need it today — all Supabase calls go through `/api/admin/*`
  API routes, which use `SUPABASE_SERVICE_ROLE_KEY` server-side only).
- You're still on legacy JWT keys (`anon` / `service_role`).

## 1. Install the Supabase CLI (one-time)

```bash
# macOS
brew install supabase/tap/supabase

# Linux
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sh

# Verify
supabase --version
```

## 2. Log in (one-time per machine)

```bash
supabase login
# Opens browser to supabase.com/dashboard/account/tokens
# Generate a personal access token (any name), paste it
```

## 3. Link the project (one-time)

```bash
supabase link --project-ref <your-ref>
```

Get the `<your-ref>` from the Supabase dashboard URL:
`https://supabase.com/dashboard/project/<your-ref>`

## 4. Deploy the proxy

```bash
supabase functions deploy paragu-proxy --project-ref <your-ref>
```

Expected output:

```
Deploying Function paragu-proxy (size: ~3 KB)
Function paragu-proxy already exists, updating
Building paragu-proxy
Bundling inlined imports
Deploying to cloud...
Deployed Function paragu-proxy in <N>s
```

## 5. Set ALLOWED_ORIGIN (CORS)

```bash
supabase secrets set ALLOWED_ORIGIN=https://paragu-ai.com \
  --project-ref <your-ref>
```

Production should pin to the exact frontend origin. Development can use `*`
(the function falls back to `*` if `ALLOWED_ORIGIN` is unset).

## 6. Verify the secret key is auto-injected

The 2026 keys `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are auto-injected
into Edge Function runtime. The function logs "missing" at boot if either
is unset.

```bash
supabase functions logs paragu-proxy --tail
```

If you see "SUPABASE_SECRET_KEY missing", set it manually:

```bash
supabase secrets set SUPABASE_SECRET_KEY='sb_secret_<rest of key>' \
  --project-ref <your-ref>
```

**The secret key never goes in the frontend env vars.** It lives only in
`supabase secrets set`.

## 7. Smoke-test the proxy

```bash
curl -i 'https://<your-ref>.supabase.co/functions/v1/paragu-proxy/auth/v1/settings' \
  -H 'apikey: sb_publishable_<key>'
```

Expected: `200 OK` with JSON containing `mailer_autoconfirm`, `site_url`,
`disable_signup`, etc.

Failure modes:
- `404` — function didn't deploy. Run `supabase functions list`.
- `5xx` — boot error. Run `supabase functions logs paragu-proxy --tail`.
- Connection refused — wrong project ref.

## 8. Point the frontend at the proxy (only if you actually have browser-side Supabase)

| Env var | Value |
|---|---|
| `VITE_SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) | `https://<your-ref>.supabase.co/functions/v1/paragu-proxy/` (**trailing slash!**) |
| `VITE_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) | `sb_publishable_<rest of key>` (unchanged) |

**For this repo today**: the Next.js app already uses
`NEXT_PUBLIC_SUPABASE_URL` directly (no proxy) and
`SUPABASE_SERVICE_ROLE_KEY` server-side. The proxy is a **defensive layer**
ready to use if the app ever gains browser-side Supabase usage.

If you DO flip the URL to the proxy, change it in **both** the local
`.env.local` and the Cloudflare Pages environment variables, then redeploy.

## 9. Run the contract tests

```bash
deno test --allow-net supabase/functions/paragu-proxy/proxy.test.ts
```

Expected: 11 passing tests (10 contract tests + 1 trailing-slash regression).

## 10. Update the proxy

After editing `supabase/functions/paragu-proxy/index.ts`:

```bash
supabase functions deploy paragu-proxy --project-ref <your-ref>
```

Supabase Edge Functions support versioning automatically. Old invocations
continue using the previous version for a short window during the rollout.

## What NOT to do

- Don't paste `sb_secret_*` in Cloudflare Pages env vars, in chat, in
  commit messages, or anywhere else. It lives only in `supabase secrets set`.
- Don't disable the trailing slash on the proxy URL — see
  `proxy.test.ts` regression test for why.
- Don't add `apikey: <secret>` to a request from the browser. The proxy
  adds the secret itself; the browser only sends the user's JWT.
- Don't remove the CORS preflight handler. Without it, browsers refuse
  POST requests before the function runs.
- Don't delete `_shared/cors.ts`. The Supabase CLI auto-bundles it from
  `../_shared/cors.ts` based on the import statement.

## Files added by this skill

```
supabase/functions/
  paragu-proxy/
    index.ts          — the Edge Function source
    proxy.test.ts     — 11 contract tests
  _shared/
    cors.ts           — shared CORS helper
docs/
  supabase-proxy-deploy.md   — this file
```

## Related skills

- `audit-workflow-pr-before-merge` — workflow audit
- `operator-handoff-runbook` — single-page deploy summary
- `hermes-agent-skill-authoring` — for authoring new SKILL.md files