import type { Metadata } from 'next'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { STEPS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Método · ParaguAI',
  description:
    'Cómo funciona ParaguAI: 3 pasos simples para tener tu sitio web profesional online.',
}

export default function MetodoPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mb-14 text-center">
            <span className="section-label">El proceso</span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Solo 3 pasos, sin complicaciones
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Nos das la info de tu negocio por WhatsApp y en 48h tenés el
              sitio online. Sin que toques código.
            </p>
          </div>

          <div className="space-y-12">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex gap-8">
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-brand-100 text-2xl font-extrabold text-primary-700">
                    {s.num}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="mt-8 h-8 w-px border-l-2 border-dashed border-gray-200 ml-[-44px] hidden md:block" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center rounded-3xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-white">
            <h2 className="text-2xl font-bold">Empezá hoy</h2>
            <p className="mt-2 text-white/80">
              Escribinos por WhatsApp y en 24h tenés tu demo listos.
            </p>
            <a
              href={waLink('Hola, quiero empezar con ParaguAI. ¿Cómo funciona?')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
