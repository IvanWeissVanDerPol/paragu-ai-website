'use client'

import { useState, useEffect } from 'react'
import { adminFetchJson } from '@/lib/admin-fetch'

interface DomainRow {
  id: string; client_slug: string; domain: string; registrar: string
  expiry_date: string | null; renewal_cost_gs: number; ssl_status: string; dns_configured: boolean
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<DomainRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminFetchJson<{ domains: DomainRow[] }>('/api/admin/ops/')
      .then(d => setDomains(d.domains ?? []))
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 32, color: '#9ca3af' }}>Loading domains...</div>
  if (error) return <div style={{ padding: 32, color: '#f87171' }}>{error}</div>

  const filtered = domains.filter(d =>
    !search || d.domain.includes(search.toLowerCase()) || d.client_slug.includes(search.toLowerCase())
  )

  const sslValid = domains.filter(d => d.ssl_status === 'valid').length
  const expiring = domains.filter(d => d.ssl_status === 'expiring').length
  const totalCost = domains.reduce((s, d) => s + (d.renewal_cost_gs || 0), 0)

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌐 Domain Tracker</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{domains.length} tracked domains — SSL, expiry, registrar</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Domains', value: domains.length, color: '#3b82f6' },
          { label: 'SSL Valid', value: sslValid, color: '#22c55e' },
          { label: 'Expiring Soon', value: expiring, color: '#f59e0b' },
          { label: 'Total Renewal Cost', value: `Gs ${(totalCost / 1000000).toFixed(2)}M`, color: '#a855f7' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
            padding: '16px 24px', flex: 1, minWidth: 160
          }}>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search domains..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8,
              padding: '8px 16px', color: '#fff', fontSize: 14, width: 220
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ color: '#666', fontSize: 13, padding: 16 }}>
            No domains in database. Domains will appear here when seeded or synced from VPS.
          </div>
        ) : (
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Domain</th>
                <th style={{ paddingBottom: 8 }}>Client</th>
                <th style={{ paddingBottom: 8 }}>Registrar</th>
                <th style={{ paddingBottom: 8 }}>Expires</th>
                <th style={{ paddingBottom: 8 }}>Renewal</th>
                <th style={{ paddingBottom: 8 }}>SSL</th>
                <th style={{ paddingBottom: 8 }}>DNS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>
                    <a href={`https://${d.domain}`} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'none' }}>{d.domain}</a>
                  </td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.client_slug}</td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.registrar || '—'}</td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.expiry_date ? new Date(d.expiry_date).toLocaleDateString() : '—'}</td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.renewal_cost_gs ? `Gs ${(d.renewal_cost_gs / 100000).toFixed(0)}K` : '—'}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{
                      background: d.ssl_status === 'valid' ? '#22c55e' : d.ssl_status === 'expiring' ? '#f59e0b' : '#ef4444',
                      color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                    }}>{d.ssl_status || 'unknown'}</span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 16 }}>{d.dns_configured ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
