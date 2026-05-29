'use client'

import { useState, useEffect } from 'react'
import { adminFetchJson } from '@/lib/admin-fetch'

interface DeploymentRow {
  id: string; client_slug: string; service_name: string; image: string
  replicas: number; status: string; stack_name: string
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<DeploymentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminFetchJson<{ deployments: DeploymentRow[] }>('/api/admin/ops/')
      .then(d => setDeployments(d.deployments ?? []))
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 32, color: '#9ca3af' }}>Loading deployments...</div>
  if (error) return <div style={{ padding: 32, color: '#f87171' }}>{error}</div>

  const healthy = deployments.filter(d => d.status === 'running').length
  const degraded = deployments.filter(d => d.status === 'degraded').length
  const down = deployments.filter(d => d.status === 'down').length

  const filtered = deployments
    .filter(d => filter === 'all' || d.status === filter)
    .filter(d => !search || d.client_slug.includes(search.toLowerCase()) || d.stack_name.includes(search.toLowerCase()))

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚀 Docker Swarm Deployments</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{deployments.length} stacks — all running on VPS 72.61.44.159</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Running', value: healthy, color: '#22c55e' },
          { label: 'Degraded', value: degraded, color: '#f59e0b' },
          { label: 'Down', value: down, color: '#ef4444' },
          { label: 'Total', value: deployments.length, color: '#3b82f6' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
            padding: '16px 24px', flex: 1, minWidth: 140
          }}>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search stacks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 14, width: 220 }}
          />
          {['all', 'running', 'degraded', 'down'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                background: filter === f ? '#a855f7' : '#0a0a0f',
                border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px',
                color: '#fff', fontSize: 13, cursor: 'pointer'
              }}>{f}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ color: '#666', fontSize: 13, padding: 16 }}>
            No deployments found. Click "Refresh from VPS" to pull live data from Docker Swarm.
          </div>
        ) : (
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Stack</th>
                <th style={{ paddingBottom: 8 }}>Service</th>
                <th style={{ paddingBottom: 8 }}>Image</th>
                <th style={{ paddingBottom: 8 }}>Replicas</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>{d.stack_name}</td>
                  <td style={{ padding: '12px 0', color: '#666', fontSize: 12 }}>{d.service_name}</td>
                  <td style={{ padding: '12px 0', color: '#666', fontSize: 11, fontFamily: 'monospace' }}>{d.image}</td>
                  <td style={{ padding: '12px 0', fontWeight: 700 }}>{d.replicas}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{
                      background: d.status === 'running' ? '#22c55e' : d.status === 'degraded' ? '#f59e0b' : '#ef4444',
                      color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                    }}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
