'use client'

import { useState } from 'react'
import { DOMAINS } from '@/lib/admin-full-data'

function formatDate(d: string) {
  const date = new Date(d)
  const now = new Date()
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  if (diff < 0) return { text: 'EXPIRED', color: '#ef4444' }
  if (diff < 30) return { text: `${Math.ceil(diff)}d`, color: '#f59e0b' }
  return { text: d, color: '#666' }
}

export default function DomainsPage() {
  const [search, setSearch] = useState('')
  const filtered = DOMAINS.filter(d =>
    !search || d.domain.includes(search.toLowerCase()) || d.clientId.includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌐 Domain Tracker</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{DOMAINS.length} tracked domains — SSL, expiry, registrar</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Domains', value: DOMAINS.length, color: '#3b82f6' },
          { label: 'SSL Valid', value: DOMAINS.filter(d => d.sslStatus === 'valid').length, color: '#22c55e' },
          { label: 'Expiring Soon', value: DOMAINS.filter(d => d.sslStatus === 'expiring').length, color: '#f59e0b' },
          { label: 'Total Renewal Cost', value: `Gs ${(DOMAINS.reduce((s, d) => s + d.renewalCostGs, 0) / 1000000).toFixed(2)}M`, color: '#a855f7' },
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

        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ color: '#666', textAlign: 'left' }}>
              <th style={{ paddingBottom: 8 }}>Domain</th>
              <th style={{ paddingBottom: 8 }}>Registrar</th>
              <th style={{ paddingBottom: 8 }}>Expires</th>
              <th style={{ paddingBottom: 8 }}>Renewal</th>
              <th style={{ paddingBottom: 8 }}>SSL</th>
              <th style={{ paddingBottom: 8 }}>DNS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const expiry = formatDate(d.expiryDate)
              return (
                <tr key={d.clientId} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>
                    <a href={`https://${d.domain}`} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'none' }}>{d.domain}</a>
                  </td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.registrar}</td>
                  <td style={{ padding: '12px 0', color: expiry.color, fontWeight: 600 }}>{expiry.text}</td>
                  <td style={{ padding: '12px 0', color: '#666' }}>Gs {(d.renewalCostGs / 100000).toFixed(0)}K</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{
                      background: d.sslStatus === 'valid' ? '#22c55e' : d.sslStatus === 'expiring' ? '#f59e0b' : '#ef4444',
                      color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                    }}>{d.sslStatus}</span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 16 }}>{d.dnsConfigured ? '✅' : '❌'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}