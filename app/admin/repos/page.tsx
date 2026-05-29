'use client'

import { useState } from 'react'
import { REPOS } from '@/lib/admin-full-data'

export default function ReposPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const total = REPOS.length
  const issues = REPOS.reduce((s, r) => s + r.openIssues, 0)

  const filtered = REPOS
    .filter(r => filter === 'all' || r.language === filter)
    .filter(r => !search || r.name.includes(search.toLowerCase()) || r.owner.includes(search.toLowerCase()))

  const languages = [...new Set(REPOS.map(r => r.language))]

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📦 GitHub Repos</h1>
        <p style={{ color: '#666', fontSize: 14 }}>{total} repos in Ai-Whisperers · {issues} open issues</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Repos', value: total, color: '#3b82f6' },
          { label: 'Open Issues', value: issues, color: '#f59e0b' },
          { label: 'Last Commit', value: '2026-05-28', color: '#22c55e' },
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
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search repos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 14, width: 220 }}
          />
          <button
            onClick={() => setFilter('all')}
            style={{ background: filter === 'all' ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
          >all</button>
          {languages.map(l => (
            <button key={l} onClick={() => setFilter(l)}
              style={{ background: filter === l ? '#a855f7' : '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer' }}
            >{l}</button>
          ))}
        </div>

        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ color: '#666', textAlign: 'left' }}>
              <th style={{ paddingBottom: 8 }}>Repo</th>
              <th style={{ paddingBottom: 8 }}>Language</th>
              <th style={{ paddingBottom: 8 }}>Branch</th>
              <th style={{ paddingBottom: 8 }}>Last Commit</th>
              <th style={{ paddingBottom: 8 }}>Commit</th>
              <th style={{ paddingBottom: 8 }}>Issues</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.clientId} style={{ borderTop: '1px solid #1a1a24' }}>
                <td style={{ padding: '12px 0', fontWeight: 600 }}>
                  <a href={`https://github.com/${r.fullName}`} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#3b82f6', textDecoration: 'none' }}>{r.name}</a>
                </td>
                <td style={{ padding: '12px 0', color: '#a855f7', fontSize: 12 }}>{r.language}</td>
                <td style={{ padding: '12px 0', color: '#666', fontSize: 12 }}>{r.branch}</td>
                <td style={{ padding: '12px 0', color: '#666' }}>{r.lastCommit}</td>
                <td style={{ padding: '12px 0', color: '#666', fontFamily: 'monospace', fontSize: 11 }}>{r.commitHash}</td>
                <td style={{ padding: '12px 0' }}>
                  {r.openIssues > 0 ? (
                    <span style={{ background: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{r.openIssues}</span>
                  ) : (
                    <span style={{ color: '#22c55e' }}>✅</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}