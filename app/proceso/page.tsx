import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { STEPS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Cómo funciona · ParaguAI',
  description:
    'Tres pasos, sin formularios: nos escribís por WhatsApp, en 48 horas ves tu sitio listo, salís en Google y te llegan consultas.',
  alternates: { canonical: '/proceso' },
}

export default function ProcesoPage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="bg-teal-700 pt-28 pb-20 text-white md:pt-40 md:pb-24">
          <div className="mx-auto max-w-3xl px-5">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
              <ArrowLeft size={14} /> Volver al inicio
            </Link>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-cyan-400/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
              En 48 horas
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Vos solo escribinos por WhatsApp. Hacemos el resto.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-950/75 md:text-lg">
              Tres pasos. Sin formularios, sin llamadas, sin PDFs. Te hablamos
              por WhatsApp como le hablás a cualquier proveedor.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-5">
            <ol className="space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.num}
                  className="grid grid-cols-[80px_1fr] items-start gap-6 rounded-3xl border border-gray-200 bg-gray-50 p-7 transition-all hover:border-teal-600 md:grid-cols-[120px_1fr] md:gap-10 md:p-10"
                >
                  <div>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-extrabold text-white md:h-20 md:w-20 md:text-3xl">
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-16 text-center">
              <a
                href={waLink('Hola, quiero arrancar mi sitio con ParaguAI.')}
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-teal-500"
              >
                Arrancar por WhatsApp
              </a>
              <p className="mt-3 text-sm text-gray-500">
                Te respondemos en minutos.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
