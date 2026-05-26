import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold text-white">
              <span className="bg-gradient-to-r from-primary-400 to-brand-400 bg-clip-text text-transparent">
                Paragu
              </span>
              AI
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Creamos sitios web profesionales para negocios paraguayos. Todo
              incluido: diseño, dominio .com.py, SEO y WhatsApp.
            </p>
            <a
              href={waLink('Hola, quiero saber más de ParaguAI.')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle size={15} />
              Escribir por WhatsApp
            </a>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Navegación
            </p>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/clientes', label: 'Clientes' },
                { href: '/precios', label: 'Precios' },
                { href: '/metodo', label: 'Método' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Contacto
            </p>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>WhatsApp: +595 981 324 569</li>
              <li>Email: hello@paragu-ai.com</li>
              <li>Asunción, Paraguay</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} ParaguAI · Asunción, Paraguay
        </div>
      </div>
    </footer>
  )
}
