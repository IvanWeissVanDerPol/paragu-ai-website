import type { Metadata } from 'next'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { CATEGORY_PROOF } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Rubros en los que ya trabajamos · ParaguAI',
  description:
    'Ya hicimos sitios para peluquerías, barberías, gimnasios, spas, restaurantes, cervecerías, tatuajes, eventos e indumentaria en Paraguay.',
  alternates: { canonical: '/rubros' },
}

// AIW brand: teal/cyan only. Four tonal levels so verticals stay visually
// distinct without breaking the unified brand palette.
const accentChip: Record<string, string> = {
  tint: 'bg-teal-50 text-teal-700',
  mid:  'bg-teal-100 text-teal-800',
  cyan: 'bg-cyan-50 text-cyan-700',
  deep: 'bg-teal-700 text-white',
}

const accentBorder: Record<string, string> = {
  tint: 'border-teal-200 hover:border-teal-500',
  mid:  'border-teal-300 hover:border-teal-600',
  cyan: 'border-cyan-200 hover:border-cyan-500',
  deep: 'border-teal-700 hover:border-teal-800',
}

export default function RubrosPage() {
  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="bg-gray-950 pt-32 pb-20 text-white md:pt-40 md:pb-24">
          <div className="mx-auto max-w-3xl px-5">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
              <ArrowLeft size={14} /> Volver al inicio
            </Link>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-200">
              Para tu rubro
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Ya tenemos experiencia en tu negocio
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Conocemos tu rubro porque ya lo hicimos para otros. Te copiamos
              lo que funciona y le ponemos tu nombre — fotos, servicios, lista
              de precios, sistema de reservas, lo que use tu negocio.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_PROOF.map((c) => (
                <li key={c.cat}>
                  <Link
                    href="/"
                    className={`group flex h-full items-start justify-between rounded-2xl border-2 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${accentBorder[c.accent]}`}
                  >
                    <div>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accentChip[c.accent]}`}>
                        {c.cat}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-gray-900">
                        Ya hicimos {c.cat.toLowerCase()}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Mirá {c.client} — uno de los que ya está en vivo.
                      </p>
                    </div>
                    <ChevronRight size={20} className="mt-1 shrink-0 text-gray-300 transition-colors group-hover:text-gray-900" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
