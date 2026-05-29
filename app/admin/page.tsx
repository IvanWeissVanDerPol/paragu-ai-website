'use client'

import { useState } from 'react'
import { ADMIN_CLIENTS } from '@/lib/admin-data'
import { LEADS, REVENUE, DEPLOYMENTS } from '@/lib/admin-full-data'

// Stats card component
function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{
      background: '#111118',
      border: '1px solid #1a1a24',
      borderRadius: 12,
      padding: '20px 24px',
      flex: 1,
      minWidth: 160
    }}>
      <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// Status badge
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: '#22c55e', paying: '#a855f7', deploying: '#f59e0b', offline: '#ef4444',
    new: '#3b82f6', contacted: '#f59e0b', demo: '#8b5cf6', negotiating: '#06b6d4', won: '#22c55e', lost: '#6b7280'
  }
  return (
    <span style={{
      background: colors[status] || '#666',
      color: '#fff',
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase'
    }}>{status}</span>
  )
}

export default function DashboardPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const paying = ADMIN_CLIENTS.filter(c => c.type === 'paying')
  const live = ADMIN_CLIENTS.filter(c => c.status === 'live')
  const mrr = REVENUE.reduce((sum, r) => sum + r.monthlyGs, 0) / 1000000
  const mrrFormatted = `Gs ${mrr.toFixed(1)}M`
  const activeLeads = LEADS.filter(l => !['won', 'lost'].includes(l.status))
  const topLeads = LEADS.filter(l => l.score >= 80).slice(0, 5)
  const deployingCount = DEPLOYMENTS.filter(d => d.status !== 'running').length

  const filtered = ADMIN_CLIENTS.filter(c => {
    if (filter !== 'all' && c.type !== filter && c.status !== filter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Dashboard</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Overview of all ParaguAI operations</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <StatCard label="Total Clients" value="30" sub="4 paying" color="#a855f7" />
        <StatCard label="MRR" value={mrrFormatted} sub="4 active plans" color="#22c55e" />
        <StatCard label="Active Leads" value={String(activeLeads.length)} sub="pipeline" color="#f59e0b" />
        <StatCard label="Top Score" value="133.2" sub="Estudio Medieval" color="#3b82f6" />
        <StatCard label="Deployments" value={String(DEPLOYMENTS.length)} sub={deployingCount > 0 ? `${deployingCount} degraded` : 'all healthy'} color="#06b6d4" />
        <StatCard label="Won this month" value="4" sub="4 paying clients" color="#22c55e" />
      </div>

      {/* Top Leads + Revenue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Top Leads */}
        <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#f59e0b' }}>🎯 Top Leads by Score</h2>
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Business</th>
                <th style={{ paddingBottom: 8 }}>Score</th>
                <th style={{ paddingBottom: 8 }}>Dist</th>
                <th style={{ paddingBottom: 8 }}>Reviews</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {topLeads.map((lead, i) => (
                <tr key={lead.id} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '10px 0', fontWeight: 600 }}>{lead.business}</td>
                  <td style={{ padding: '10px 0', color: '#22c55e', fontWeight: 700 }}>{lead.score}</td>
                  <td style={{ padding: '10px 0', color: '#666' }}>{lead.distanceKm}km</td>
                  <td style={{ padding: '10px 0', color: '#666' }}>{lead.reviews}</td>
                  <td style={{ padding: '10px 0' }}><StatusBadge status={lead.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue */}
        <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#22c55e' }}>💰 Revenue</h2>
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Client</th>
                <th style={{ paddingBottom: 8 }}>Plan</th>
                <th style={{ paddingBottom: 8 }}>Monthly</th>
                <th style={{ paddingBottom: 8 }}>Renewal</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE.map((r, i) => (
                <tr key={r.clientId} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '10px 0', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: '10px 0', color: '#a855f7' }}>{r.plan}</td>
                  <td style={{ padding: '10px 0', fontWeight: 700 }}>Gs {(r.monthlyGs / 100000).toFixed(0)}K</td>
                  <td style={{ padding: '10px 0', color: '#666' }}>{r.nextRenewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rubro Breakdown */}
      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📂 Clients by Rubro</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { rubro: 'Barbería', count: 6, color: '#92400e' },
            { rubro: 'Spa & Wellness', count: 5, color: '#7c9885' },
            { rubro: 'Belleza', count: 7, color: '#b76e79' },
            { rubro: 'Gimnasio', count: 3, color: '#2d6a4f' },
            { rubro: 'Uñas / Nails', count: 3, color: '#be185d' },
            { rubro: 'Maquillaje', count: 2, color: '#9333ea' },
            { rubro: 'Tatuajes', count: 2, color: '#1e3a5f' },
            { rubro: 'Otros', count: 2, color: '#475569' },
          ].map(r => (
            <div key={r.rubro} style={{
              background: '#0a0a0f',
              border: `1px solid ${r.color}33`,
              borderRadius: 8,
              padding: '12px 16px',
              minWidth: 120
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: r.color }}>{r.count}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{r.rubro}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Table */}
      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: '#0a0a0f',
              border: '1px solid #1a1a24',
              borderRadius: 8,
              padding: '8px 16px',
              color: '#fff',
              fontSize: 14,
              width: 240
            }}
          />
          {['all', 'paying', 'demo', 'showcase'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? '#a855f7' : '#0a0a0f',
                border: '1px solid #1a1a24',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#fff',
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ color: '#666', textAlign: 'left' }}>
              <th style={{ paddingBottom: 12 }}>#</th>
              <th style={{ paddingBottom: 12 }}>Client</th>
              <th style={{ paddingBottom: 12 }}>Rubro</th>
              <th style={{ paddingBottom: 12 }}>Type</th>
              <th style={{ paddingBottom: 12 }}>Reviews</th>
              <th style={{ paddingBottom: 12 }}>Leads</th>
              <th style={{ paddingBottom: 12 }}>Status</th>
              <th style={{ paddingBottom: 12 }}>Plan</th>
              <th style={{ paddingBottom: 12 }}>GitHub</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 20).map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid #1a1a24' }}>
                <td style={{ padding: '12px 0', color: '#666' }}>{i + 1}</td>
                <td style={{ padding: '12px 0', fontWeight: 600 }}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{c.name}</a>
                </td>
                <td style={{ padding: '12px 0', color: '#666' }}>{c.rubro}</td>
                <td style={{ padding: '12px 0' }}><StatusBadge status={c.type} /></td>
                <td style={{ padding: '12px 0', color: c.reviews ? '#f59e0b' : '#666' }}>{c.reviews || '-'}</td>
                <td style={{ padding: '12px 0', color: c.leads ? '#22c55e' : '#666' }}>{c.leads || '-'}</td>
                <td style={{ padding: '12px 0' }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: '12px 0', color: '#666', fontSize: 12 }}>{c.plan || '-'}</td>
                <td style={{ padding: '12px 0' }}>
                  {c.githubUrl ? (
                    <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 16 }}>📦</a>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}