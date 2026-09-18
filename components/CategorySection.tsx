import type { LucideIcon } from 'lucide-react'
import { ClientCard, type ClientCardData } from './ClientCard'

// AIW brand: teal/cyan only.
type Accent = 'tint' | 'mid' | 'cyan' | 'deep'

type Props = {
  id: string
  title: string
  subtitle?: string
  icon?: LucideIcon
  clients: ClientCardData[]
}

const accentBgSoft: Record<Accent, string> = {
  tint: 'bg-teal-50/40',
  mid:  'bg-teal-100/40',
  cyan: 'bg-cyan-50/40',
  deep: 'bg-teal-700/10',
}

export function CategorySection({ id, title, subtitle, icon: Icon, clients }: Props) {
  return (
    <section id={id} className={`relative scroll-mt-28 rounded-3xl ${accentBgSoft[clients[0]?.accent ?? 'tint']} px-4 py-10 md:px-8 md:py-14`}>
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
