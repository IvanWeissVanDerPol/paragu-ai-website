import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle, ArrowRight, Zap, ExternalLink,
  AlertTriangle, ChevronRight, Scissors, Sparkles, Dumbbell, Heart,
  Stethoscope, UtensilsCrossed, CalendarDays, Briefcase, Drama,
} from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ClientCard } from '@/components/ClientCard'
import { waLink } from '@/lib/utils'
import {
  getAllClients, RUBROS, SLUGS_WITH_SCREENSHOT,
  CATEGORY_META, CATEGORY_ORDER,
} from '@/lib/clients'

export const metadata: Metadata = {
  title: 'ParaguAI — Tu negocio en internet esta semana',
  description:
    'Te armamos el sitio web completo para tu peluquería, gimnasio, restorán o spa — diseño, dominio, WhatsApp y SEO — listo en 48 horas. Demo gratis, sin compromiso.',
  alternates: { canonical: '/' },
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Belleza y Estética':      Sparkles,
  'Barbería':                Scissors,
  'Gimnasio y Fitness':      Dumbbell,
  'Spa y Bienestar':         Heart,
  'Salud y Bienestar':       Stethoscope,
  'Gastronomía':             UtensilsCrossed,
  'Eventos y Espacios':      CalendarDays,
  'Servicios Profesionales': Briefcase,
  'Cultura y Espectáculos':  Drama,
}

function featuredCards() {
  return getAllClients()
    .filter(c => SLUGS_WITH_SCREENSHOT.has(c.slug))
    .slice(0, 9)
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

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute -top-32 -right-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute top-32 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85">
              <Zap size={12} className="text-amber-400" />
              Para negocios paraguayos · Asunción, CDE, San Lorenzo
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Tu peluquería, tu gimnasio, tu restorán —{' '}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent">
                en internet esta semana.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Te armamos el sitio web completo — diseño, dominio, WhatsApp, SEO
              — listo en 48 horas. Antes de pagar. Sin formularios.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Hola, quiero una demo gratis de mi sitio con ParaguAI.')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-gray-950 shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Pedí tu demo gratis
              </a>
              <Link
                href="/clientes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver sitios reales
                <ExternalLink size={16} />
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/55">
              Negocios paraguayos en vivo · Sin tarjeta · Sin permanencia
            </p>
          </div>

          {/* Mini proof — 4 live screenshots in a stagger grid */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="grid grid-cols-2 gap-3">
              {featuredCards().slice(0, 4).map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/clientes/${c.slug}/`}
                  className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform hover:-translate-y-1 hover:ring-white/30 ${i % 2 ? 'translate-y-4' : ''}`}
                >
                  <img
                    src={`/screenshots/${c.slug}.jpg`}
                    alt={c.name}
                    className="block h-32 w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/95 to-transparent p-2.5">
                    <p className="text-xs font-bold text-white">{c.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Rubros strip ───────────────────────────────────────────────────────────
function RubrosStrip() {
  const cats = CATEGORY_ORDER
    .map(cat => ({ cat, count: getAllClients().filter(c => c.category === cat).length }))
    .filter(c => c.count > 0)

  return (
    <section className="border-b border-gray-200 bg-white py-6">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Ya trabajamos en
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
            {cats.map(({ cat, count }) => {
              const Icon = iconMap[cat] ?? ChevronRight
              return (
                <Link
                  key={cat}
                  href={`/rubros/#${cat.toLowerCase().replace(/ /g, '-').replace('y-', '-')}`}
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50"
                >
                  <Icon size={12} />
                  {cat}
                  <span className="rounded-full bg-gray-100 px-1.5 text-[10px] font-bold text-gray-600 group-hover:bg-white">
                    {count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 3-column story pages ───────────────────────────────────────────────────
const stories = [
  {
    href: '/por-que',
    eyebrow: 'Por qué',
    accent: 'rose',
    title: 'Por qué tu negocio necesita un sitio',
    sub: 'Tres razones que te están costando clientes hoy.',
    bullets: ['Si no aparecés en Google, no existís', 'Tu Instagram no es tu tienda', 'Necesitás MÁS clientes'],
    Icon: AlertTriangle,
  },
  {
    href: '/rubros',
    eyebrow: 'Tu rubro',
    accent: 'violet',
    title: 'Ya tenemos experiencia en tu negocio',
    sub: 'Peluquería, barbería, gimnasio, spa, restorán, cervecería, tattoo, eventos, indumentaria.',
    bullets: ['9 categorías cubiertas', 'Te copiamos lo que funciona', 'Le ponemos tu nombre'],
    Icon: Sparkles,
  },
  {
    href: '/proceso',
    eyebrow: 'En 48 horas',
    accent: 'amber',
    title: 'Vos solo escribinos. Hacemos el resto.',
    sub: 'Tres pasos. WhatsApp, demo, lanzamiento.',
    bullets: ['Mandanos tu negocio', 'En 48h ves tu sitio', 'Salís en Google y llegan consultas'],
    Icon: Zap,
  },
] as const

const accentBg: Record<string, string> = {
  rose:    'bg-rose-50',
  violet:  'bg-violet-50',
  amber:   'bg-amber-50',
}

const accentText: Record<string, string> = {
  rose:    'text-rose-700',
  violet:  'text-violet-700',
  amber:   'text-amber-800',
}

const accentRing: Record<string, string> = {
  rose:    'ring-rose-200/60 hover:ring-rose-300',
  violet:  'ring-violet-200/60 hover:ring-violet-300',
  amber:   'ring-amber-200/60 hover:ring-amber-300',
}

function StoriesSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Cómo funciona, en tres páginas
        </h2>
        <p className="mb-10 max-w-xl text-base text-gray-600">
          Cada sección tiene su propia URL — shareable, escaneable, navegable.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group block rounded-3xl bg-white p-7 ring-1 transition-all hover:-translate-y-1 hover:shadow-2xl ${accentRing[s.accent]}`}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentBg[s.accent]} ${accentText[s.accent]}`}>
                <s.Icon size={20} />
              </div>
              <p className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] ${accentText[s.accent]}`}>
                {s.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-snug text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {s.sub}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight size={14} className="mt-0.5 shrink-0 text-gray-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${accentText[s.accent]}`}>
                Leer más
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Featured 9 — preview of /clientes ──────────────────────────────────────
function FeaturedSection() {
  const cards = featuredCards()
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Son negocios reales
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              Una muestra
            </h2>
          </div>
          <Link
            href="/clientes"
            className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Ver todos los sitios
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

// ── Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-gray-950 py-16 text-white md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Mandanos un WhatsApp. Te mostramos cómo quedaría tu sitio, gratis.
        </h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink('Hola, quiero mi demo gratis de ParaguAI.')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-gray-950 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Pedí tu demo
          </a>
          <Link
            href="/clientes"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver sitios primero
          </Link>
        </div>
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
        <RubrosStrip />
        <StoriesSection />
        <FeaturedSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
