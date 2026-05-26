'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Menu, X } from 'lucide-react'
import { waLink } from '@/lib/utils'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/precios', label: 'Precios' },
  { href: '/metodo', label: 'Método' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            <span className="bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
              Paragu
            </span>
            AI
          </Link>
          <ul className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gray-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href={waLink('Hola, vi ParaguAI y quiero saber más.')}
              className="hidden rounded-full bg-gradient-to-r from-primary-600 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:shadow-lg md:inline-flex items-center gap-2"
            >
              <MessageCircle size={15} />
              Pedir demo
            </a>
            <button className="p-2 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menú">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="border-t border-gray-100 bg-white px-5 py-4 md:hidden">
            <ul className="space-y-3 text-base font-medium text-gray-700">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
