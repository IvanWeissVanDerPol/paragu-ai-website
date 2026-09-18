# Plan — ParaguAI apex UX/UI upgrade

**Date:** 2026-09-17 · **Repo:** `~/Documents/02-Work/paragu-ai-website` · **Branch:** will branch off main as `feat/portfolio-ux-upgrade`
**Goal (per user message):** "Better thumbnails, separate each section into a different site, delete any unnecessary metric, text boxes that pop with strong contrast, show the best of our webdesign."

## State of the world

- Apex rebuild PR-equivalent (commit `e48270e`, OpenNext deploy pipeline) is **merged to main** ✅
- Local dev server runs at `http://localhost:3000` (background session `proc_a79fe2cdb239`)
- Live CF deploy is blocked on `CLOUDFLARE_API_TOKEN` repo secret (not our blocker — user handles)
- `app/page.tsx` is 660 lines (heavy). `lib/data.ts` is 575 lines. `app/clientes/page.tsx` is 99 lines, 1 section, 1 grid, no grouping.
- `public/screenshots/` has 45 entries (some `.svg`, some `.jpg`). All cards currently use `/screenshots/{slug}.jpg` via `<ClientImage>`.
- Live `paragu-ai.com` lists **34 sites** in category groups (Gastronomía, Belleza, Eventos y Espacios, etc.). Our `lib/data.ts CLIENTS` has ~25 entries, missing the cross-repo ones the live page had.
- Current `app/page.tsx` has 8 sections (Hero, Logos, Features, Steps, Portfolio, Plans, Testimonials, FAQ, CTA). Per user: split into "different sites" — i.e. one section per category.

## What "best of our webdesign" means here

Looking at the existing repo + the platform monorepo's `apps/nexa-paraguay` + `apps/dra-gabriela`:

- **Strong contrast text boxes**: solid dark cards (`bg-gray-900` or category-tinted) with white text + thin border + inner glow on hover. Used by dra-gabriela's tinted sections.
- **Sticky bottom-bar WhatsApp** on mobile (live apex's primary conversion action).
- **Section-level anchors + category navigation** so the page reads like a Wix-style site with distinct "pages" per category.
- **No big stat counters** — delete "206 reseñas", "162 reseñas Google", "6+ sitios en producción", "34 sitios en vivo", etc. Per user: "delete any unnecessary metric". Keep the count of "Sitios en vivo" once on the hero (proof), drop per-site Google review counts and any stats that don't add to conversion.
- **Bigger, sharper thumbnails**: 16:10 aspect, object-cover, ring-1 ring-gray-200, hover scale 1.03 + shadow lift, with a subtle "Ver sitio →" overlay on hover.
- **Category-tinted chips**: each card's chip matches the section's accent color (Belleza = rose-50, Gastronomía = amber-50, Eventos = violet-50, etc.) so the page reads as themed blocks, not a flat grid.
- **No gradients** for body surfaces (per the builder repo's rule). Gradients reserved for CTAs only.

## Phases

### Phase 1 — Branch + asset inventory
1. `git checkout -b feat/portfolio-ux-upgrade` from main
2. List `public/screenshots/` size + dimensions. Anything missing gets a fallback SVG card.
3. Pull the **34-site canonical list** from `paragu-ai-platform/apps/*/package.json` (the apex live page's source of truth) and write `lib/clients.json` so the platform monorepo and apex stay in sync. Each entry: `name`, `slug`, `url`, `rubro`, `category`, `screenshot`, `order`.
4. Map each site to a category (Belleza, Gimnasio/Fitness, Gastronomía, Eventos, Salud/Spa, Servicios Profesionales, Retail, Indumentaria, Eventos Infantiles). Default: 9 categories, ~3-4 sites each.

### Phase 2 — `app/clientes/page.tsx` (the "best of our webdesign" page)
Replace the flat grid with category sections. Each section is its own "page" within the page:

```
<main>
  <Hero — "34 sitios en vivo" + WhatsApp CTA + Ver por categoría nav>
  <CategoryNav — pill list, scroll-spy, sticky>
  <Section id="belleza" colorTheme="rose">
    <SectionHeader — category name, count, accent line>
    <CardGrid 3 cols — bigger thumbnails, hover lift, tinted chip>
  </Section>
  …repeat 8 more categories…
  <FinalCTA — WhatsApp>
</main>
```

Each section uses a **distinct accent color** so they're visually separable. Cards:
- 16:10 aspect, ring-1, hover:scale-[1.03] + shadow-2xl + a 4px bottom border in the category color
- chip in `bg-{color}-50 text-{color}-700` (not the current flat `bg-gray-50 text-gray-500`)
- name + rubro only — **drop `desc`** on the card; show on hover overlay (per "delete any unnecessary metric")
- "Ver sitio →" only on hover, not always visible

### Phase 3 — Strip metrics from `lib/data.ts` + `lib/getSortedClients.ts`
- Remove `desc` field references where they were just stats (reseñas, leads count, etc.)
- Keep `desc` only if it's a one-line value prop, not a metric
- Same on `app/sobre-nosotros` — the "6+ sitios en producción", "48h tiempo promedio", "99.9% uptime" stats strip goes. Replace with the single sentence "34 sitios en vivo" + a category link.

### Phase 4 — Home (`app/page.tsx`) simplification
Current home has 8 sections. Per user "separate each section into a different site" — interpret as **home should be a single tight pitch**, with categories living on `/clientes`:
- Hero (1 sentence, WhatsApp CTA, "Ver 34 sitios" → `/clientes`)
- 3 proof points (no metrics — just "Sitios reales", "48h entrega", "Hecho en Paraguay")
- Single "Destacados" row (6 cards, no category chips, just a thumbnail strip)
- Final WhatsApp CTA

Drop from home: Plans, Features grid (8 cards), Testimonials, full FAQ. Move FAQ + Plans to dedicated pages (already exist — just stop duplicating them on home).

### Phase 5 — Sticky mobile WhatsApp bar
Component `<MobileWhatsAppBar />`, fixed bottom on `<md`, hidden ≥md. One component, used on every public route. Reuses `waLink()`.

### Phase 6 — Component extraction
- Pull `CategorySection` (header + grid) into `components/CategorySection.tsx`
- Pull `ClientCard` into `components/ClientCard.tsx` (replaces inline `<a>` in clientes + home)
- Pull `SectionLabel` into `components/SectionLabel.tsx` (reused everywhere)
- These let `/clientes` and the home use the same card language.

### Phase 7 — Verify locally
1. `npm run lint` → green
2. Reload `localhost:3000`, check `/`, `/clientes`, scroll through every category section, check mobile viewport (Chrome devtools 375px)
3. Verify WhatsApp sticky bar shows on mobile, hidden on desktop
4. Verify all 34 sites load (no broken images — fallback SVG if missing screenshot)

### Phase 8 — Commit + push
- One PR with the design system refactor + clientes rebuild + home simplify + sticky bar
- Commit per phase (5-6 commits)
- Open PR, wait for user review, merge when user confirms

## Files I'll touch

- `lib/data.ts` — slim `desc` field, drop stats
- `lib/clients.json` (new) — canonical 34-site list
- `lib/getSortedClients.ts` — read from JSON
- `app/clientes/page.tsx` — full rewrite (category sections)
- `app/page.tsx` — simplify (drop sections, single featured row)
- `app/sobre-nosotros/page.tsx` — drop stat strip
- `app/layout.tsx` — add `<MobileWhatsAppBar />`
- `components/MobileWhatsAppBar.tsx` (new)
- `components/CategorySection.tsx` (new)
- `components/ClientCard.tsx` (new)
- `components/SectionLabel.tsx` (new)
- `tailwind.config.ts` — verify `primary`, `brand`, `rose`, `amber`, `violet`, `emerald` scales (Tailwind defaults if missing)
- `public/screenshots/` — add fallback `placeholder.svg` if needed

## Files I will NOT touch

- `app/admin/**`, `lib/admin-*`, `lib/supabase-admin.ts`, `supabase/`, `middleware.ts` — admin & API, out of scope
- `open-next.config.ts`, `wrangler.jsonc`, `next.config.ts` — deploy config, already merged
- `components/nav.tsx`, `components/footer.tsx` — only copy fixes if needed, not design

## Risks / unknowns

1. **34 sites vs the ~25 in `lib/data.ts`.** Need to source the rest from `paragu-ai-platform/apps/*/package.json`. The categories the live apex used are my best guess — may need to adjust.
2. **No screenshots for some sites** (some live subsites don't have a `public/screenshots/*.jpg` in this repo). Need a fallback strategy — solid-color card with the site name + first letter monogram.
3. **Color per category** — needs to pass contrast on white backgrounds AND on dark sections. I'll lock the palette before committing and check WCAG AA for each chip + heading.
4. **No gradients rule conflict** — current home uses them heavily. If user wants strict no-gradient, that's a bigger lift; I'll ask if not sure, but default to "no gradients on body surfaces, keep on CTA buttons only" (same rule as builder repo).

## Estimated scope

~6 commits, ~2 hours, 1 PR. Local preview is the deliverable; merge + deploy is your call after review.
