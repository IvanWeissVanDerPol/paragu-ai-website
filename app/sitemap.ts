import type { MetadataRoute } from 'next'
import { CLIENTS } from '@/lib/data'

const BASE = 'https://paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/clientes', '/precios', '/metodo', '/sobre-nosotros', '/faq']

  const staticEntries = staticPages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const clientEntries = CLIENTS.map((client) => ({
    url: `${BASE}/clientes/${client.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...clientEntries]
}
