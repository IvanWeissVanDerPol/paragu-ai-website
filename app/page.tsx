import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
      <main className="pt-28 pb-32 md:pb-24">
        {/* Hero - Light editorial with Sora type + image cascade */}
        <section className="mx-auto mb-10 max-w-6xl px-5 md:mb-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
            {/* Left: Text */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
                <span className="h-0.5 w-6 bg-brand-500"></span>
                Portafolio público
              </span>
              <h1 className="mt-5 font-sora text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-5xl xl:text-6xl">
                Tu sitio web para conseguir clientes.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                Creamos tu presencia online — para tu peluquería, tu gimnasio, tu restaurante, tu pyme. Con dominio propio, SEO y WhatsApp. Hecho en Paraguay, para Paraguay.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink('Hola, vi el portafolio de ParaguAI y quiero una demo para mi negocio.')}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Quiero una demo gratis
                </a>
                <a
                  href="#destacados"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
                >
                  Ver destacados
                </a>
              </div>
            </div>

            {/* Right: Browser-frame cascade - stacked on mobile, overlapping on desktop */}
            <div className="relative lg:col-span-6 lg:h-[430px]">
              {/* Back shot - Nudo */}
              <div className="mb-4 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl lg:absolute lg:right-[6%] lg:top-0 lg:z-10 lg:w-[70%] lg:shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
                  <i className="h-2 w-2 rounded-full bg-red-400"></i>
                  <i className="h-2 w-2 rounded-full bg-yellow-400"></i>
                  <i className="h-2 w-2 rounded-full bg-green-400"></i>
                </div>
                <div className="relative aspect-[16/9.5]">
                  <Image
                    src="/screenshots/nudo.jpg"
                    alt="Nudo"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* Front shot - Magnolia */}
              <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl lg:absolute lg:bottom-0 lg:left-0 lg:z-20 lg:w-[70%]">
                <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
                  <i className="h-2 w-2 rounded-full bg-red-400"></i>
                  <i className="h-2 w-2 rounded-full bg-yellow-400"></i>
                  <i className="h-2 w-2 rounded-full bg-green-400"></i>
                </div>
                <div className="relative aspect-[16/9.5]">
                  <Image
                    src="/screenshots/magnolia-peluqueria.jpg"
                    alt="Magnolia Peluquería"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured strip - Solid teal band */}
        <section id="destacados" className="bg-brand-700 px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-200">
              <span className="h-0.5 w-6 bg-brand-400"></span>
              Destacados
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
              Los que más Leads generan
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
              Una muestra — clic en cada tarjeta abre el sitio real.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <div key={c.slug} className="rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <ClientCard c={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto mt-16 max-w-3xl px-5 text-center md:mt-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            El próximo sitio puede ser el tuyo.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
            Mandanos tu negocio por WhatsApp. En 48h tenés una demo gratis, sin
            compromiso.
          </p>
          <a
            href={waLink('Hola, quiero una demo gratis como los sitios del portafolio.')}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30"
          >
            Empezar por WhatsApp
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
