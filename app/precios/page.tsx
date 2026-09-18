import type { Metadata } from 'next'
import { Check, X, MessageCircle } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { PLANS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Precios · ParaguAI',
  description:
    'Planes de sitio web para negocios paraguayos. Pago mensual de hosting, con setup anual opcional. Prueba gratis, sin contratos.',
}

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  const isFree = plan.id === 'prueba'
  const isPopular = plan.id === 'crecimiento'
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 md:p-7 transition-all ${
        isPopular
          ? 'border-gray-900 bg-gray-950 text-white shadow-2xl shadow-gray-900/20 md:scale-[1.02]'
          : 'border-gray-200 bg-white hover:shadow-lg'
      }`}
    >
      {plan.badge && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider ${
          isPopular ? 'bg-amber-400 text-gray-950' : 'bg-gray-950 text-white'
        }`}>
          {plan.badge}
        </span>
      )}

      {/* Name + tagline */}
      <h3 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
        {plan.name}
      </h3>
      <p className={`mt-1.5 text-sm leading-relaxed ${isPopular ? 'text-white/70' : 'text-gray-500'}`}>
        {plan.description}
      </p>

      {/* CHECKLIST FIRST — the dominant visual */}
      <ul className="my-6 space-y-2.5 text-sm">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check
                size={16}
                className={`mt-0.5 shrink-0 ${isPopular ? 'text-amber-400' : 'text-emerald-500'}`}
              />
            ) : (
              <X
                size={16}
                className={`mt-0.5 shrink-0 ${isPopular ? 'text-white/30' : 'text-gray-300'}`}
              />
            )}
            <span className={
              f.included
                ? isPopular ? 'text-white/90' : 'text-gray-700'
                : isPopular ? 'text-white/40 line-through' : 'text-gray-400 line-through'
            }>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* PRICE — monthly hosting is the headline */}
      <div className="mt-auto">
        <div className="border-t border-current/10 pt-5" style={{ borderColor: isPopular ? 'rgba(255,255,255,0.15)' : '#f3f4f6' }}>
          {/* Monthly */}
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${isPopular ? 'text-white' : 'text-gray-900'}`}>
              {plan.monthly}
            </span>
          </div>
          <p className={`mt-1 text-xs ${isPopular ? 'text-white/60' : 'text-gray-500'}`}>
            {plan.monthlyNote}
          </p>

          {/* Setup as smaller "annual" line — only when relevant */}
          {plan.setup && (
            <div className={`mt-4 rounded-xl px-3 py-2.5 text-xs ${isPopular ? 'bg-white/10' : 'bg-gray-50'}`}>
              <p className={isPopular ? 'text-white/80' : 'text-gray-600'}>
                <span className="font-semibold">{plan.setup}</span> de setup
                {' · '}
                <span className={isPopular ? 'text-white/60' : 'text-gray-500'}>
                  {plan.setupNote}
                </span>
              </p>
            </div>
          )}

          {/* CTA */}
          <a
            href={waLink(plan.waMsg)}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-center text-sm font-bold transition-transform ${
              isPopular
                ? 'bg-white text-gray-950 hover:-translate-y-0.5 hover:shadow-xl'
                : isFree
                  ? 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            {isFree ? <MessageCircle size={15} /> : null}
            {plan.cta}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Precios claros
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Pagás por mes. Sin contratos.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              Hosting mensual, con un setup anual que cubre tus primeros meses.
              Empezás con demo gratis y pagás solo cuando confirmás.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-xl text-center text-sm text-gray-500">
              Aceptamos Mercado Pago y transferencia bancaria. Sin contratos de
              permanencia — cancelás cuando quieras.
            </p>
          </div>
        </section>

        {/* Comparison checklist — what's included across every plan */}
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

        {/* Final CTA */}
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
