import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, ArrowRight, MessageCircle } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import ClientImage from '@/components/ClientImage'
import { CategorySection } from '@/components/CategorySection'
import { ClientCard } from '@/components/ClientCard'
import { waLink } from '@/lib/utils'
import {
  CATEGORY_META, RUBROS, SLUGS_WITH_SCREENSHOT,
  getAllClients, getClientsByCategory,
} from '@/lib/clients'
import type { Accent } from '@/lib/clients'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllClients().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getAllClients().find(c => c.slug === slug)
  if (!c) return { title: 'No encontrado · ParaguAI' }
  const rubro = RUBROS[c.slug] ?? c.category
  return {
    title: `${c.name} · ${rubro} · ParaguAI`,
    description:
      c.desc ?? `Sitio web que armamos para ${c.name} (${rubro}). Diseño, dominio, WhatsApp, SEO. Hecho por ParaguAI.`,
    alternates: { canonical: `/clientes/${c.slug}` },
  }
}

export default async function ClientePage({ params }: Props) {
  const { slug } = await params
  const c = getAllClients().find(c => c.slug === slug)
  if (!c) notFound()

  const rubro = RUBROS[c.slug] ?? c.category
  const meta = CATEGORY_META[c.category]
  const accent = (c.accent ?? 'gray') as Accent
  const hasScreenshot = SLUGS_WITH_SCREENSHOT.has(c.slug)

  // Same-category neighbors
  const grouped = getClientsByCategory()
  const neighbors = (grouped[c.category] ?? []).filter(n => n.slug !== c.slug).slice(0, 3)
  const all = getAllClients()
  const idx = all.findIndex(x => x.slug === slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  return (
    <>
      <Nav />
      <main className="bg-white">
        {/* Hero — full-bleed dark with hero shot */}
        <section className="bg-gray-950 pt-28 pb-10 text-white md:pt-36">
          <div className="mx-auto max-w-6xl px-5">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
              <ArrowLeft size={14} /> Volver al portafolio
            </Link>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-${accent}-200`}>
                  {meta?.icon && <meta.icon size={12} />}
                  {meta?.label ?? c.category}
                </span>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                  {c.name}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                  {c.desc}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-950 transition-transform hover:-translate-y-0.5"
                >
                  Ver el sitio en vivo
                  <ExternalLink size={16} />
                </a>
                <a
                  href={waLink(`Hola, vi el sitio de ${c.name} en ParaguAI y quiero uno así.`) + `&text=Hola%2C+vi+el+sitio+de+${encodeURIComponent(c.name)}+en+ParaguAI+y+quiero+uno+as%C3%AD.+`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircle size={16} />
                  Quiero uno así
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hero screenshot */}
        <section className="bg-gray-100 pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
              {hasScreenshot ? (
                <img
                  src={`/screenshots/${c.slug}.jpg`}
                  alt={`Captura del sitio ${c.name}`}
                  className="block w-full"
                  loading="eager"
                />
              ) : (
                <div className={`flex aspect-[16/9] items-center justify-center bg-${accent}-50`}>
                  <span className={`text-9xl font-black text-${accent}-500 opacity-80`}>
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* What we did */}
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Rubro</p>
                <p className="mt-2 text-xl font-bold text-gray-900">{rubro}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Categoría</p>
                <p className="mt-2 text-xl font-bold text-gray-900">{meta?.label ?? c.category}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">URL en vivo</p>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-base font-bold text-gray-900 hover:underline">
                  {new URL(c.url).hostname}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Same-category neighbors */}
        {neighbors.length > 0 && meta && (
          <CategorySection
            id="vecinos"
            title={`Otros ${meta.label.toLowerCase()} que hicimos`}
            subtitle={`Más sitios del mismo rubro que ${c.name}.`}
            icon={meta.icon}
            count={neighbors.length}
            accent={accent}
            clients={neighbors.map(n => ({
              name: n.name,
              slug: n.slug,
              url: n.url,
              rubro: RUBROS[n.slug] ?? n.category,
              desc: n.desc,
              category: n.category,
              accent: n.accent,
              hasScreenshot: SLUGS_WITH_SCREENSHOT.has(n.slug),
            }))}
          />
        )}

        {/* Prev / Next */}
        <section className="border-t border-gray-200 bg-gray-50 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-2">
            {prev ? (
              <Link href={`/clientes/${prev.slug}`} className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ArrowLeft size={18} className="text-gray-400 transition-colors group-hover:text-gray-900" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Anterior</p>
                  <p className="text-base font-bold text-gray-900">{prev.name}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/clientes/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-right transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Siguiente</p>
                  <p className="text-base font-bold text-gray-900">{next.name}</p>
                </div>
                <ArrowRight size={18} className="text-gray-400 transition-colors group-hover:text-gray-900" />
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
