import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { getSortedClients } from '@/lib/getSortedClients'
import { INITIAL_ORDER } from '@/lib/client-order'
import ClientImage from '@/components/ClientImage'


export const metadata: Metadata = {
  title: 'Sitios Reales · ParaguAI',
  description:
    'Negocios paraguayos reales con su sitio web en ParaguAI. Peluquerías, gimnasios, spas, tatuajes, cervecerías y más.',
  alternates: { canonical: '/clientes' },
}

export default function ClientesPage() {
  const orderedClients = [...getSortedClients()].sort((a, b) => {
    const ao = INITIAL_ORDER[a.slug] ?? a.order
    const bo = INITIAL_ORDER[b.slug] ?? b.order
    return ao - bo
  })

  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <span className="section-label">Portafolio</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Sitios Reales
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              No son plantillas vacías. Son negocios paraguayos que ya venden
              online con ParaguAI. Cada uno tiene Leads, reservas o pedidos
              reales.
            </p>
          </div>

          {/* worst-first per memory instructions */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orderedClients.map((c) => (
              <a
                key={c.slug}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <ClientImage
                    src={`/screenshots/${c.slug}.jpg`}
                    alt={`${c.name} — ${c.rubro}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-500">
                    {c.rubro}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-600">
                    Ver sitio
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center rounded-3xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-white">
            <h2 className="text-2xl font-bold md:text-3xl">
              El próximo puede ser el tuyo
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-white/80">
              Mandanos tu negocio por WhatsApp y en 24h tenés una demo gratis,
              sin compromiso.
            </p>
            <a
              href={waLink('Hola, quiero una demo gratis como los sitios del portafolio.')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Quiero mi demo gratis
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
