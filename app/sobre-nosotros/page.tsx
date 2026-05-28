import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { waLink } from '@/lib/utils'
import { MessageCircle, Globe, Zap, Heart, Users, Code2, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros · ParaguAI',
  description:
    'Quiénes somos. Ai-Whisperers construye sitios web para negocios paraguayos y latinos. Asunción, Paraguay.',
  alternates: { canonical: '/sobre-nosotros' },
}

const TEAM = [
  {
    name: 'Iván Weiss Van Der Pol',
    role: 'Founder & Lead Developer',
    desc: 'Ingeniero de software, Paraguay. Construye la infraestructura que mueve a ParaguAI — desde el servidor hasta el último píxel.',
  },
  {
    name: 'Kyrian (Kiki)',
    role: 'Sales & Marketing Lead',
    desc: 'Maneja cada nuevo negocio que entra por WhatsApp. Entiende qué necesitan las PYMEs paraguayas y cómo comunicarlo.',
  },
  {
    name: 'Erebus',
    role: 'AI Workforce Lead',
    desc: 'Agente de IA que construye, arregla y despliega. Ejecución sin fricción — cada día asegura que el sitio de cada cliente esté online y funcionando.',
  },
]

const VALUES = [
  {
    icon: Zap,
    title: '48 horas o nada',
    desc: 'No meses, no sprints. Desde que nos mandás la info, en 48h tenés un sitio listo para revisar — y recién ahí pagás.',
  },
  {
    icon: Code2,
    title: 'Código que funciona',
    desc: 'Cada sitio tiene su repo, su dominio propio, su SSL. Te lo llevás cuando quieras. Sin candados.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue > Infra',
    desc: 'No gastamos en Kubernetes si un hosting simple resuelve el problema. Invertimos donde el cliente lo ve.',
  },
  {
    icon: Heart,
    title: 'Hecho en Paraguay',
    desc: 'De Asunción para el mundo. Entendemos precios en guaraníes, qué buscan los clientes paraguayos y cómo se comunican los negocios locales.',
  },
]

export default function SobreNosotrosPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-20">

        {/* ── Hero ── */}
        <div className="mx-auto max-w-4xl px-5 text-center">
          <span className="section-label">Quiénes somos</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Ai-Whisperers · ParaguAI
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-gray-600">
            Somos un estudio de desarrollo web para negocios paraguayos y latinoamericanos.
            Detrás de ParaguAI hay un equipo que combina desarrollo de software, marketing
            y agentes de IA para entregar sitios profesionales en tiempo récord, sin que el
            cliente toque una línea de código.
          </p>
        </div>

        {/* ── Stats strip ── */}
        <div className="mt-16 border-y border-gray-100 bg-gray-50">
          <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-gray-200 px-5">
            {[
              { n: '6+', label: 'Sitios en producción' },
              { n: '48h', label: 'Tiempo promedio de entrega' },
              { n: '99.9%', label: 'Uptime garantizado' },
            ].map(({ n, label }) => (
              <div key={label} className="py-8 text-center">
                <p className="text-3xl font-extrabold text-primary-600">{n}</p>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Qué hacemos ── */}
        <div className="mx-auto mt-16 max-w-4xl px-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <Icon size={18} className="text-primary-600" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── El equipo ── */}
        <div className="mx-auto mt-16 max-w-4xl px-5">
          <span className="section-label">El equipo</span>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Tres cabezadas, un objetivo
          </h2>
          <p className="mt-3 text-gray-600">
            Ai-Whisperers corre con un equipo mínimo pero con herramientas de nivel enterprise.
            Cada persona — y cada agente — tiene una función clara.
          </p>

          <div className="mt-8 space-y-4">
            {TEAM.map(({ name, role, desc }) => (
              <div key={name} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-brand-500 text-white font-bold text-lg">
                  {name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{role}</p>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cómo trabajamos ── */}
        <div className="mx-auto mt-16 max-w-4xl px-5">
          <span className="section-label">El proceso</span>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Tres pasos, ningún dolor de cabeza
          </h2>
          <div className="mt-8 space-y-6">
            {[
              { n: '01', title: 'Nos escribís por WhatsApp', desc: 'Nombre del negocio, servicios, precios y fotos. Sin formularios.' },
              { n: '02', title: 'En 48h tenés tu demo lista', desc: 'Link de preview. Lo revisás, pedís ajustes, confirmás que está todo bien.' },
              { n: '03', title: 'Publicamos y mantenemos', desc: 'Dominio .com.py, SSL, SEO. Cambios mensuales ilimitados por WhatsApp.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {n}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mx-auto mt-20 max-w-4xl px-5 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-brand-600 p-10 text-white">
            <h2 className="text-2xl font-bold md:text-3xl">¿Hablamos de tu proyecto?</h2>
            <p className="mt-3 max-w-xl mx-auto text-white/80">
              Mandanos tu negocio por WhatsApp y en 24h tenés una demo gratis, sin compromiso.
            </p>
            <a
              href={waLink('Hola, quiero saber más de ParaguAI para mi negocio.')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>Asunción, Paraguay</span>
            <span>·</span>
            <a href="mailto:hello@paragu-ai.com" className="hover:text-gray-600">hello@paragu-ai.com</a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
