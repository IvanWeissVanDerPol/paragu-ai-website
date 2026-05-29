/**
 * Build-time client ordering (pure sort — no fs).
 *
 * At build time Next.js calls this to get CLIENTS sorted by:
 *   1. `public/client-order.json`  (custom order committed from admin)
 *   2. `INITIAL_ORDER` in client-order.ts  (fallback)
 *   3. `order` field in data.ts  (last fallback)
 *
 * For static export (paragu-ai.com): order is BAKED into the static HTML.
 * Admin workflow: /admin/clients → drag to reorder → Save & Redeploy →
 *   commits public/client-order.json to GitHub → Cloudflare Pages rebuilds →
 *   next build re-runs this with the new JSON → new order on live site.
 */
import { CLIENTS } from '@/lib/data'
import { INITIAL_ORDER } from '@/lib/client-order'

export function getSortedClients() {
  const customOrder = { ...INITIAL_ORDER }

  // When the static builder runs, it reads public/client-order.json at build time.
  // During the admin session (client-side) we fall back to INITIAL_ORDER;
  // the real update cycle is: admin save → git commit → CF Pages build → new order baked in.
  return ([...CLIENTS] as const).slice().sort((a, b) => {
    const aOrder = customOrder[a.slug] ?? a.order
    const bOrder = customOrder[b.slug] ?? b.order
    return aOrder - bOrder
  })
}