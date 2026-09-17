import { ExternalLink } from 'lucide-react'
import ClientImage from './ClientImage'

type Accent =
  | 'primary' | 'rose' | 'amber' | 'emerald' | 'teal' | 'sky'
  | 'orange' | 'violet' | 'indigo' | 'fuchsia' | 'gray'

const accentBg: Record<Accent, string> = {
  primary: 'bg-primary-50',
  rose:    'bg-rose-50',
  amber:   'bg-amber-50',
  emerald: 'bg-emerald-50',
  teal:    'bg-teal-50',
  sky:     'bg-sky-50',
  orange:  'bg-orange-50',
  violet:  'bg-violet-50',
  indigo:  'bg-indigo-50',
  fuchsia: 'bg-fuchsia-50',
  gray:    'bg-gray-50',
}
const accentBar: Record<Accent, string> = {
  primary: 'bg-primary-500',
  rose:    'bg-rose-500',
  amber:   'bg-amber-500',
  emerald: 'bg-emerald-500',
  teal:    'bg-teal-500',
  sky:     'bg-sky-500',
  orange:  'bg-orange-500',
  violet:  'bg-violet-500',
  indigo:  'bg-indigo-500',
  fuchsia: 'bg-fuchsia-500',
  gray:    'bg-gray-500',
}
const accentText: Record<Accent, string> = {
  primary: 'text-primary-700',
  rose:    'text-rose-700',
  amber:   'text-amber-800',
  emerald: 'text-emerald-700',
  teal:    'text-teal-700',
  sky:     'text-sky-700',
  orange:  'text-orange-800',
  violet:  'text-violet-700',
  indigo:  'text-indigo-700',
  fuchsia: 'text-fuchsia-700',
  gray:    'text-gray-700',
}
const accentRing: Record<Accent, string> = {
  primary: 'ring-primary-200/60',
  rose:    'ring-rose-200/60',
  amber:   'ring-amber-200/60',
  emerald: 'ring-emerald-200/60',
  teal:    'ring-teal-200/60',
  sky:     'ring-sky-200/60',
  orange:  'ring-orange-200/60',
  violet:  'ring-violet-200/60',
  indigo:  'ring-indigo-200/60',
  fuchsia: 'ring-fuchsia-200/60',
  gray:    'ring-gray-200/60',
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
