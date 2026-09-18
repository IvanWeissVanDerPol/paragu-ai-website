# Plan: Rebuild paragu-ai.com apex from `IvanWeissVanDerPol/paragu-ai-website`

**Date:** 2026-09-17 · **Owner:** Kyrian / Hermes · **Repo:** `~/Documents/02-Work/paragu-ai-website` · **Goal:** Replace the hand-rolled single-file dark HTML at paragu-ai.com with the clean Next.js 15 site, then point the apex domain at it.

## State of the world

- Live apex (`https://paragu-ai.com/`) = a single static HTML, dark theme, 18 KB, "34 sitios en vivo" directory. Hosted on Cloudflare, `last-modified: Sep 15 2026`. Source not on this machine — only lives in the CF dashboard / VPS at `/opt/data/work/paragu-ai-website/`.
- Repo `IvanWeissVanDerPol/paragu-ai-website` (just cloned, depth 20, last commit `9b0e0fa`) = Next.js 15 static export, Tailwind, Supabase-backed admin, 5 public routes (home, clientes, precios, metodo, faq, sobre-nosotros) + `/admin/*` (gated by `ADMIN_AUTH_SECRET` in middleware).
- `metadataBase` and OG already point at `https://paragu-ai.com` — repo was authored with apex in mind.
- GitHub Actions deploys to **Cloudflare Pages project `paragu-ai-builder`** (not `paragu-ai-website` — name mismatch in deploy.yml). `paragu-ai-builder.pages.dev` currently 404s. Per aiw-org audit 2026-09-14, CI for this repo has had **8 consecutive failures** since 2026-08-14. Need to verify locally before any deploy.
- 34 client subsites (`*.paragu-ai.com`) on Hostinger VPS/Traefik — unaffected.

## Goals (what "cleaner + better UX/UI" means here)

1. Replace the hand-rolled dark directory with the proper Next.js site already in the repo.
2. Visually improve: a single coherent hero + value-prop, a single coherent clients section, clearer pricing path, fewer dead ends.
3. Keep the 34-sites-in-live directory visible (it was the load-bearing proof — don't delete it).
4. Bilingual-ready structure (es default; en skeleton in place).
5. Build green; deploy green; apex resolves to the new site.

## Non-goals (do not touch)

- The 34 client subsites in `paragu-ai-platform` monorepo.
- The admin panel (`/admin/*`) and Supabase wiring.
- Brand identity work beyond a single palette + typography decision (no full redesign).

## Constraints / standing blockers

- **CF Pages deploy target = wrong project name** in `.github/workflows/deploy.yml` (line: `--project-name=paragu-ai-builder`). Either rename CF project, or fix the yml to `--project-name=paragu-ai-website`, or change to `--project-name=paragu-ai-com` — TBD with user.
- **CF Pages has been failing for ~1 month** on this repo (8× consecutive). Must pass `next build` locally before touching CI.
- **CF custom-domain setup** for apex `paragu-ai.com` requires DNS control. If apex is on Cloudflare already (looks like it is — `Server: cloudflare`), then it's just an "Add custom domain" on the Pages project + verifying the apex isn't already serving other content (it is — the static HTML).
- C: drive 99% full (per memory). `node_modules` for this repo will land on C: (~150-300 MB). Avoid extra caches.

## Phases

### Phase 0 — Local build verification (no commits)
**Why first:** 8 failed CI runs means we don't know the site builds. Don't touch anything deploy-related until we know.
1. `cd ~/Documents/02-Work/paragu-ai-website && npm ci` (use `npm`, not pnpm — package-lock.json present, no pnpm-workspace.yaml).
2. `npm run build` — capture first-failure error if any. Likely candidates: missing `ADMIN_AUTH_SECRET` env (middleware 503s the admin route but build should still pass), `next/font` issues, broken imports.
3. `npm run lint` — fix anything that blocks lint.
4. Preview the build: `npx serve out/` and curl `/`, `/clientes/`, `/precios/`, `/metodo/`, `/faq/`, `/sobre-nosotros/` to verify the static export is complete.
5. **Gate:** build green AND all 6 routes return 200 from `out/`.

### Phase 1 — UX/UI cleanup (commits on a branch)
Open a branch: `feat/apex-rebuild-and-cleanup`. Work in small, revertable commits.

**1a — Inventory current state** (no code changes)
- Read each route (`app/page.tsx`, `app/clientes/page.tsx`, `app/precios/page.tsx`, `app/metodo/page.tsx`, `app/faq/page.tsx`, `app/sobre-nosotros/page.tsx`) and `lib/data.ts`.
- List: duplicated sections between home + dedicated routes (e.g. clientes on home vs `/clientes`), broken links, dead CTAs, missing nav targets, gradient overload (memory: no gradients anywhere is the *builder app* rule — not necessarily this repo, but worth checking), mobile-only regressions, missing alt text on ClientImage.
- Output: a single short punch-list, not a long doc.

**1b — Build the new home (`app/page.tsx`)**
Spec for the apex hero + sections (single coherent flow, not the current 8-section sprawl):
- **Hero**: H1 = "Tu negocio en internet en 48 horas" (matches existing metadata), sub = one-sentence value prop, primary CTA = WhatsApp (`waLink()`), secondary = "Ver 34 sitios en vivo" → anchor to `/clientes/`. One hero image or a clean grid of 3-4 client screenshots, not 9.
- **Social proof strip**: logos/names of 6-8 paying clients inline (compact), not the full grid.
- **Cómo funciona (3 pasos)** — already in `STEPS`, keep but tighter.
- **Clientes destacados**: 6 cards max, then a "Ver los 34 sitios en vivo" link.
- **Planes**: brief, link to `/precios/` for full table.
- **FAQ**: 4-5 most-asked, link to `/faq/` for full list.
- **CTA final**: WhatsApp + email.
- **Sticky bottom-bar on mobile** with WhatsApp button (the live page's primary conversion action — don't lose it).

**1c — Audit /clientes page**
- Currently shows ~13 client cards (per README). Live apex lists 34. Update to match the 34 live sites (`CLIENTS` array may need extending — `lib/data.ts` has a `DEMO SITES` block; check what else is live but missing).
- Add category grouping (like the live apex: Gastronomía, Belleza, Eventos, etc.) — currently flat list.
- Each card: screenshot thumbnail (already in `public/screenshots/`), name, rubro, "● EN VIVO" badge, link.

**1d — Visual polish pass**
- Pick one palette + typography decision. Repo has `primary-*` + `brand-*` in tailwind config (looks purple/teal). Confirm, don't add a third.
- Hero gradient: memory says "no gradients" is a builder rule; this repo uses `from-primary-600 to-brand-600` extensively. Leave unless user says to strip — this repo's CLAUDE.md doesn't exist yet (different from builder).
- Footer: dark, contact info, address "San Lorenzo, Central, Paraguay", phone, WhatsApp link, email. Check current `components/footer.tsx` matches the live page footer ("AI Whisperers · Destacamento Cazal, San Lorenzo, Central, Paraguay · +595 991 501444").

**1e — SEO + metadata**
- `metadataBase` is already correct. Verify OG image exists; if not, add `app/opengraph-image.tsx`.
- `sitemap.ts` + `robots.ts` already exist — verify they include all 6 routes.
- Add `alternates.languages` for `es` (default) → no en pages yet, so don't fake it.

**1f — Performance**
- Lighthouse target ≥ 90 perf / 100 a11y on mobile.
- Replace any `next/image` usage with `<img>` (repo sets `images.unoptimized: true` — good for static export, but verify all images use the unoptimized path).
- Check JS bundle size — `app/page.tsx` is 660 lines (per `wc -l`), probably heavy. Profile with `@next/bundle-analyzer` only if needed.

### Phase 2 — Fix the deploy pipeline
1. Decide CF Pages project name with user (recommend: rename CF project `paragu-ai-builder` → `paragu-ai-website`, OR fix yml to match — renaming in CF dashboard is the smaller change).
2. Update `.github/workflows/deploy.yml` accordingly.
3. Add `output: 'export'` to `next.config.ts` (it isn't there currently — only `trailingSlash` + `images.unoptimized`). Without it, `next build` produces a Node server build, not static export, and CF Pages needs `out/` (the yml assumes `./out` already exists). **Verify** by checking `package.json` for `build` script — it just runs `next build`, no `--output export`. **Critical fix.**
4. Add `dist_dir` consistency in wrangler.toml if needed.
5. Trigger CI: `git push origin main`. Watch the run; first attempt probably fails on the export output. Fix. Re-run.

### Phase 3 — Point the apex
1. In CF Pages project → Custom domains → set up `paragu-ai.com`.
2. CF will either auto-detect existing DNS or require CNAME / A record edits. Apex requires A/AAAA records (not CNAME).
3. **Critical:** before pointing, remove or redirect the current static HTML at the apex. If both CF Pages and the old static file claim the apex, behavior is undefined. Find what serves the current static file (CF Pages project? KV? Worker?) and either delete that origin or redirect it to the new site.
4. Verify: `curl -sI https://paragu-ai.com/` returns CF Pages headers (typically `server: cloudflare` + new project name).

### Phase 4 — Verify + ship
1. Smoke-test all 6 routes against `https://paragu-ai.com/`.
2. Compare with old live page (archive a copy to `docs/apex-archive-2026-09-17.html` for reference, then delete source).
3. Lighthouse on apex.
4. Open PR on GitHub, get user approval, merge to `main`, watch deploy.
5. **Do NOT delete the old static file origin until the new site has been live ≥ 24h** with no regressions.

## Risks / unknowns I need answers for before starting

1. **CF Pages project name.** What's the correct target — rename existing `paragu-ai-builder` to `paragu-ai-website`, or change the yml? (Default: rename — fewer files change.)
2. **Old static HTML origin.** What currently serves the dark page at paragu-ai.com — a CF Pages project, a Worker, R2, or something else? Without CF dashboard access I can't tell. Need user to check.
3. **DNS control.** Who controls the `paragu-ai.com` zone — Cloudflare already? If so, no registrar changes needed for the apex move.
4. **34 live sites vs 13 in `CLIENTS`.** The data file lists 13 demo clients + some paying ones. The live apex lists 34. Should I source the full 34 from the platform monorepo (`apps/*/package.json` names + URLs) and merge in? Default: yes, single-source from a shared `clients.json` so the platform monorepo and the apex stay in sync.

## Files I'll touch (planned)

- `.github/workflows/deploy.yml` — fix project name, ensure export build
- `next.config.ts` — add `output: 'export'`
- `app/page.tsx` — rewrite hero + reduce sections
- `app/clientes/page.tsx` — add category grouping, expand to 34
- `app/globals.css` — only if a polish pass needs it
- `lib/data.ts` — extend CLIENTS to 34 (or move to `lib/clients.json` for cross-repo sync)
- `components/nav.tsx`, `components/footer.tsx` — minor copy fixes
- `app/opengraph-image.tsx` — new, if missing

## Files I will NOT touch

- `app/admin/**` — admin panel, gated, out of scope
- `lib/admin-*`, `lib/supabase-admin.ts` — backend wiring, out of scope
- `middleware.ts` — admin auth, out of scope
- `wrangler.toml`, `nginx.conf` — infra, only touch if Phase 2 needs it
- Anything under `supabase/`
- Any `reports/` or `docs/` content

## Estimated scope

~15-25 commits, 2-3 hours of careful work, 1 PR. Doable in one session if build verification passes in Phase 0. If `next build` is broken, add 1-2 hours of unblocking.

## Definition of done

- [ ] `npm run build` exits 0 with `out/` produced
- [ ] All 6 routes return 200 from a local static server
- [ ] PR open with all phase-1 commits, branch pushed
- [ ] CF Pages project deploys green on `main`
- [ ] `https://paragu-ai.com/` serves the new site (verified via curl + browser)
- [ ] 34 client cards present on `/clientes/` matching the live list
- [ ] Mobile Lighthouse ≥ 90 perf / 100 a11y
- [ ] Old static file origin removed (after 24h soak)
