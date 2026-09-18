import type { LucideIcon } from 'lucide-react'

// AIW brand: teal/cyan only. Four tonal levels so verticals stay distinct
// without breaking the unified brand palette.
type Accent = 'tint' | 'mid' | 'cyan' | 'deep'

type Props = {
  icon?: LucideIcon
  children: React.ReactNode
  accent?: Accent
}

const tone: Record<Accent, string> = {
  tint: 'bg-teal-50 text-teal-700',
  mid:  'bg-teal-100 text-teal-800',
  cyan: 'bg-cyan-50 text-cyan-700',
  deep: 'bg-teal-700 text-white',
}

export function SectionLabel({ icon: Icon, children, accent = 'tint' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone[accent]}`}
    >
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
