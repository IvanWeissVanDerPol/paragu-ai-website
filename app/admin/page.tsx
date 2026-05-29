'use client'

import { useState, useEffect } from 'react'
import { adminFetchJson } from '@/lib/admin-fetch'

interface ClientRow {
  id: string; name: string; slug: string; url: string; rubro: string
  type: string; status: string; plan: string | null; reviews: number | null; leads: number | null; github_url: string | null
}
interface LeadRow { id: string; business: string; score: number; distance_km: number; reviews: number; status: string }
interface RevenueRow { id: string; client_slug: string; plan: string; monthly_gs: number; setup_gs: number; status: string; start_date: string; next_renewal_at: string | null }
interface SummaryData { clients: ClientRow[]; leads: LeadRow[]; mrr: number; payingCount: number; revenue: RevenueRow[] }

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
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminFetchJson<SummaryData>('/api/admin/summary/')
      .then(setData)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 32, color: '#9ca3af' }}>Loading dashboard...</div>
  if (error || !data) return <div style={{ padding: 32, color: '#f87171' }}>{error || 'No data'}</div>

  const { clients, leads, mrr, payingCount, revenue } = data
  const paying = clients.filter(c => c.type === 'paying')
  const live = clients.filter(c => c.status === 'live')
  const mrrFormatted = `Gs ${(mrr / 1000000).toFixed(1)}M`
  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status))
  const topLeads = leads.filter(l => l.score >= 80).slice(0, 5)

  const filtered = clients.filter(c => {
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
        <StatCard label="Total Clients" value={String(clients.length)} sub={`${payingCount} paying`} color="#a855f7" />
        <StatCard label="MRR" value={mrrFormatted} sub={`${revenue.length} active plans`} color="#22c55e" />
        <StatCard label="Active Leads" value={String(activeLeads.length)} sub="pipeline" color="#f59e0b" />
        <StatCard label="Top Score" value={topLeads.length > 0 ? String(topLeads[0].score) : '—'} sub={topLeads.length > 0 ? topLeads[0].business : 'N/A'} color="#3b82f6" />
        <StatCard label="Live Sites" value={String(live.length)} sub={clients.length - live.length > 0 ? `${clients.length - live.length} not live` : 'all live'} color="#06b6d4" />
        <StatCard label="Paying Clients" value={String(payingCount)} sub="active subscribers" color="#22c55e" />
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
              {topLeads.map((lead) => (
                <tr key={lead.id} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '10px 0', fontWeight: 600 }}>{lead.business}</td>
                  <td style={{ padding: '10px 0', color: '#22c55e', fontWeight: 700 }}>{lead.score}</td>
                  <td style={{ padding: '10px 0', color: '#666' }}>{lead.distance_km}km</td>
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
              {revenue.map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '10px 0', fontWeight: 600 }}>{r.client_slug}</td>
                  <td style={{ padding: '10px 0', color: '#a855f7' }}>{r.plan}</td>
                  <td style={{ padding: '10px 0', fontWeight: 700 }}>Gs {(r.monthly_gs / 100000).toFixed(0)}K</td>
                  <td style={{ padding: '10px 0', color: '#666' }}>{r.next_renewal_at ? new Date(r.next_renewal_at).toLocaleDateString() : '—'}</td>
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
          {(() => {
            const rubroMap: Record<string, { count: number; color: string }> = {}
            const colors = ['#92400e', '#7c9885', '#b76e79', '#2d6a4f', '#be185d', '#9333ea', '#1e3a5f', '#475569']
            let ci = 0
            for (const c of clients) {
              if (!rubroMap[c.rubro]) { rubroMap[c.rubro] = { count: 0, color: colors[ci++ % colors.length] } }
              rubroMap[c.rubro].count++
            }
            return Object.entries(rubroMap).map(([rubro, { count, color }]) => (
              <div key={rubro} style={{
                background: '#0a0a0f',
                border: `1px solid ${color}33`,
                borderRadius: 8,
                padding: '12px 16px',
                minWidth: 120
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color }}>{count}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{rubro}</div>
              </div>
            ))
          })()}
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
                  {c.github_url ? (
                    <a href={c.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 16 }}>📦</a>
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
