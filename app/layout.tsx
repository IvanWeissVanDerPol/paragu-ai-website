import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://paragu-ai.com'),
  title: {
    default: 'ParaguAI — Tu negocio en internet en 48 horas',
    template: '%s · ParaguAI',
  },
  description:
    'Sitios web profesionales para negocios paraguayos. Diseño, dominio .com.py, SEO, WhatsApp y soporte incluido. Demo gratis.',
  keywords: [
    'sitio web Paraguay',
    'web para negocios',
    'peluquería web',
    'gimnasio web Paraguay',
    'crear web',
    'dominio .com.py',
    'WhatsApp бизнес',
    'SEO Paraguay',
  ],
  authors: [{ name: 'ParaguAI Builder' }],
  creator: 'ParaguAI',
  openGraph: {
    type: 'website',
    locale: 'es_PY',
    url: 'https://paragu-ai.com',
    siteName: 'ParaguAI',
    title: 'ParaguAI — Tu negocio en internet en 48 horas',
    description:
      'Creamos sitios web profesionales para negocios paraguayos. Todo incluido, sin compromiso.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ParaguAI — Tu negocio en internet en 48 horas',
    description: 'Sitios web profesionales para negocios paraguayos.',
    creator: '@paragu_ai',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Cloudflare Web Analytics — privacy-friendly, no cookies */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={"{\"token\": \"b2fd8c3a8a2f4d8e9c1b3a4d5e6f7g8h\"}"}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
