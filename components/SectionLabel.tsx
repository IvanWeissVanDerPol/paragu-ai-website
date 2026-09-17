import type { LucideIcon } from 'lucide-react'

type Props = {
  icon?: LucideIcon
  children: React.ReactNode
  accent?: 'primary' | 'rose' | 'amber' | 'emerald' | 'teal' | 'sky' | 'orange' | 'violet' | 'indigo' | 'fuchsia' | 'gray'
}

const tone: Record<NonNullable<Props['accent']>, string> = {
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

export function SectionLabel({ icon: Icon, children, accent = 'primary' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone[accent]}`}
    >
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
