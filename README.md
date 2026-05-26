# ParaguAI Website

Sitio web público de ParaguAI — vitrineo de clientes, precios y método.

## Tech stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Deployed on**: Cloudflare Pages

## Setup local

```bash
npm install
npm run build
# open out/index.html or serve with any static server
```

## GitHub Secrets necesarios

| Secret | Valor |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Token de Cloudflare con permiso Pages Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID de Cloudflare |
| `NEXT_PUBLIC_WHATSAPP` | `595981324569` |

## Estructura

```
app/
  page.tsx          → Landing (hero, features, clientes preview, pricing, FAQ)
  clientes/         → Showcase de los 13 clientes reales
  precios/          → Tabla comparativa de planes
  metodo/           → Los 3 pasos del proceso
  faq/              → FAQ
  layout.tsx        → SEO + fonts
  globals.css       → Tailwind layers + custom components

components/
  nav.tsx           → Fixed nav con mobile drawer
  footer.tsx        → Footer oscuro

lib/
  data.ts           → Todo el contenido real (planes, clientes, features, FAQ)
  utils.ts          → waLink(), constante WHATSAPP

public/screenshots/ → SVG screenshots de los 13 sitios reales
public/favicon.svg → Favicon SVG
```

## Deploy

Push a `main` → GitHub Actions deploya automáticamente a Cloudflare Pages.
