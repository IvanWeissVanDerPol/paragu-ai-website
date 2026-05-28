'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  MessageCircle,
  Globe,
  Search,
  Smartphone,
  Layers,
  Star,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  PlayCircle,
  Zap,
  RotateCcw,
  Activity,
  Unlock,
} from 'lucide-react'
import { waLink } from '@/lib/utils'
import {
  CLIENTS,
  TEMPLATES,
  STEPS,
  FEATURES,
  GUARANTEES,
  PLANS,
  FAQS,
  TESTIMONIALS,
} from '@/lib/data'

// ── Nav ────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/precios', label: 'Precios' },
    { href: '/metodo', label: 'Método' },
    { href: '/sobre-nosotros', label: 'Nosotros' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          <span className="bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
            Paragu
          </span>
          AI
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-gray-900"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={waLink('Hola, vi ParaguAI y quiero saber más.')}
            className="hidden rounded-full bg-gradient-to-r from-primary-600 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:shadow-lg md:inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            Pedir demo
          </a>
          <button
            className="p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 md:hidden">
          <ul className="space-y-3 text-base font-medium text-gray-700">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold text-white">
              <span className="bg-gradient-to-r from-primary-400 to-brand-400 bg-clip-text text-transparent">
                Paragu
              </span>
              AI
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Creamos sitios web profesionales para negocios paraguayos. Todo
              incluido: diseño, dominio .com.py, SEO y WhatsApp.
            </p>
            <a
              href={waLink('Hola, quiero saber más de ParaguAI.')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle size={15} />
              Escribir por WhatsApp
            </a>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Navegación
            </p>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/clientes', label: 'Clientes' },
                { href: '/precios', label: 'Precios' },
                { href: '/metodo', label: 'Método' },
                { href: '/sobre-nosotros', label: 'Nosotros' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Contacto
            </p>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>WhatsApp: +595 981 324 569</li>
              <li>
                Email:{' '}
                <a
                  href="mailto:hello@paragu-ai.com"
                  className="hover:text-white transition-colors"
                >
                  hello@paragu-ai.com
                </a>
              </li>
              <li>Asunción, Paraguay</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300">
                Cloudflare Pages
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300">
                Next.js 15
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} ParaguAI · Asunción, Paraguay · Hecho
          con{' '}
          <span className="text-red-400">♥</span> para negocios paraguayos
        </div>
      </div>
    </footer>
  )
}

// ── FAQ Item ───────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pr-6 text-base font-semibold text-gray-900">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="pb-5 leading-relaxed text-gray-600">{a}</p>}
    </div>
  )
}

// ── Plan Tab Card ────────────────────────────────────────────────────────
function PlanCard({
  plan,
}: {
  plan: (typeof PLANS)[number]
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all ${plan.popular ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-brand-50 shadow-xl shadow-primary-600/10 scale-[1.02]' : 'border-gray-200 bg-white hover:shadow-lg'}`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-brand-600 px-4 py-1 text-xs font-bold text-white">
          {plan.badge}
        </span>
      )}

      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="mt-1.5 text-sm text-gray-500">{plan.description}</p>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900">{plan.setup}</p>
        {plan.monthly && (
          <p className="mt-1 text-sm text-gray-500">
            plus {plan.monthly}{' '}
            <span className="text-xs text-gray-400">
              (después del período incluido)
            </span>
          </p>
        )}
      </div>

      <ul className="mb-8 space-y-3 text-sm">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check
                size={16}
                className="mt-0.5 shrink-0 text-green-500"
              />
            ) : (
              <X
                size={16}
                className="mt-0.5 shrink-0 text-gray-300"
              />
            )}
            <span className={f.included ? 'text-gray-700' : 'text-gray-400'}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(plan.waMsg)}
        className={`mt-auto w-full rounded-full py-3.5 text-center font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-primary-600 to-brand-600 text-white shadow-lg shadow-primary-600/30 hover:-translate-y-0.5 hover:shadow-xl' : 'border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'}`}
      >
        {plan.cta}
      </a>
    </div>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      {/* bg blobs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary-100/60 to-brand-100/40 blur-3xl" />
      <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700">
            <Zap size={12} className="text-amber-500" />
            Demo gratis · Sin tarjeta · Listo en 48h
          </span>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
            Tu negocio en{' '}
            <span className="bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
              internet
            </span>{' '}
            en 48 horas
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Creamos sitios web profesionales para negocios paraguayos. Todo
            incluido: diseño, dominio .com.py, SEO, WhatsApp y soporte.{' '}
            <strong className="text-gray-900">Demo gratis, sin compromiso.</strong>
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={waLink(
                'Hola, quiero una demo gratis de mi sitio web con ParaguAI.'
              )}
              className="btn-primary"
            >
              <PlayCircle size={18} />
              Pedir demo gratis
            </a>
            <Link href="/clientes" className="btn-secondary">
              Ver sitios reales
              <ExternalLink size={16} />
            </Link>
          </div>

          {/* trust bar */}
          <p className="mt-12 text-xs text-gray-400">
            +12 sitios reales funcionando en Paraguay
          </p>
        </div>

        {/* template strip */}
        <div className="mt-16">
          <p className="mb-6 text-center text-sm font-semibold text-gray-500">
            Templates probados con leads reales
          </p>
          <div className="grid grid-flow-col justify-start gap-3 overflow-x-auto pb-4 px-1">
            {TEMPLATES.map((t) => (
              <a
                key={t.id}
                href={t.demo}
                target="_blank"
                rel="noopener"
                className="group shrink-0 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ minWidth: 160 }}
              >
                <div
                  className="mb-3 h-10 w-10 rounded-lg"
                  style={{ backgroundColor: t.color + '22' }}
                >
                  <div
                    className="h-full w-full rounded-lg"
                    style={{ backgroundColor: t.color + '44' }}
                  />
                </div>
                <p className="text-sm font-bold text-gray-900 group-hover:text-primary-600">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {t.leads > 0 ? `${t.leads.toLocaleString()} leads` : 'Demo live'}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Steps ───────────────────────────────────────────────────────────────
function StepsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <span className="section-label">El proceso</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Solo 3 pasos, sin complicaciones
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.num} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-brand-100 text-2xl font-bold text-primary-700">
                {s.num}
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ─────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div>
            <span className="section-label">Qué incluimos</span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Todo lo que necesita tu negocio
            </h2>
          </div>
          <p className="flex items-center text-gray-600">
            No vendemos solo un sitio web. Vendemos presencia digital completa:
            desde el diseño hasta el primer cliente que llega por Google.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                {f.title === 'Todo incluido' ? (
                  <Layers size={18} className="text-primary-600" />
                ) : f.title === 'WhatsApp directo' ? (
                  <MessageCircle size={18} className="text-primary-600" />
                ) : f.title === 'Dominio propio' ? (
                  <Globe size={18} className="text-primary-600" />
                ) : f.title === 'SEO integrado' ? (
                  <Search size={18} className="text-primary-600" />
                ) : f.title === '100% responsive' ? (
                  <Smartphone size={18} className="text-primary-600" />
                ) : (
                  <Star size={18} className="text-primary-600" />
                )}
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Clients Preview ────────────────────────────────────────────────────
function ClientsPreview() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <span className="section-label">Clientes reales</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Negocios paraguayos que ya venden online
          </h2>
          <p className="mt-3 text-gray-600">
            No son templates. Son sitios reales con Leads, pedidos y reservas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.slice(0, 9).map((c) => (
            <a
              key={c.slug}
              href={c.url}
              target="_blank"
              rel="noopener"
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="text-center text-gray-400">
                  <Globe size={24} className="mx-auto mb-1 opacity-50" />
                  <p className="text-xs">{c.rubro}</p>
                </div>
              </div>
              <div className="p-4">
                <span className="mb-2 inline-block rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-500">
                  {c.rubro}
                </span>
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/clientes" className="btn-secondary">
            Ver todos los sitios
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Guarantees ─────────────────────────────────────────────────────────
function GuaranteesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 md:grid-cols-4">
          {GUARANTEES.map((g, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-brand-50">
                {i === 0 ? (
                  <PlayCircle size={20} className="text-primary-600" />
                ) : i === 1 ? (
                  <RotateCcw size={20} className="text-primary-600" />
                ) : i === 2 ? (
                  <Activity size={20} className="text-primary-600" />
                ) : (
                  <Unlock size={20} className="text-primary-600" />
                )}
              </div>
              <h3 className="font-bold text-gray-900">{g.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            Testimonios reales
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <div className="mb-4 flex gap-0.5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-gray-300">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-xs text-gray-400">{t.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing CTA ────────────────────────────────────────────────────────
function PricingCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <span className="section-label">Precios</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Elige tu plan
          </h2>
          <p className="mt-2 text-gray-600">
            Todos incluyen demo gratuita antes de pagar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ Section ─────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <span className="section-label">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-10 text-center rounded-2xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-white">
          <h3 className="text-2xl font-bold">¿Tenés dudas?</h3>
          <p className="mt-2 text-white/80">
            Escribinos por WhatsApp y te respondemos en minutos.
          </p>
          <a
            href={waLink('Hola, tengo una pregunta sobre ParaguAI.')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StepsSection />
        <FeaturesSection />
        <ClientsPreview />
        <GuaranteesSection />
        <TestimonialsSection />
        <PricingCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
