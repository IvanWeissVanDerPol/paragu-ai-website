'use client'

import { useState, useEffect } from 'react'
import { adminFetchJson } from '@/lib/admin-fetch'

interface ActivityRow {
  id: string; action: string; entity_type: string; entity_id: string | null
  details: Record<string, unknown> | null; created_at: string
}

const actionIcons: Record<string, string> = {
  'Reordered clients': '🔀',
  'Contacted lead': '💬',
  'Sent demo': '📧',
  'Deployed site': '🚀',
  'Updated client notes': '📝',
  'Redeploy triggered': '🔄',
  'Health check refresh from VPS': '🩺',
  'Deployment refresh from VPS': '📡',
}

export default function ActivityPage() {
  const [entries, setEntries] = useState<ActivityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    adminFetchJson<ActivityRow[]>('/api/admin/activity/')
      .then(setEntries)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 32, color: '#9ca3af' }}>Loading activity...</div>
  if (error) return <div style={{ padding: 32, color: '#f87171' }}>{error}</div>

  const actionTypes = [...new Set(entries.map(e => e.action))]
  const filtered = filter === 'all' ? entries : entries.filter(a => a.action === filter)

  const today = new Date().toDateString()
  const todayCount = entries.filter(e => new Date(e.created_at).toDateString() === today).length

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📝 Activity Log</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{entries.length} events tracked</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Events</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#3b82f6' }}>{entries.length}</div>
        </div>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Today</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#22c55e' }}>{todayCount}</div>
        </div>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Action Types</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#a855f7' }}>{actionTypes.length}</div>
        </div>
      </div>

      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{ background: filter === 'all' ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
          >all</button>
          {actionTypes.map(a => (
            <button key={a} onClick={() => setFilter(a)}
              style={{ background: filter === a ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
            >{a}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ color: '#666', fontSize: 13, padding: 16 }}>
            No activity recorded yet. Actions like health checks, deployments, and client updates will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.map(entry => (
              <div key={entry.id} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 0', borderBottom: '1px solid #1a1a24'
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: '#1a1a24',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0
                }}>
                  {actionIcons[entry.action] || '📋'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                    <span style={{ color: '#a855f7' }}>{entry.entity_type}</span>
                    <span style={{ color: '#666' }}> — {entry.action}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {entry.entity_id || (entry.details ? JSON.stringify(entry.details).slice(0, 100) : '')}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#666', flexShrink: 0 }}>{new Date(entry.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
