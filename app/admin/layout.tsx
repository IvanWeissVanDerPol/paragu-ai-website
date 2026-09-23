'use client'

import { useState } from 'react'
import Link from 'next/link'

type NavItem = { href: string; label: string; icon: string } | { type: 'separator' }

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/leads', label: 'Leads', icon: '🎯' },
  { href: '/admin/clients', label: 'Clients', icon: '🏢' },
  { href: '/admin/revenue', label: 'Revenue', icon: '💰' },
  { href: '/admin/domains', label: 'Domains', icon: '🌐' },
  { href: '/admin/deployments', label: 'Deployments', icon: '🚀' },
  { href: '/admin/repos', label: 'Repos', icon: '📦' },
  { href: '/admin/activity', label: 'Activity', icon: '📝' },
  { type: 'separator' },
  { href: '/admin/mburucuya', label: 'Mburucuyá', icon: '🌸' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 64,
        background: '#111118',
        borderRight: '1px solid #1a1a24',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid #1a1a24',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: sidebarOpen ? 'flex-start' : 'center'
        }}>
          <span style={{ fontSize: 24 }}>🟣</span>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#a855f7' }}>ParaguAI</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {NAV_ITEMS.map((item, idx) => {
            if ('type' in item && item.type === 'separator') {
              return (
                <div key={idx} style={{ height: 1, background: '#1a1a24', margin: '8px 12px' }} />
              )
            }
            // TypeScript guard: item now has href
            const navItem = item as { href: string; label: string; icon: string }
            return (
            <Link
              key={navItem.href}
              href={navItem.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                color: '#999',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 4,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a24'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#999'
              }}
            >
              <span style={{ fontSize: 18 }}>{navItem.icon}</span>
              {sidebarOpen && navItem.label}
            </Link>
            )
          })}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: 16,
            borderTop: '1px solid #1a1a24',
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: 18,
            textAlign: 'center'
          }}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}