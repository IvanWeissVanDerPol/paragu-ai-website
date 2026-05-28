import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { MessageCircle, Globe, Zap, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros · ParaguAI',
  description:
    'Quiénes somos. Creamos sitios web profesionales para negocios paraguayos. Asunción, Paraguay.',
  alternates: { canonical: '/sobre-nosotros' },
}

export default function SobreNosotrosPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-3xl px-5">

          <span className="section-label">Quiénes somos</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Hacemos que tu negocio se vea bien en internet
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            ParaguAI es un estudio de desarrollo web para negocios paraguayos.
            No vendemos plantillas. Armamos sitios reales con diseño profesional,
            dominio propio, SEO y WhatsApp integrado — pensados para que tus
            clientes te encuentren y te contacten.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <Globe size={18} className="text-primary-600" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Dominio .com.py</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Tu negocio merece una URL profesional. Registramos y configuramos
                tu dominio con SSL incluido el primer año.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <Zap size={18} className="text-primary-600" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Listo en 48 horas</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                No esperamos meses. Desde que nos mandás la info, en 48h tenés
                un sitio listo para revisar — y recién ahí pagás.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <MessageCircle size={18} className="text-primary-600" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">WhatsApp directo</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Cada sitio tiene un botón de WhatsApp Business. Tus clientes te
                escriben con un clic, sin formularios.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <Heart size={18} className="text-primary-600" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Hecho en Paraguay</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Somos de Asunción. Entendemos el mercado paraguayo: los rubros,
                los precios en guaraníes y cómo se comunican los negocios locales.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-center text-white">
            <h2 className="text-2xl font-bold md:text-3xl">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-white/80">
              Mános tu negocio por WhatsApp y en 24h tenés una demo gratis,
              sin compromiso.
            </p>
            <a
              href={waLink('Hola, quiero saber más de ParaguAI para mi negocio.')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>Asunción, Paraguay</span>
            <span>·</span>
            <a href="mailto:hello@paragu-ai.com" className="hover:text-gray-600">
              hello@paragu-ai.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
