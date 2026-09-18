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

const accentBorder: Record<string, string> = {
  primary: 'border-primary-200 hover:border-primary-500',
  rose:    'border-rose-200 hover:border-rose-500',
  amber:   'border-amber-200 hover:border-amber-500',
  emerald: 'border-emerald-200 hover:border-emerald-500',
  teal:    'border-teal-200 hover:border-teal-500',
  sky:     'border-sky-200 hover:border-sky-500',
  orange:  'border-orange-200 hover:border-orange-500',
  violet:  'border-violet-200 hover:border-violet-500',
  indigo:  'border-indigo-200 hover:border-indigo-500',
  fuchsia: 'border-fuchsia-200 hover:border-fuchsia-500',
  gray:    'border-gray-200 hover:border-gray-500',
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
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200">
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
