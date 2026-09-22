import type { Metadata } from 'next'
import { Check, X, MessageCircle } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { PLANS, PLAN_FEATURES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Precios · ParaguAI',
  description:
    'Comparación de planes de sitio web para negocios paraguayos. Pago mensual de hosting, con setup que cubre tus primeros meses. Prueba gratis, sin contratos.',
}

type Cell =
  | { included: false }
  | { included: true; note?: string }

// Per-plan accents. AIW brand: teal/cyan only. Each plan uses a tonal
// level so they stay visually distinct within the unified palette.
// Crecimiento (recommended) gets the deepest teal so it stands out
// without leaving the brand family.
const PLAN_THEME: Record<string, {
  header: string
  row: string
  bar: string
  text: string
  chip: string
  cta: string
  ctaHover: string
  footer: string
}> = {
  prueba: {
    header: 'bg-slate-50',
    row:    'bg-white',
    bar:    'bg-slate-300',
    text:   'text-gray-900',
    chip:   'bg-slate-200 text-slate-700',
    cta:    'bg-teal-700 text-white',
    ctaHover: 'hover:bg-teal-600',
    footer: 'bg-slate-50',
  },
  presencia: {
    header: 'bg-teal-50',
    row:    'bg-teal-50/30',
    bar:    'bg-teal-400',
    text:   'text-teal-900',
    chip:   'bg-teal-200 text-teal-800',
    cta:    'bg-teal-600 text-white',
    ctaHover: 'hover:bg-teal-500',
    footer: 'bg-teal-50',
  },
  crecimiento: {
    header: 'bg-cyan-100',
    row:    'bg-cyan-50/50',
    bar:    'bg-cyan-600',
    text:   'text-cyan-900',
    chip:   'bg-cyan-700 text-white',
    cta:    'bg-teal-700 text-white',
    ctaHover: 'hover:bg-teal-600',
    footer: 'bg-cyan-100',
  },
  profesional: {
    header: 'bg-teal-100',
    row:    'bg-teal-50/30',
    bar:    'bg-teal-700',
    text:   'text-teal-900',
    chip:   'bg-teal-800 text-white',
    cta:    'bg-teal-800 text-white',
    ctaHover: 'hover:bg-teal-700',
    footer: 'bg-teal-100',
  },
}

function noteOf(cell: Cell | undefined): string {
  if (!cell || !cell.included) return ''
  return cell.note ?? ''
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <main className="bg-white pb-32 md:pb-20">
        {/* Hero */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
              Precios
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Pagás por mes. Sin contratos.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
              Demo gratis. Setup único. Hosting mensual. Cancelás cuando quieras.
            </p>
          </div>
        </section>

        {/* Comparison table (desktop) */}
        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 min-w-[180px] bg-white px-5 py-5 align-bottom">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                        Plan
                      </span>
                    </th>
                    {PLANS.map((plan) => {
                      const theme = PLAN_THEME[plan.id]
                      return (
                        <th
                          key={plan.id}
                          className={`relative min-w-[200px] px-5 pb-5 pt-6 align-top ${theme.header}`}
                        >
                          {/* Top accent bar */}
                          <span className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${theme.bar}`} />

                          {plan.badge && (
                            <span
                              className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${theme.chip}`}
                            >
                              {plan.badge}
                            </span>
                          )}

                          <span className="block text-base font-bold text-gray-900">
                            {plan.name}
                          </span>
                          <span className="mt-1 block text-[11px] text-gray-500">
                            {plan.description}
                          </span>

                          <div className="mt-3">
                            <span className={`block text-2xl font-extrabold tracking-tight ${theme.text}`}>
                              {plan.monthly}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-gray-500">{plan.monthlyNote}</span>
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>

                <tbody>
                  {PLAN_FEATURES.map((feat, i) => (
                    <tr
                      key={feat.key}
                      className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'}`}
                    >
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-inherit px-5 py-3 text-left align-middle text-xs font-semibold text-gray-700"
                      >
                        {feat.label}
                        {'note' in feat && feat.note && (
                          <span className="block text-[10px] font-normal text-gray-400">
                            {feat.note}
                          </span>
                        )}
                      </th>
                      {PLANS.map((plan) => {
                        const raw = plan.features[feat.key as keyof typeof plan.features] as Cell | undefined
                        const included = !!raw?.included
                        const note = noteOf(raw)
                        const theme = PLAN_THEME[plan.id]
                        return (
                          <td
                            key={plan.id}
                            className={`px-5 py-3 align-middle text-sm ${theme.row}`}
                          >
                            {included ? (
                              <div className="flex items-start gap-2">
                                <Check
                                  size={15}
                                  className={`mt-0.5 shrink-0 ${plan.id === 'crecimiento' ? 'text-cyan-700' : 'text-teal-600'}`}
                                />
                                {note ? (
                                  <span className={`text-xs ${plan.id === 'crecimiento' ? 'text-cyan-900' : 'text-gray-700'}`}>
                                    {note}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <X size={15} className="shrink-0 text-gray-300" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td className="sticky left-0 z-10 bg-white px-5 py-5" />
                    {PLANS.map((plan) => {
                      const isFree = plan.id === 'prueba'
                      const theme = PLAN_THEME[plan.id]
                      return (
                        <td
                          key={plan.id}
                          className={`px-5 py-5 ${theme.footer}`}
                        >
                          <a
                            href={waLink(plan.waMsg)}
                            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-center text-sm font-bold transition-transform ${theme.cta} ${theme.ctaHover} hover:-translate-y-0.5`}
                          >
                            {isFree ? <MessageCircle size={15} /> : null}
                            {plan.cta}
                          </a>
                        </td>
                      )
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-gray-500">
              Aceptamos Mercado Pago y transferencia. Sin permanencia.
            </p>
          </div>
        </section>

        {/* Mobile card fallback */}
        <section className="bg-white pb-12 md:hidden">
          <div className="mx-auto max-w-md px-5">
            <p className="mb-4 text-center text-xs text-gray-500">
              Tap a plan to see what's included.
            </p>
            {PLANS.map((plan) => {
              const theme = PLAN_THEME[plan.id]
              return (
                <details
                  key={plan.id}
                  className={`group mb-3 overflow-hidden rounded-2xl border ${plan.id === 'crecimiento' ? 'border-emerald-300' : 'border-gray-200'} bg-white`}
                >
                  <summary className={`flex cursor-pointer items-center justify-between px-5 py-4 text-base font-bold text-gray-900 ${theme.header}`}>
                    <span>{plan.name}</span>
                    <span className={`text-sm font-normal ${theme.text}`}>{plan.monthly}</span>
                  </summary>
                  <div className="border-t border-gray-100 px-5 py-4">
                    <p className="mb-3 text-xs text-gray-500">{plan.description}</p>
                    <ul className="space-y-2 text-sm">
                      {PLAN_FEATURES.filter(f => {
                        const cell = plan.features[f.key as keyof typeof plan.features] as Cell | undefined
                        return cell?.included
                      }).map((f) => {
                        const cell = plan.features[f.key as keyof typeof plan.features] as Cell | undefined
                        const note = cell && cell.included ? cell.note : undefined
                        return (
                          <li key={f.key} className="flex items-start gap-2">
                            <Check size={14} className="mt-1 shrink-0 text-teal-600" />
                            <span className="text-gray-700">
                              {f.label}
                              {note ? <span className="text-xs text-gray-500"> · {note}</span> : null}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                    <a
                      href={waLink(plan.waMsg)}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white ${theme.cta} ${theme.ctaHover}`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </details>
              )
            })}
          </div>
        </section>

        {/* Universal section — slimmed copy */}
        <section className="border-t border-gray-200 bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              Incluido en todos los planes
            </h2>
            <ul className="mt-6 grid gap-2 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-2">
              {[
                'Diseño responsive (celu, tablet, desktop)',
                'WhatsApp Business con botón directo',
                'SSL (candadito verde)',
                'SEO básico + Google Maps',
                'Soporte por WhatsApp',
                'Hosting en la nube (uptime 99.9%)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={15} className="mt-0.5 shrink-0 text-teal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA — lighter copy */}
        <section className="bg-gray-950 py-14 text-white md:py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              ¿Cuál te queda?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-white/70">
              Mandanos un WhatsApp y te recomendamos.
            </p>
            <a
              href={waLink('Hola, tengo dudas sobre qué plan elegir para mi negocio.')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-gray-950 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={17} />
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
