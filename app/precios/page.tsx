import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { PLANS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Precios · ParaguAI',
  description:
    'Planes de sitio web para negocios paraguayos. Prueba gratis, Presencia, Crecimiento y Profesional. Sin contratos.',
}

function PlanDetail({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-brand-50 shadow-xl scale-[1.02]' : 'border-gray-200 bg-white'}`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-brand-600 px-4 py-1 text-xs font-bold text-white">
          {plan.badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
      <div className="mt-2 mb-6">
        <p className="text-3xl font-extrabold">{plan.setup}</p>
        {plan.monthly && (
          <p className="mt-1 text-sm text-gray-500">
            + {plan.monthly} thereafter
          </p>
        )}
      </div>
      <p className="mb-6 text-sm text-gray-600">{plan.description}</p>
      <ul className="mb-8 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${f.included ? 'text-green-500' : 'text-gray-300'}`}
            />
            <span className={f.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
      <a
        href={waLink(plan.waMsg)}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-center font-semibold ${plan.popular ? 'bg-gradient-to-r from-primary-600 to-brand-600 text-white shadow-lg' : 'border-2 border-gray-200 text-gray-700 hover:border-primary-300'}`}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <span className="section-label">Precios claros</span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Sin letra chica
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Setup único al inicio · Cuota mensual · Sin contratos de
              permanencia. Empezás con demo gratis y pagás solo cuando estás
              conforme.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <PlanDetail key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500">
              ¿Dudas sobre qué plan elegir? Escribinos por WhatsApp.
            </p>
            <a
              href={waLink('Hola, tengo dudas sobre qué plan elegir para mi negocio.')}
              className="btn-primary mt-4"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
