import { ExternalLink } from 'lucide-react'
import ClientImage from './ClientImage'

// AIW brand: teal/cyan only. Four tonal levels so verticals stay visually
// distinct without breaking the unified brand palette.
type Accent = 'tint' | 'mid' | 'cyan' | 'deep'

const accentBg: Record<Accent, string> = {
  tint: 'bg-teal-50',
  mid:  'bg-teal-100',
  cyan: 'bg-cyan-50',
  deep: 'bg-teal-700',
}
const accentBar: Record<Accent, string> = {
  tint: 'bg-teal-500',
  mid:  'bg-teal-600',
  cyan: 'bg-cyan-500',
  deep: 'bg-teal-700',
}
const accentText: Record<Accent, string> = {
  tint: 'text-teal-700',
  mid:  'text-teal-800',
  cyan: 'text-cyan-700',
  deep: 'text-white',
}
const accentRing: Record<Accent, string> = {
  tint: 'ring-teal-200/60',
  mid:  'ring-teal-300/60',
  cyan: 'ring-cyan-200/60',
  deep: 'ring-teal-700/60',
}

export type ClientCardData = {
  name: string
  slug: string
  url: string
  rubro: string
  desc?: string
  category: string
  accent: Accent
  hasScreenshot?: boolean
}

export function ClientCard({ c }: { c: ClientCardData }) {
  const first = c.name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '').charAt(0).toUpperCase() || c.name.charAt(0).toUpperCase()
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl bg-white ring-1 ${accentRing[c.accent]} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        {c.hasScreenshot !== false ? (
          <ClientImage
            src={`/screenshots/${c.slug}.jpg`}
            alt={`${c.name} — ${c.rubro}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${accentBg[c.accent]}`}>
            <span className={`text-7xl font-black tracking-tight ${accentText[c.accent]} opacity-90`}>{first}</span>
          </div>
        )}

        {/* Hover overlay with description */}
        {c.desc && (
          <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-gray-950/85 via-gray-950/55 to-transparent p-4 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs leading-relaxed text-white/95">{c.desc}</p>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 p-4">
        <div className="min-w-0">
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accentBg[c.accent]} ${accentText[c.accent]}`}>
            {c.rubro}
          </span>
          <h3 className="mt-1 truncate text-base font-bold text-gray-900 transition-colors group-hover:text-gray-700">
            {c.name}
          </h3>
        </div>
        <ExternalLink size={14} className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-gray-700" />
      </div>

      {/* Category accent stripe — visible always, thicker on hover */}
      <div className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${accentBar[c.accent]}`} />
    </a>
  )
}
