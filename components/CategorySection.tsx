import type { LucideIcon } from 'lucide-react'
import { ClientCard, type ClientCardData } from './ClientCard'

type Accent =
  | 'primary' | 'rose' | 'amber' | 'emerald' | 'teal' | 'sky'
  | 'orange' | 'violet' | 'indigo' | 'fuchsia' | 'gray'

type Props = {
  id: string
  title: string
  subtitle?: string
  icon?: LucideIcon
  clients: ClientCardData[]
}

const accentBgSoft: Record<Accent, string> = {
  primary: 'bg-primary-50/40',
  rose:    'bg-rose-50/40',
  amber:   'bg-amber-50/40',
  emerald: 'bg-emerald-50/40',
  teal:    'bg-teal-50/40',
  sky:     'bg-sky-50/40',
  orange:  'bg-orange-50/40',
  violet:  'bg-violet-50/40',
  indigo:  'bg-indigo-50/40',
  fuchsia: 'bg-fuchsia-50/40',
  gray:    'bg-gray-50/60',
}

export function CategorySection({ id, title, subtitle, icon: Icon, clients }: Props) {
  return (
    <section id={id} className={`relative scroll-mt-28 rounded-3xl ${accentBgSoft[clients[0]?.accent ?? 'gray']} px-4 py-10 md:px-8 md:py-14`}>
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
        <div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 max-w-xl text-sm text-gray-600 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <ClientCard key={c.slug} c={c} />
        ))}
      </div>
    </section>
  )
}
