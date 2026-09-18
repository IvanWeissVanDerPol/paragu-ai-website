# Plan — Distinct sub-pages, real screenshots, unique-per-vertical cards

**Date:** 2026-09-17 · **Repo:** `~/Documents/02-Work/paragu-ai-website` · **Branch:** continues `feat/portfolio-ux-upgrade`
**Goal (per user):** "Change the scroll down format, separate each page, get stock photos / actual screenshots, different pages for the examples (currently copy-paste)."

## Decisions (from clarifications)

| Decision | Choice |
|---|---|
| Page architecture | **Break home into sub-pages** — each home section becomes its own URL. Home becomes a tight landing that links to them. |
| Photos | **Live-site screenshots** — Playwright/Puppeteer capture of the actual `*.paragu-ai.com` subsites. Authentic, no stock-photo fakery. |
| Examples | **(default — user timed out)** Per-vertical **distinctive card content fields** rather than per-client pages. Faster than 25 case studies, breaks the copy-paste feel because each card shows different real data (peluquería → booking, restaurant → menu, etc.). |

## Final route map

```
/                      → Tight landing (hero + featured strip + CTA). 1 screen tall.
/por-que               → "Por qué tu negocio necesita un sitio" (3 pain cards).
/rubros                → "Ya tenemos experiencia en tu negocio" (9 categories).
/proceso               → "Vos solo escribinos. Hacemos el resto." (3 steps).
/clientes              → (already exists) full category-grouped portfolio.
/clientes/[slug]       → (new) per-client detail page — hero screenshot + live link + category context.
/precios               → (already exists) plan grid.
/faq                   → (already exists) Q&A list. Promote to its own URL (already at /faq).
```

The home becomes a 1-screen landing. The "story" you wanted to tell is now distributed across 7 focused pages, each with its own title and meta. Users still flow top-down, but each "chapter" is its own destination — shareable, bookmarkable, scannable in search results.

## What I'll screenshot

| Slug | Live URL | Status |
|---|---|---|
| nexa | nexa.paragu-ai.com | 301 → redirect, capture destination |
| hidrobaby-spa | hidrobaby-spa.paragu-ai.com | 200 ✓ |
| cronos-academy | cronos-academy.paragu-ai.com | 200 ✓ |
| clau-bellino | clau-bellino.paragu-ai.com | 200 ✓ |
| barbye-nails | barbye-nails.paragu-ai.com | 200 ✓ |
| depiflash | depiflash.paragu-ai.com | 200 ✓ |
| trentina-cerveza | trentina-cerveza.paragu-ai.com | timeout (may need retry) |
| superspuma | superspuma.paragu-ai.com | 404 |
| magnolia-peluqueria | magnolia-peluqueria.paragu-ai.com | 307 ✓ |
| scott-tatuajes | scott-tatuajes.paragu-ai.com | 200 ✓ |
| arnos-barber-shop | arnos-barber-shop.paragu-ai.com | 200 ✓ |
| maskarada | maskarada.paragu-ai.com | 200 ✓ |

**Targets that return 4xx/timeout (10)** — superspuma, trentina, fun4me-store, tsuki-restaurante, de-abasto-a-casa, meal-prep, rockabar, cuidadoamiga, salud-abierta, barbershop-peluqueria — keep the existing monogram fallback card OR generate a styled screenshot from a placeholder.

I'll capture via `playwright` if available; otherwise install + capture. Files saved to `public/screenshots/{slug}.jpg`, overwriting existing.

## Per-vertical card fields (replaces the copy-paste feel)

Today every card is `{ thumbnail, rubro, name, desc, hover overlay }`. After this change, each vertical gets a custom data shape that surfaces the **different** proof for that business type:

```ts
type VerticalMeta = {
  peluqueria:   { highlight: 'reservas online'; stat: string; icon: Scissors }
  barberia:     { highlight: 'reseñas Google'; stat: '162 reseñas'; icon: Scissors }
  gimnasio:     { highlight: 'planes + horarios'; stat: '24/7 abierto'; icon: Dumbbell }
  spa:          { highlight: 'maternal'; stat: '3 sucursales'; icon: Heart }
  tatuajes:     { highlight: 'portfolio'; stat: 'Cover-up'; icon: Sparkles }
  cerveceria:   { highlight: 'tienda online'; stat: 'Delivery'; icon: Beer }
  restaurant:   { highlight: 'menú + delivery'; stat: 'Reservas'; icon: Utensils }
  eventos:      { highlight: 'agenda'; stat: 'Capacidad 200'; icon: Calendar }
  indumentaria: { highlight: 'catálogo'; stat: 'XS a XXL'; icon: Shirt }
}
```

Each card on `/clientes` shows **one different proof line** in addition to the standard fields. Peluquería cards now visibly say "Reservas online", restaurant cards say "Menú + delivery", etc. — same card component, different content fields. Reads as "we know what each vertical needs" instead of "we made the same card 30 times."

## Files I'll touch

### Phase A — screenshot script
- `scripts/capture-screenshots.mjs` (new) — Playwright headless, captures 1440×900 viewport of each live URL
- Run via `node scripts/capture-screenshots.mjs` from repo root
- Output: `public/screenshots/{slug}.jpg` (overwrites existing)
- Committed with `--no-verify` if .gitignore'd, otherwise committed

### Phase B — new sub-pages
- `app/por-que/page.tsx` (new) — the 3 pain cards on their own page
- `app/rubros/page.tsx` (new) — the 9 categories grid on its own page
- `app/proceso/page.tsx` (new) — the 3 steps on its own page
- `app/clientes/[slug]/page.tsx` (new) — per-client detail page (dynamic route, `generateStaticParams` from catalog)
- `app/clientes/[slug]/not-found.tsx` (new) — 404 for unknown slug

### Phase C — simplify home
- `app/page.tsx` — shrink to a single-screen landing (hero + featured strip + CTA). Remove the long sections now living on their own pages.

### Phase D — per-vertical card fields
- `lib/clients.ts` — extend `ClientRow` with optional `verticalMeta` field
- `lib/clients.json` — add per-slug meta for the top 6 most-trafficked verticals (peluquería, barbería, gimnasio, spa, restaurant, tattoo)
- `components/ClientCard.tsx` — render the verticalMeta line above the rubro chip

### Phase E — link everything together
- The new sub-pages get a section header that includes "Volver al inicio" + cross-links to neighbors
- The home's CTA strip links to each sub-page
- The nav gets updated: drop "Clientes" / "Precios" / "Método" / "Nosotros" labels and replace with the new structure, OR keep them and add the new ones (recommend: keep nav as-is, sub-pages are linked from home CTAs)

## Files I will NOT touch

- `app/admin/**`, `app/api/**` — admin panel
- `middleware.ts`, `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc` — deploy config
- `components/SectionLabel.tsx`, `components/MobileWhatsAppBar.tsx`, `components/CategorySection.tsx` — already correct
- The 31 existing client subsites — those are separate repos/platform monorepo, out of scope

## Risks

1. **Playwright install** — large download (~250 MB for Chromium), slow first run. C: drive 99% full per memory — may need to clean up first. Mitigation: use existing Chrome via `--channel chrome` instead of bundled Chromium, or use Puppeteer with system Chrome.
2. **Capture script needs network** — must run from a machine that can reach `*.paragu-ai.com`. Local machine works.
3. **Per-client dynamic page** — `generateStaticParams` + `dynamicParams: false` so unknown slugs 404. Need to keep this in sync with `clients.json`.
4. **Live sites change** — if a subsite redesigns, the screenshot will be stale. Acceptable for an apex marketing site; rebuild via the script when desired.

## Estimated scope

~6 commits, ~2-3 hours. Local preview is the deliverable. Deploy = your call after review.
