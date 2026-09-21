import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ClientCard, type ClientCardData } from '@/components/ClientCard'
import { waLink } from '@/lib/utils'
import {
  getAllClients, RUBROS, SLUGS_WITH_SCREENSHOT,
} from '@/lib/clients'

export const metadata: Metadata = {
  title: 'Sitios en vivo · ParaguAI',
  description:
    'Sitios reales que ya venden online con ParaguAI. Peluquerías, barberías, gimnasios, spas, gastronomía, eventos y más — todos construidos y mantenidos por nosotros.',
  alternates: { canonical: '/' },
}

function toCardData(c: ReturnType<typeof getAllClients>[number]): ClientCardData {
  return {
    name: c.name,
    slug: c.slug,
    url: c.url,
    rubro: RUBROS[c.slug] ?? c.category,
    desc: c.desc,
    category: c.category,
    accent: c.accent,
    hasScreenshot: SLUGS_WITH_SCREENSHOT.has(c.slug),
  }
}

export default function HomePage() {
  const featured = getAllClients()
    .filter(c => SLUGS_WITH_SCREENSHOT.has(c.slug))
    .slice(0, 6)
    .map(toCardData)

  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="mx-auto mb-10 max-w-6xl px-5 md:mb-14">
          <div className="rounded-3xl bg-gray-950 px-6 py-12 text-white md:px-12 md:py-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Portafolio público
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Crea tu sitio web para pymes.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Creamos tu sitio web — para tu peluquería, tu gimnasio, tu restaurante,
              tu pyme. Con dominio propio, SEO y WhatsApp. Hecho en Paraguay, para
              Paraguay.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink('Hola, vi el portafolio de ParaguAI y quiero una demo para mi negocio.')}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-transform hover:-translate-y-0.5"
              >
                Quiero una demo gratis
              </a>
              <a
                href="#destacados"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver destacados
              </a>
            </div>
          </div>
        </section>

        {/* Featured strip — directly after hero */}
        <section id="destacados" className="bg-gray-950 px-5 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Destacados
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
              Los que más Leads generan
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/60 md:text-base">
              Una muestra — clic en cada tarjeta abre el sitio real.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <div key={c.slug} className="rounded-2xl ring-1 ring-white/10">
                  <ClientCard c={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto mt-16 max-w-3xl px-5 text-center md:mt-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            El próximo sitio puede ser el tuyo.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
            Mandanos tu negocio por WhatsApp. En 48h tenés una demo gratis, sin
            compromiso.
          </p>
          <a
            href={waLink('Hola, quiero una demo gratis como los sitios del portafolio.')}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-8 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Empezar por WhatsApp
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
