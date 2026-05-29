'use client'

import { useState } from 'react'
import { ACTIVITY_LOG } from '@/lib/admin-full-data'

export default function ActivityPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? ACTIVITY_LOG : ACTIVITY_LOG.filter(a => a.user === filter)
  const users = [...new Set(ACTIVITY_LOG.map(a => a.user))]

  const actionIcons: Record<string, string> = {
    'Reordered clients': '🔀',
    'Contacted lead': '💬',
    'Sent demo': '📧',
    'Deployed site': '🚀',
    'Updated client notes': '📝',
    'Redeploy triggered': '🔄',
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📝 Activity Log</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{ACTIVITY_LOG.length} events tracked</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Events</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#3b82f6' }}>{ACTIVITY_LOG.length}</div>
        </div>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Today</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#22c55e' }}>3</div>
        </div>
        <div style={{
          background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
          padding: '16px 24px', flex: 1, minWidth: 160
        }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Users</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#a855f7' }}>{users.length}</div>
        </div>
      </div>

      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{ background: filter === 'all' ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
          >all</button>
          {users.map(u => (
            <button key={u} onClick={() => setFilter(u)}
              style={{ background: filter === u ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
            >{u}</button>
          ))}
        </div>

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
                  <span style={{ color: '#a855f7' }}>{entry.user}</span>
                  <span style={{ color: '#666' }}> — {entry.action}</span>
                </div>
                <div style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {entry.target}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#666', flexShrink: 0 }}>{entry.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}