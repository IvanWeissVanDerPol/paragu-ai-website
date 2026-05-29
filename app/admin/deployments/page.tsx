'use client'

import { useState } from 'react'
import { DEPLOYMENTS } from '@/lib/admin-full-data'
import { ADMIN_CLIENTS } from '@/lib/admin-data'

export default function DeploymentsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const healthy = DEPLOYMENTS.filter(d => d.status === 'running').length
  const degraded = DEPLOYMENTS.filter(d => d.status === 'degraded').length
  const down = DEPLOYMENTS.filter(d => d.status === 'down').length
  const totalCPU = DEPLOYMENTS.reduce((s, d) => s + d.cpuPercent, 0)
  const totalMem = DEPLOYMENTS.reduce((s, d) => s + d.memUsedMb, 0)

  const filtered = DEPLOYMENTS
    .filter(d => filter === 'all' || d.status === filter)
    .filter(d => !search || d.clientId.includes(search.toLowerCase()) || d.stackName.includes(search.toLowerCase()))

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚀 Docker Swarm Deployments</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{DEPLOYMENTS.length} stacks — all running on VPS 72.61.44.159</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Running', value: healthy, color: '#22c55e' },
          { label: 'Degraded', value: degraded, color: '#f59e0b' },
          { label: 'Down', value: down, color: '#ef4444' },
          { label: 'Total CPU', value: `${totalCPU}%`, color: '#3b82f6' },
          { label: 'Total Mem', value: `${totalMem}MB`, color: '#06b6d4' },
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

        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ color: '#666', textAlign: 'left' }}>
              <th style={{ paddingBottom: 8 }}>Stack</th>
              <th style={{ paddingBottom: 8 }}>Service</th>
              <th style={{ paddingBottom: 8 }}>Replicas</th>
              <th style={{ paddingBottom: 8 }}>Status</th>
              <th style={{ paddingBottom: 8 }}>CPU</th>
              <th style={{ paddingBottom: 8 }}>Mem</th>
              <th style={{ paddingBottom: 8 }}>Uptime</th>
              <th style={{ paddingBottom: 8 }}>Last Redeploy</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const client = ADMIN_CLIENTS.find(c => c.id === d.clientId)
              return (
                <tr key={d.clientId} style={{ borderTop: '1px solid #1a1a24' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>
                    {client ? (
                      <a href={client.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#3b82f6', textDecoration: 'none' }}>{d.stackName}</a>
                    ) : d.stackName}
                  </td>
                  <td style={{ padding: '12px 0', color: '#666', fontSize: 12 }}>{d.service}</td>
                  <td style={{ padding: '12px 0', fontWeight: 700 }}>{d.replicas}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{
                      background: d.status === 'running' ? '#22c55e' : d.status === 'degraded' ? '#f59e0b' : '#ef4444',
                      color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                    }}>{d.status}</span>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <div style={{
                      width: 60, height: 6, background: '#1a1a24', borderRadius: 3, overflow: 'hidden', marginBottom: 4
                    }}>
                      <div style={{
                        width: `${d.cpuPercent}%`, height: '100%',
                        background: d.cpuPercent > 80 ? '#ef4444' : d.cpuPercent > 50 ? '#f59e0b' : '#22c55e',
                        borderRadius: 3
                      }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#666' }}>{d.cpuPercent}%</span>
                  </td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.memUsedMb}/{d.memLimitMb}MB</td>
                  <td style={{ padding: '12px 0', color: '#666' }}>{d.uptime}</td>
                  <td style={{ padding: '12px 0', color: '#666', fontSize: 12 }}>{d.lastRedeploy}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}