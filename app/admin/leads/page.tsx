'use client'

import { useEffect, useState } from 'react'
import type { Lead, LeadStatus } from '@/lib/admin-full-data'
import { adminFetchJson } from '@/lib/admin-fetch'

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: '#3b82f6', contacted: '#f59e0b', demo: '#8b5cf6',
  negotiating: '#06b6d4', won: '#22c55e', lost: '#6b7280'
}

const SOURCE_LABELS: Record<string, string> = {
  google_maps: '📍 Google Maps', whatsapp: '💬 WhatsApp', referral: '👥 Referral',
  cold_outreach: '📧 Cold Outreach', event: '🎪 Event', infonegocios: '📰 Infonegocios', viralist: '🔥 Viralist'
}

function LeadRow({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <tr
      onClick={onClick}
      style={{ borderTop: '1px solid #1a1a24', cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#1a1a24')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <td style={{ padding: '12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `hsl(${(lead.score / 133.2) * 120}, 60%, 40%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 12, color: '#fff'
          }}>{lead.score}</div>
        </div>
      </td>
      <td style={{ padding: '12px 8px' }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{lead.business}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{lead.owner}</div>
      </td>
      <td style={{ padding: '12px 8px', color: '#666', fontSize: 13 }}>{lead.category}</td>
      <td style={{ padding: '12px 8px' }}>
        <span style={{
          background: STATUS_COLORS[lead.status],
          color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
        }}>{lead.status}</span>
      </td>
      <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{SOURCE_LABELS[lead.source] || lead.source}</td>
      <td style={{ padding: '12px 8px' }}>
        <span style={{ color: '#f59e0b', fontWeight: 700 }}>{lead.distanceKm}km</span>
        <div style={{ fontSize: 11, color: '#666' }}>to FP</div>
      </td>
      <td style={{ padding: '12px 8px', color: lead.reviews > 100 ? '#f59e0b' : '#666' }}>{lead.reviews} ⭐</td>
      <td style={{ padding: '12px 8px', color: '#666', fontSize: 12 }}>{lead.rating}★</td>
      <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{lead.assignedTo || '-'}</td>
      <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{lead.lastContact || '-'}</td>
    </tr>
  )
}

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'score' | 'distance' | 'reviews'>('score')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    adminFetchJson<Lead[]>('/api/admin/leads')
      .then((rows) => {
        if (!active) return
        setLeads(rows)
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Failed to load leads')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const categories = [...new Set(leads.map(l => l.category))].sort()
  const statusOptions: LeadStatus[] = ['new', 'contacted', 'demo', 'negotiating', 'won', 'lost']

  const filtered = leads
    .filter(l => statusFilter === 'all' || l.status === statusFilter)
    .filter(l => categoryFilter === 'all' || l.category === categoryFilter)
    .filter(l => !search || l.business.toLowerCase().includes(search.toLowerCase()) || l.owner.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm
      return b.reviews - a.reviews
    })

  // Stats
  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'new').length
  const demoSent = leads.filter(l => ['demo', 'negotiating'].includes(l.status)).length
  const won = leads.filter(l => l.status === 'won').length
  const conversionRate = totalLeads > 0 ? ((won / totalLeads) * 100).toFixed(1) : '0'

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎯 Lead Pipeline</h1>
        <p style={{ color: '#666', fontSize: 14 }}>All {totalLeads} leads — ranked by geographic proximity to Politécnica</p>
      </div>

      {loading ? <div style={{ color: '#9ca3af', marginBottom: 20 }}>Loading leads...</div> : null}
      {error ? <div style={{ color: '#f87171', marginBottom: 20 }}>{error}</div> : null}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Leads', value: totalLeads, color: '#3b82f6' },
          { label: 'New', value: newLeads, color: '#3b82f6' },
          { label: 'Demo Sent', value: demoSent, color: '#8b5cf6' },
          { label: 'Won', value: won, color: '#22c55e' },
          { label: 'Conversion', value: `${conversionRate}%`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#111118', border: '1px solid #1a1a24',
            borderRadius: 12, padding: '16px 24px', flex: 1
          }}>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Map hint */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        border: '1px solid #1a1a24',
        borderRadius: 12, padding: '20px 24px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 16
      }}>
        <div style={{ fontSize: 32 }}>📍</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Geographic Priority Anchor</div>
          <div style={{ fontSize: 13, color: '#666' }}>
            <strong style={{ color: '#f59e0b' }}>Facultad Politécnica, Fernando de la Mora Norte</strong> — primary proximity criterion for lead scoring. All leads sorted by distance to this anchor.
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8,
            padding: '8px 16px', color: '#fff', fontSize: 14, width: 220
          }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13 }}>
          <option value="all">All Status</option>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          style={{ background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13 }}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Sort:</span>
          {(['score', 'distance', 'reviews'] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              style={{
                background: sortBy === s ? '#a855f7' : '#0a0a0f',
                border: '1px solid #1a1a24', borderRadius: 8, padding: '6px 12px',
                color: '#fff', fontSize: 12, cursor: 'pointer'
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#0a0a0f', color: '#666' }}>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Score</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Business / Owner</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Source</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Distance</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Reviews</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Rating</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Assigned</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(lead => <LeadRow key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />)}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 100
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111118', border: '1px solid #1a1a24',
              borderRadius: 16, padding: 32, maxWidth: 600, width: '90%', maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedLead.business}</h2>
                <p style={{ color: '#666', fontSize: 14 }}>{selectedLead.owner}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{
                background: '#1a1a24', border: 'none', borderRadius: 8,
                padding: '8px 16px', color: '#fff', cursor: 'pointer'
              }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#0a0a0f', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>SCORE</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#22c55e' }}>{selectedLead.score}</div>
              </div>
              <div style={{ background: '#0a0a0f', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>DISTANCE TO FP</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b' }}>{selectedLead.distanceKm}km</div>
              </div>
              <div style={{ background: '#0a0a0f', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>REVIEWS</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#3b82f6' }}>{selectedLead.reviews}</div>
              </div>
              <div style={{ background: '#0a0a0f', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>RATING</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b' }}>{selectedLead.rating}★</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>📍 ADDRESS</div>
              <div style={{ fontSize: 13, color: '#fff' }}>{selectedLead.address}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>💬 CONTACTS</div>
              <div style={{ fontSize: 13, color: '#fff' }}>
                WhatsApp: <a href={`https://${selectedLead.whatsapp}`} style={{ color: '#3b82f6' }}>{selectedLead.whatsapp}</a>
                <br />Phone: {selectedLead.phone}
              </div>
            </div>

            {selectedLead.igHandle && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>📸 INSTAGRAM</div>
                <div style={{ fontSize: 13, color: '#fff' }}>{selectedLead.igHandle}</div>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>⚙️ QUICK UPDATE</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={async () => {
                      const res = await fetch('/api/admin/leads', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: selectedLead.id, status }),
                      })
                      if (!res.ok) return
                      const updated = await res.json()
                      const next = (updated?.data || selectedLead) as Lead
                      setSelectedLead(next)
                      setLeads((prev) => prev.map((lead) => (lead.id === next.id ? next : lead)))
                    }}
                    style={{
                      background: selectedLead.status === status ? '#7c3aed' : '#1a1a24',
                      border: '1px solid #2a2a3a',
                      color: '#fff',
                      borderRadius: 8,
                      fontSize: 11,
                      padding: '6px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>📋 NOTES</div>
              {selectedLead.notes.map((n, i) => (
                <div key={i} style={{ fontSize: 13, color: '#999', marginBottom: 8, padding: 12, background: '#0a0a0f', borderRadius: 8 }}>{n}</div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href={`https://${selectedLead.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#22c55e', border: 'none', borderRadius: 8, padding: '12px 24px',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none'
                }}
              >
                💬 WhatsApp
              </a>
              <button
                style={{
                  background: '#a855f7', border: 'none', borderRadius: 8, padding: '12px 24px',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer'
                }}
              >
                Send Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}