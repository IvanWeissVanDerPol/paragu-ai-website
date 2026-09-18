import {
  Scissors, Sparkles, Dumbbell, Heart, Stethoscope, UtensilsCrossed,
  CalendarDays, Briefcase, Drama, MoreHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// AIW brand: teal/cyan only. Four tonal levels so verticals stay visually
// distinct without breaking the unified brand palette.
export type Accent = 'tint' | 'mid' | 'cyan' | 'deep'

export type ClientRow = {
  name: string
  slug: string
  url: string
  desc?: string
  category: string
  accent: Accent
  order: number
}

type Catalog = {
  categories: string[]
  accents: Record<string, Accent>
  clients: ClientRow[]
}

import data from './clients.json'

const catalog = data as Catalog

export const ACCENTS: Record<string, Accent> = catalog.accents
export const CATEGORY_ORDER: string[] = catalog.categories

export const CATEGORY_META: Record<string, { label: string; icon: LucideIcon; subtitle: string }> = {
  'Belleza y Estética':       { label: 'Belleza y Estética',       icon: Sparkles,        subtitle: 'Peluquerías, uñas, depilación, cosmética — sitios con reserva online.' },
  'Barbería':                 { label: 'Barbería',                 icon: Scissors,         subtitle: 'Barberías con agenda, fotos del equipo y reseñas.' },
  'Gimnasio y Fitness':       { label: 'Gimnasio y Fitness',       icon: Dumbbell,         subtitle: 'Academias, crossfit y funcionales con planes y horarios.' },
  'Spa y Bienestar':          { label: 'Spa y Bienestar',          icon: Heart,            subtitle: 'Spas, masajes y bienestar con reserva por WhatsApp.' },
  'Salud y Bienestar':        { label: 'Salud y Bienestar',        icon: Stethoscope,      subtitle: 'Servicios de salud, materna y cuidado.' },
  'Gastronomía':              { label: 'Gastronomía',              icon: UtensilsCrossed,  subtitle: 'Delivery, restaurantes, cervecerías y meal prep.' },
  'Eventos y Espacios':       { label: 'Eventos y Espacios',       icon: CalendarDays,     subtitle: 'Cumpleaños, venues, clubes y eventos culturales.' },
  'Servicios Profesionales':  { label: 'Servicios Profesionales',  icon: Briefcase,        subtitle: 'Legal, reubicación, contabilidad y más.' },
  'Cultura y Espectáculos':   { label: 'Cultura y Espectáculos',   icon: Drama,            subtitle: 'Stand up, comedia y shows.' },
  'Otros':                    { label: 'Otros',                    icon: MoreHorizontal,   subtitle: 'Proyectos especiales.' },
}

export const RUBROS: Record<string, string> = {
  'hidrobaby-spa': 'Spa Maternal',
  'nutrifit-spa': 'Spa & Nutrición',
  'cuidadoamiga': 'Salud Maternal',
  'salud-abierta': 'Salud',
  'barbye-nails': 'Uñas',
  'clau-bellino': 'Estética Facial',
  'shine-nails': 'Uñas',
  'woman-cosmeticos': 'Cosmética',
  'lele-ferreira': 'Maquillaje',
  'leticia-carballo': 'Hair & Makeup',
  'viviesteticpy': 'Estética',
  'avani-belleza': 'Belleza Integral',
  'depiflash': 'Depilación',
  'estudio-medieval': 'Tatuajes',
  'jota-ink-tattoo': 'Tatuajes',
  'scott-tatuajes': 'Tatuajes',
  'arnos-barber-shop': 'Barbería',
  'barbershop-peluqueria': 'Barbería',
  'peluqueria-barbershop': 'Barbería',
  'portas-barber': 'Barbería Premium',
  'nde-barba': 'Barbería',
  'magnolia-peluqueria': 'Peluquería',
  'de-abasto-a-casa': 'Delivery',
  'meal-prep': 'Meal Prep',
  'stroopwafel-huis': 'Stroopwafels',
  'trentina-cerveza': 'Cerveza Artesanal',
  'tsuki-restaurante': 'Restaurante',
  'fun4me-store': 'Eventos Infantiles',
  'maskarada': 'Eventos',
  'rockabar': 'Bar / Eventos',
  'camilo-acosta': 'Stand Up',
}

export function getAllClients(): ClientRow[] {
  return [...catalog.clients].sort((a, b) => {
    if (a.category !== b.category) {
      return CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    }
    return a.order - b.order
  })
}

export function getClientsByCategory(): Record<string, ClientRow[]> {
  const grouped: Record<string, ClientRow[]> = {}
  for (const c of catalog.clients) {
    grouped[c.category] = grouped[c.category] || []
    grouped[c.category].push(c)
  }
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((a, b) => a.order - b.order)
  }
  return grouped
}

export const SLUGS_WITH_SCREENSHOT = new Set<string>([
  // Visually-distinct live-site screenshots (no template-clones).
  // Anything NOT in this set gets a colored monogram fallback card.
  'arnos-barber-shop', 'avani-belleza', 'barbye-nails', 'bichosgym',
  'camilo-acosta', 'clau-bellino', 'cronos-academy', 'dayah',
  'depiflash', 'elgatosiames', 'estudio-contable', 'estudio-medieval',
  'golden-visa', 'hidrobaby-spa', 'jota-ink-tattoo', 'lele-ferreira',
  'leticia-carballo', 'magnolia-flower', 'magnolia-peluqueria',
  'mantraspa', 'nde-barba', 'nexa', 'nudo', 'nutrifit-spa', 'ozz',
  'portas-barber', 'reinadecopas', 'scott-tatuajes', 'superspuma',
  'treinta-cerveza', 'villamayor-asociados', 'xxgym',
])
