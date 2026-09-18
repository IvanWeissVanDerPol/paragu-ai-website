import type { Metadata } from 'next'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { PAIN_POINTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Por qué tu negocio necesita un sitio · ParaguAI',
  description:
    'Tres razones por las que tu negocio paraguayo pierde clientes hoy mismo: Google, Instagram, y los clientes nuevos que no te conocen.',
  alternates: { canonical: '/por-que' },
}

export default function PorQuePage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="bg-gray-950 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="mx-auto max-w-3xl px-5">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
              <ArrowLeft size={14} /> Volver al inicio
            </Link>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-300">
              <AlertTriangle size={12} />
              La realidad
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Por qué tu negocio necesita un sitio
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              No es un lujo. Es lo que hace que tu negocio aparezca cuando alguien
              te busca. Y hoy, en Paraguay, eso define si ganás o perdés el cliente.
            </p>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-6 md:grid-cols-3">
              {PAIN_POINTS.map((p, i) => (
                <article
                  key={p.title}
                  className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute -top-3 left-7 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">
                    0{i + 1}
                  </span>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-3xl bg-emerald-50 px-8 py-10 text-center md:px-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                ¿Y entonces qué hago?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-gray-700">
                Te armamos el sitio. Mirá cómo lo hicimos para otros paraguayos
                en tu mismo rubro.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/clientes"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Ver 31 sitios reales
                </Link>
                <a
                  href={waLink('Hola, quiero entender cómo puede ayudarme un sitio para mi negocio.')}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
