import type { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { FAQS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'FAQ · ParaguAI',
  description: 'Preguntas frecuentes sobre ParaguAI — sitios web para negocios paraguayos.',
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-gray-200 last:border-0">
      <summary className="flex cursor-pointer items-center justify-between py-5 font-semibold text-gray-900 list-none">
        {q}
        <ChevronDown size={18} className="shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-5 leading-relaxed text-gray-600">{a}</p>
    </details>
  )
}

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-12 text-center">
            <span className="section-label">FAQ</span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
              Preguntas frecuentes
            </h1>
          </div>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="mt-12 text-center rounded-2xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-white">
            <h2 className="text-2xl font-bold">¿Tenés más dudas?</h2>
            <p className="mt-2 text-white/80">
              Escribinos por WhatsApp y te respondemos al toque.
            </p>
            <a
              href={waLink('Hola, tengo una pregunta sobre ParaguAI.')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
