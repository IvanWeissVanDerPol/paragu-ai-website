import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle, ChevronRight, Zap, ArrowRight,
  AlertTriangle, Phone, Search, Smartphone,
  Check, X, ExternalLink, Star,
} from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ClientCard } from '@/components/ClientCard'
import { waLink } from '@/lib/utils'
import {
  STEPS, FEATURES, GUARANTEES, PLANS, FAQS,
  PAIN_POINTS, CATEGORY_PROOF,
} from '@/lib/data'
import {
  getAllClients, RUBROS, SLUGS_WITH_SCREENSHOT,
} from '@/lib/clients'

export const metadata: Metadata = {
  title: 'ParaguAI — Tu negocio en internet esta semana',
  description:
    'Te armamos el sitio web completo para tu peluquería, gimnasio, restorán o spa — diseño, dominio, WhatsApp y SEO — listo en 48 horas. Demo gratis, sin compromiso.',
  alternates: { canonical: '/' },
}

const accentChip: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-700',
  rose:    'bg-rose-50 text-rose-700',
  amber:   'bg-amber-50 text-amber-800',
  emerald: 'bg-emerald-50 text-emerald-700',
  teal:    'bg-teal-50 text-teal-700',
  sky:     'bg-sky-50 text-sky-700',
  orange:  'bg-orange-50 text-orange-800',
  violet:  'bg-violet-50 text-violet-700',
  indigo:  'bg-indigo-50 text-indigo-700',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700',
  gray:    'bg-gray-100 text-gray-700',
}

function featuredCards() {
  return getAllClients()
    .filter(c => SLUGS_WITH_SCREENSHOT.has(c.slug))
    .slice(0, 6)
    .map(c => ({
      name: c.name,
      slug: c.slug,
      url: c.url,
      rubro: RUBROS[c.slug] ?? c.category,
      desc: c.desc,
      category: c.category,
      accent: c.accent,
      hasScreenshot: true,
    }))
}

// ── 1. HERO ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute -top-32 -right-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute top-32 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85">
            <Zap size={12} className="text-amber-400" />
            Para negocios paraguayos · Asunción, CDE, San Lorenzo
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Tu peluquería, tu gimnasio, tu restorán —{' '}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent">
              en internet esta semana.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            En Paraguay, tus clientes buscan primero en Google y en WhatsApp. Si tu
            negocio no aparece ahí, no existís para ellos. Te armamos el sitio
            completo — diseño, dominio, WhatsApp, SEO — y te queda listo en 48 horas
            para que veas <strong className="text-white">antes de pagar</strong>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink('Hola, quiero una demo gratis de mi sitio con ParaguAI.')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-gray-950 shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              Pedí tu demo gratis por WhatsApp
            </a>
            <Link
              href="/clientes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Mirá los 31 sitios que ya hicimos
              <ExternalLink size={16} />
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/55">
            31 negocios paraguayos en vivo · Sin tarjeta · Sin formularios
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 2. PAIN ────────────────────────────────────────────────────────────────
function PainSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700">
            <AlertTriangle size={12} />
            La realidad
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Por qué tu negocio necesita un sitio
          </h2>
          <p className="mt-3 text-base text-gray-600">
            No es un lujo. Es lo que hace que tu negocio aparezca cuando alguien
            te busca.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="absolute -top-3 left-7 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 3. PROOF — featured clients strip ──────────────────────────────────────
function ProofSection() {
  const cards = featuredCards()
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              <Star size={12} />
              Son negocios reales
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Mirá lo que armamos para otros paraguayos como vos
            </h2>
            <p className="mt-3 max-w-xl text-base text-gray-600">
              Clic en cada uno para abrir el sitio en vivo. Todos tienen
              WhatsApp, Google y dominio propio.
            </p>
          </div>
          <Link
            href="/clientes"
            className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Ver los 31 sitios
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(c => <ClientCard key={c.slug} c={c} />)}
        </div>
      </div>
    </section>
  )
}

// ── 4. STEPS ───────────────────────────────────────────────────────────────
function StepsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">
            En 48 horas
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Vos solo escribinos por WhatsApp. Hacemos el resto.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all hover:border-gray-900"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold text-white">
                {s.num}
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 5. CATEGORY PROOF ──────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-700">
            Para tu rubro
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Ya tenemos experiencia en tu negocio
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Conocemos tu rubro porque ya lo hicimos para otros. Te copiamos lo
            que funciona y le ponemos tu nombre.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORY_PROOF.map((c) => (
            <li
              key={c.cat}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gray-900 hover:shadow-md"
            >
              <div>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accentChip[c.accent]}`}>
                  {c.cat}
                </span>
                <p className="mt-2 text-base font-bold text-gray-900">
                  Ya hicimos {c.cat.toLowerCase()}
                </p>
                <p className="text-xs text-gray-500">
                  Mirá {c.client}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-300 transition-colors group-hover:text-gray-900" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── 6. FEATURES (reframed as benefits) ─────────────────────────────────────
function FeaturesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    'Todo incluido':       <Check size={18} />,
    'WhatsApp directo':    <MessageCircle size={18} />,
    'Dominio propio':      <ExternalLink size={18} />,
    'Salís en Google':     <Search size={18} />,
    'Se ve perfecto en el celu': <Smartphone size={18} />,
    'Te lo mantenemos nosotros': <Phone size={18} />,
  }
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-700">
            Qué incluimos
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Todo lo que tu negocio necesita para aparecer online
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-gray-900 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-gray-950 group-hover:text-white">
                {iconMap[f.title] ?? <Check size={18} />}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 7. GUARANTEES ──────────────────────────────────────────────────────────
function GuaranteesSection() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-4">
          {GUARANTEES.map((g) => (
            <div key={g.title}>
              <h3 className="text-base font-bold text-gray-900">{g.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 8. PRICING ─────────────────────────────────────────────────────────────
function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  const isFree = plan.id === 'prueba'
  const isPopular = plan.id === 'crecimiento'
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
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

      <div className="mb-5">
        <h3 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
          {plan.name}
        </h3>
        <p className={`mt-1.5 text-sm ${isPopular ? 'text-white/70' : 'text-gray-500'}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <p className={`text-3xl font-extrabold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
          {plan.setup}
        </p>
        {plan.monthly && (
          <p className={`mt-1 text-sm ${isPopular ? 'text-white/60' : 'text-gray-500'}`}>
            más {plan.monthly}
          </p>
        )}
      </div>

      <ul className="mb-7 space-y-2.5 text-sm">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check size={16} className={`mt-0.5 shrink-0 ${isPopular ? 'text-amber-400' : 'text-emerald-500'}`} />
            ) : (
              <X size={16} className={`mt-0.5 shrink-0 ${isPopular ? 'text-white/30' : 'text-gray-300'}`} />
            )}
            <span className={f.included
              ? isPopular ? 'text-white/90' : 'text-gray-700'
              : isPopular ? 'text-white/40' : 'text-gray-400'
            }>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(plan.waMsg)}
        className={`mt-auto rounded-full py-3.5 text-center text-sm font-bold transition-all ${
          isPopular
            ? 'bg-white text-gray-950 hover:-translate-y-0.5 hover:shadow-xl'
            : 'border-2 border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  )
}

function PricingSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Cuánto sale
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Una sola tarifa. Todo incluido. Sin sorpresas.
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Empezás con la demo gratis. Si te gusta, elegís el plan. Todos
            incluyen dominio, WhatsApp, SEO y soporte.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-gray-500">
          Aceptamos Mercado Pago y transferencia bancaria. Sin contratos de
          permanencia.
        </p>
      </div>
    </section>
  )
}

// ── 9. FAQ ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-gray-200 py-5 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-6 text-left">
        <span className="text-base font-bold text-gray-900">{q}</span>
        <ChevronRight
          size={18}
          className="shrink-0 text-gray-400 transition-transform group-open:rotate-90"
        />
      </summary>
      <p className="mt-3 leading-relaxed text-gray-600">{a}</p>
    </details>
  )
}

function FAQSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
            Lo que te preguntás
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Las 6 preguntas que más nos hacen
          </h2>
        </div>

        <div className="divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white px-6">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Otra pregunta?{' '}
          <a
            href={waLink('Hola, tengo una duda sobre ParaguAI.')}
            className="font-semibold text-gray-900 underline-offset-2 hover:underline"
          >
            Mandanos un WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}

// ── 10. FINAL CTA ─────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-gray-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Mandanos un WhatsApp. Te mostramos cómo quedaría tu sitio, gratis.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70 md:text-lg">
          En 24 horas tenés una demo. Sin tarjeta. Sin compromiso. Sin
          formularios.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink('Hola, quiero mi demo gratis de ParaguAI.')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-gray-950 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Pedí tu demo por WhatsApp
          </a>
          <Link
            href="/clientes"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver sitios primero
          </Link>
        </div>
        <p className="mt-8 text-sm text-white/50">
          31 negocios paraguayos en vivo · Asunción · CDE · San Lorenzo
        </p>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <Hero />
        <PainSection />
        <ProofSection />
        <StepsSection />
        <CategoriesSection />
        <FeaturesSection />
        <GuaranteesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
