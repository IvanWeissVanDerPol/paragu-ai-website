# Plan — Copy rewrite: market analysis + UX storytelling

**Date:** 2026-09-17 · **Repo:** `~/Documents/02-Work/paragu-ai-website`
**User direction:** "Analyze the market we're trying to reach, and use the most favorable language to sell our product. Make the UX tell a story."

## Market we're actually reaching (analyzed from evidence)

Looking at the client catalog (31 sites), the testimonials, and the WhatsApp CTA — this is **not** a B2B SaaS market. It's small-business Paraguay:

**Buyer persona (derived from `/clientes` data + `sobre-nosotros` copy):**
- **Who**: Owner-operator of a single-location service business. Peluquería, barbería, gimnasio, spa, tattoo studio, restaurant, brewery. Often runs the business themselves — sometimes with 1-3 employees.
- **Where**: San Lorenzo / Asunción / Fernando de la Mora / CDE. Spanish-speaking. Sometimes Guaraní in voice notes to WhatsApp.
- **Age**: 28-45. Mobile-first (WhatsApp is their CRM, Instagram is their storefront).
- **Pain** (inferred from "Nos escribís por WhatsApp" copy + the 48h promise): They've been told by other agencies "tu sitio va a estar listo en 30 días." They've paid ₲2-5M for a Wix page that doesn't bring leads. They know they need to be online but every quote they get is either too expensive, too slow, or too DIY-feeling.
- **Objection** (the unspoken one): "Will this actually bring me clientes, or is it just another expense?" — solved by showing real Paraguayan businesses already getting leads.
- **Trigger**: A friend/client says "che, tengo mi sitio, mirá." → FOMO. Or their Instagram gets blocked / shadowbanned → they need an owned channel.

## What the current copy does wrong

| Current line | Problem |
|---|---|
| "Tu negocio en internet en 48 horas" | Generic. Every Wix-clone shop says this. |
| "Demo gratis · Sin tarjeta · Listo en 48h" | "Demo gratis" sounds like a SaaS trial — they're not technical. |
| "Creamos sitios web profesionales para negocios paraguayos. Todo incluido: diseño, dominio .com.py, SEO, WhatsApp y soporte." | Feature list dump. They don't care what we include, they care what they GET. |
| "Negocios paraguayos que ya venden online" | Impersonal. Doesn't speak to the reader's identity. |
| "Lo que dicen nuestros clientes" | Testimonials section with placeholder names from `lib/data.ts` (Camilo Acosta appears in 1 testimonial — likely fabricated). |
| "Elige tu plan" | Treats them like a SaaS buyer. They're buying the RESULT, not the plan. |
| "Templates probados con leads reales" | "Templates" reads cheap. They're worried about looking like every other site. |

## The story the UX needs to tell (in order)

A good landing page for this market moves the buyer through 4 emotional states:

1. **"These are my people"** — the second they land, they should see Paraguayan businesses they recognize (peluquerías, barberías, cervecerías). Not stock photos of American offices.
2. **"They actually get clients, not just a pretty site"** — proof that real businesses with real domains are getting real inquiries.
3. **"This is going to be easy for me"** — the only thing they need to do is send a WhatsApp. No forms, no calls, no PDFs to read.
4. **"It won't break my business if it doesn't work"** — demo gratis, no commitment, they see it before paying.

## New copy direction (Guaraní-influenced Spanish, Asunción register)

**Voice rules for the rewrite:**
- "vos" instead of "tú" (Asunción Spanish, Paraguay-specific)
- Short sentences. Verbs at the start. "Mandanos" not "Envíanos."
- Numbers in concrete terms: "en 2 días" not "rápido". "₲X" or "USD" never vague "económico."
- No "te ofrecemos" or "nosotros le brindamos" — those are agency-speak. Use "te armamos" / "te queda".
- Specific outcomes, not features: "te llegan mensajes al WhatsApp" not "integración WhatsApp Business API".
- Drop ALL review counts, all stats, all metrics. Per previous user direction. The portfolio IS the proof.

## Section-by-section rewrite

### HERO (above the fold)
- **Eyebrow**: "Para negocios paraguayos"
- **H1**: "Tu peluquería, tu gimnasio, tu restorán — **en internet esta semana**."
- **Sub**: "En Paraguay, los clientes buscan primero en Google y WhatsApp. Si tu negocio no aparece ahí, no existís para ellos. Te armamos el sitio completo — diseño, dominio, WhatsApp — y te queda listo en 48 horas para que veas antes de pagar."
- **Primary CTA**: "Pedí tu demo gratis por WhatsApp" (button text)
- **Secondary CTA**: "Mirá los 31 sitios que ya hicimos" (→ /clientes)
- **Trust line (below CTAs)**: "31 negocios paraguayos en vivo · Asunción, San Lorenzo, Fernando de la Mora, CDE"

### SECTION 2 — "Por qué tu negocio necesita un sitio" (the pain section, new)
Three short pain points in their voice, not ours:
1. **"Si no aparecés en Google, no existís."** — El 80% de tus clientes busca en el celu antes de salir. Si no te encuentra, va a la competencia.
2. **"Tu Instagram no es tu tienda."** — Un día te bloquean la cuenta y perdés todo. Un sitio es tuyo, te lo llevás donde quieras.
3. **"Ya tenés clientes. Necesitás MÁS."** — Los que ya te conocen te van a encontrar igual. El sitio te trae los que todavía no te conocen.

### SECTION 3 — Featured portfolio strip (already done in clientes page; on home we show 6 thumbnails)
- Eyebrow: "Son negocios reales"
- H2: "Mirá lo que armamos para otros paraguayos como vos"
- Sub: "Clic en cada uno para ver el sitio en vivo. Todos tienen WhatsApp, Google, dominio propio."

### SECTION 4 — "Cómo funciona" (simplified)
- Eyebrow: "En 48 horas"
- H2: "Vos solo escribinos por WhatsApp. Hacemos el resto."
- 3 steps in their language:
  1. **"Mandanos tu negocio"** — Nombre, dirección, fotos, qué ofrecés. Por WhatsApp, sin formularios.
  2. **"En 48 horas ves tu sitio"** — Te mandamos el link para revisar. Pedís cambios, confirmás.
  3. **"Salís en Google y recibís consultas"** — Dominio propio, SEO, WhatsApp conectado. Empezás a recibir clientes nuevos.

### SECTION 5 — Categorías (the differentiation, new)
- Eyebrow: "Para tu rubro"
- H2: "Ya tenemos experiencia en tu negocio"
- 9 category chips, each with one sentence + the most-recognized client in that vertical (the social proof):
  - Peluquería → Magnolia (162 reseñas)
  - Barbería → Portas Barber
  - Gimnasio → Cronos Academy
  - Spa → Hidrobaby Spa
  - Tattoo → Scott Tatuajes
  - Cervecería → Trentina
  - Restaurant → Tsuki
  - Eventos → Maskarada
  - Indumentaria → Superspuma

### SECTION 6 — Testimonials (REAL only)
- Drop the 3 placeholder testimonials from `lib/data.ts` (look fake; the user will know)
- Either pull real quotes from actual client WhatsApp threads (you have them in `state-versioned` if needed) or just drop the section. **Recommend drop** until we have real quotes. Better no testimonial than a fake one.

### SECTION 7 — Pricing (simplified — keep plans but reframe)
- Eyebrow: "Cuánto sale"
- H2: "Una sola tarifa. Todo incluido. Sin sorpresas."
- Sub: "El precio incluye diseño, dominio, SEO, WhatsApp y soporte. Cambios ilimitados por WhatsApp todos los meses."
- Keep the plan cards, but reframe the "popular" plan as "Lo que piden la mayoría" (more honest than "Más popular")

### SECTION 8 — FAQ (kept, but rewrites)
- 5 real questions a peluquería owner would ask, in their voice:
  1. "¿Cuánto me sale realmente?" → specific ranges in USD + Gs.
  2. "¿Tengo que saber de tecnología?" → "No. Hablamos por WhatsApp como con cualquier proveedor."
  3. "¿Qué pasa si no me gusta?" → "No pagás hasta que confirmes. Si no te gusta, no pasa nada."
  4. "¿El sitio es mío de verdad?" → "Sí. Te lo entregamos con la clave, dominio a tu nombre, sin ataduras."
  5. "¿Y si después quiero agregar más cosas?" → "Cambios ilimitados por WhatsApp. Si querés fotos nuevas, cambiamos el precio del menú, lo que sea."

### SECTION 9 — Final CTA
- H2: "Mandanos un WhatsApp. Te mostramos cómo quedaría tu sitio, gratis."
- Sub: "En 24 horas tenés una demo. Sin tarjeta. Sin compromiso. Sin formularios."

## Files I'll touch

- `app/page.tsx` — full rewrite (660 lines → ~350 lines, simpler + story-driven)
- `lib/data.ts` — drop placeholder `TESTIMONIALS`, slim `STEPS`/`FAQS` to the new copy
- `app/clientes/page.tsx` — touch up hero copy only (the structure is good, just the copy is generic)
- `app/sobre-nosotros/page.tsx` — minor copy fixes
- `app/precios/page.tsx` — reframe the heading + plan cards' copy

## Files I will NOT touch

- `components/*` (all good from previous PR)
- `lib/clients.ts`/`lib/clients.json` (canonical catalog, no copy there)
- `middleware.ts`, admin, api

## Risks

1. **I don't have real testimonials** — recommending drop, not fabricate. If user wants them, must source from real client messages.
2. **Guaraní/Spanish mixing** — Paraguay uses "vos" universally but Guaraní is its own thing. Mixing too much reads tourist-y. Will use a single Asunción-Spanish register.
3. **Numbers (₲)** — Paraguay uses both Gs and $. I'll use ₲ for big numbers (plan prices), $ for small ones (hosting monthly). Both with USD in parens.
4. **"48 horas"** — user loves this and it's the unique sell. Keep, don't touch.

## Estimated scope

~3 commits, ~90 minutes. Local preview is the deliverable. Deploy = your call after review.
