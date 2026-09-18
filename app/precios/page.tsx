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

function noteOf(cell: Cell | undefined): string {
  if (!cell || !cell.included) return ''
  return cell.note ?? ''
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="bg-gray-50 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Precios claros
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Pagás por mes. Sin contratos.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              Hosting mensual, con un setup que cubre tus primeros meses.
              Empezás con demo gratis y pagás solo cuando confirmás.
            </p>
          </div>
        </section>

        {/* ── Comparison table (desktop) ────────────────────────────────────── */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full border-collapse text-left">
                {/* Header: plan names + prices */}
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="sticky left-0 z-10 min-w-[180px] bg-gray-50 px-5 py-5 align-bottom">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                        Plan
                      </span>
                    </th>
                    {PLANS.map((plan) => {
                      const isPop = plan.popular
                      return (
                        <th
                          key={plan.id}
                          className={`relative min-w-[200px] px-5 py-5 align-top ${isPop ? 'bg-gray-950 text-white' : ''}`}
                        >
                          {plan.badge && (
                            <span
                              className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                isPop ? 'bg-amber-400 text-gray-950' : 'bg-gray-950 text-white'
                              }`}
                            >
                              {plan.badge}
                            </span>
                          )}
                          <span
                            className={`block text-base font-bold ${isPop ? 'text-white' : 'text-gray-900'}`}
                          >
                            {plan.name}
                          </span>
                          <span
                            className={`mt-1 block text-[11px] ${isPop ? 'text-white/60' : 'text-gray-500'}`}
                          >
                            {plan.description}
                          </span>
                          <div className="mt-3">
                            <span
                              className={`block text-2xl font-extrabold tracking-tight ${isPop ? 'text-white' : 'text-gray-900'}`}
                            >
                              {plan.monthly}
                            </span>
                            <span
                              className={`mt-0.5 block text-[11px] ${isPop ? 'text-white/60' : 'text-gray-500'}`}
                            >
                              {plan.monthlyNote}
                            </span>
                            {plan.setup && (
                              <p
                                className={`mt-2 text-[11px] ${isPop ? 'text-white/55' : 'text-gray-500'}`}
                              >
                                + <span className="font-semibold">{plan.setup}</span> setup
                                <span className="block">{plan.setupNote}</span>
                              </p>
                            )}
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>

                {/* Body: features */}
                <tbody>
                  {PLAN_FEATURES.map((feat, i) => (
                    <tr
                      key={feat.key}
                      className={`border-b border-gray-100 last:border-b-0 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}
                    >
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-inherit px-5 py-3 text-left align-middle text-xs font-semibold text-gray-700"
                      >
                        {feat.label}
                        {feat.note && (
                          <span className="block text-[10px] font-normal text-gray-400">
                            {feat.note}
                          </span>
                        )}
                      </th>
                      {PLANS.map((plan) => {
                        const raw = plan.features[feat.key as keyof typeof plan.features] as Cell | undefined
                        const included = !!raw?.included
                        const note = noteOf(raw)
                        const isPop = plan.popular
                        return (
                          <td
                            key={plan.id}
                            className={`px-5 py-3 align-middle text-sm ${isPop ? 'bg-gray-950' : ''}`}
                          >
                            {included ? (
                              <div className="flex items-start gap-2">
                                <Check
                                  size={15}
                                  className={`mt-0.5 shrink-0 ${isPop ? 'text-amber-400' : 'text-emerald-500'}`}
                                />
                                {note ? (
                                  <span className={`text-xs ${isPop ? 'text-white/85' : 'text-gray-700'}`}>
                                    {note}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <X
                                size={15}
                                className={`shrink-0 ${isPop ? 'text-white/25' : 'text-gray-300'}`}
                              />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>

                {/* Footer: CTA buttons */}
                <tfoot>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="sticky left-0 z-10 bg-gray-50 px-5 py-5" />
                    {PLANS.map((plan) => {
                      const isFree = plan.id === 'prueba'
                      const isPop = plan.popular
                      return (
                        <td
                          key={plan.id}
                          className={`px-5 py-5 ${isPop ? 'bg-gray-950' : 'bg-gray-50'}`}
                        >
                          <a
                            href={waLink(plan.waMsg)}
                            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-center text-sm font-bold transition-transform ${
                              isPop
                                ? 'bg-white text-gray-950 hover:-translate-y-0.5'
                                : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                            }`}
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

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
              Aceptamos Mercado Pago y transferencia bancaria. Sin contratos de
              permanencia — cancelás cuando quieras.
            </p>
          </div>
        </section>

        {/* ── Mobile card fallback ────────────────────────────────────────── */}
        <section className="bg-white pb-12 md:hidden">
          <div className="mx-auto max-w-md px-5">
            <p className="mb-4 text-center text-xs text-gray-500">
              En celular no podés ver la tabla completa. Cada plan:
            </p>
            {PLANS.map((plan) => (
              <details key={plan.id} className="group mb-3 rounded-2xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-base font-bold text-gray-900">
                  <span>{plan.name}</span>
                  <span className="text-sm font-normal text-gray-500">{plan.monthly}</span>
                </summary>
                <div className="border-t border-gray-100 px-5 py-4">
                  <p className="mb-3 text-xs text-gray-500">{plan.description}</p>
                  <ul className="space-y-2 text-sm">
                    {PLAN_FEATURES.filter(f => {
                      const cell = plan.features[f.key as keyof typeof plan.features] as Cell | undefined
                      return cell?.included
                    }).map((f) => {
                      const cell = plan.features[f.key as keyof typeof plan.features] as Cell | undefined
                      const note = cell?.note
                      return (
                        <li key={f.key} className="flex items-start gap-2">
                          <Check size={14} className="mt-1 shrink-0 text-emerald-500" />
                          <span className="text-gray-700">
                            {f.label}
                            {note ? (
                              <span className="text-xs text-gray-500"> · {note}</span>
                            ) : null}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  <a
                    href={waLink(plan.waMsg)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 py-3 text-sm font-bold text-white"
                  >
                    {plan.cta}
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Universal section ──────────────────────────────────────────── */}
        <section className="border-t border-gray-200 bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              Lo que ya viene con cualquier plan
            </h2>
            <p className="mt-2 text-base text-gray-600">
              No vendemos un sitio. Vendemos un sitio que aparece en Google
              y te trae consultas.
            </p>
            <ul className="mt-8 space-y-3 rounded-2xl border border-gray-200 bg-white p-6">
              {[
                'Diseño responsive que se ve perfecto en el celu',
                'WhatsApp Business conectado a un botón de tu sitio',
                'SSL (candadito verde en el navegador)',
                'SEO básico — aparecés en Google cuando alguien busca tu servicio',
                'Google Maps con tu dirección marcada',
                'Soporte por WhatsApp — hablamos como con cualquier proveedor',
                'Hosting en la nube — uptime 99.9%',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────── */}
        <section className="bg-gray-950 py-16 text-white md:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              ¿Tenés dudas sobre qué plan te queda?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/70 md:text-lg">
              Mandanos un WhatsApp y te recomendamos el plan según tu rubro
              y tamaño.
            </p>
            <a
              href={waLink('Hola, tengo dudas sobre qué plan elegir para mi negocio.')}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-gray-950 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
