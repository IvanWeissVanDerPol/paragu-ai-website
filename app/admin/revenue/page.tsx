'use client'

import { useState } from 'react'
import { REVENUE } from '@/lib/admin-full-data'

function formatGs(n: number) {
  return `Gs ${(n / 1000000).toFixed(2)}M`
}

export default function RevenuePage() {
  const [yearFilter, setYearFilter] = useState('2026')
  const totalMRR = REVENUE.reduce((s, r) => s + r.monthlyGs, 0)
  const totalSetup = REVENUE.reduce((s, r) => s + r.setupGs, 0)
  const avgMonthly = totalMRR / REVENUE.length

  // next renewals in next 60 days
  const now = new Date()
  const soonRenewals = REVENUE.filter(r => {
    const d = new Date(r.nextRenewal)
    const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff > 0 && diff <= 60
  })

  const planCounts = REVENUE.reduce((acc, r) => {
    acc[r.plan] = (acc[r.plan] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💰 Revenue Tracker</h1>
        <p style={{ color: '#666', fontSize: 14 }}>MRR, renewals, plan breakdown</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Monthly Recurring Revenue', value: formatGs(totalMRR), sub: `${REVENUE.length} active plans`, color: '#22c55e' },
          { label: 'Avg per Client', value: formatGs(avgMonthly), sub: 'per month', color: '#3b82f6' },
          { label: 'Total Setup Collected', value: formatGs(totalSetup), sub: 'one-time', color: '#a855f7' },
          { label: 'Renewals in 60 days', value: String(soonRenewals.length), sub: 'need follow-up', color: '#f59e0b' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
            padding: '20px 24px', flex: 1, minWidth: 180
          }}>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Plan breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Plans</h2>
          {Object.entries(planCounts).map(([plan, count]) => (
            <div key={plan} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid #1a1a24'
            }}>
              <span style={{ fontWeight: 600 }}>{plan}</span>
              <span style={{ color: '#a855f7', fontWeight: 700 }}>{count} clients</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#f59e0b' }}>⏰ Upcoming Renewals</h2>
          {soonRenewals.length === 0 && <div style={{ color: '#666', fontSize: 13 }}>No renewals in next 60 days</div>}
          {soonRenewals.map(r => (
            <div key={r.clientId} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid #1a1a24'
            }}>
              <span style={{ fontWeight: 600 }}>{r.name}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#f59e0b', fontWeight: 600 }}>{r.nextRenewal}</div>
                <div style={{ fontSize: 12, color: '#666' }}>Gs {(r.monthlyGs / 100000).toFixed(0)}K/mo</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div style={{ background: '#111118', border: '1px solid #1a1a24', borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 All Clients</h2>
        <table style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ color: '#666', textAlign: 'left' }}>
              <th style={{ paddingBottom: 8 }}>Client</th>
              <th style={{ paddingBottom: 8 }}>Plan</th>
              <th style={{ paddingBottom: 8 }}>Setup Fee</th>
              <th style={{ paddingBottom: 8 }}>Monthly</th>
              <th style={{ paddingBottom: 8 }}>Start Date</th>
              <th style={{ paddingBottom: 8 }}>Next Renewal</th>
              <th style={{ paddingBottom: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE.map(r => (
              <tr key={r.clientId} style={{ borderTop: '1px solid #1a1a24' }}>
                <td style={{ padding: '12px 0', fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: '12px 0', color: '#a855f7' }}>{r.plan}</td>
                <td style={{ padding: '12px 0', color: '#666' }}>Gs {(r.setupGs / 100000).toFixed(0)}K</td>
                <td style={{ padding: '12px 0', fontWeight: 700, color: '#22c55e' }}>Gs {(r.monthlyGs / 100000).toFixed(0)}K</td>
                <td style={{ padding: '12px 0', color: '#666' }}>{r.startDate}</td>
                <td style={{ padding: '12px 0', color: '#f59e0b' }}>{r.nextRenewal}</td>
                <td style={{ padding: '12px 0' }}>
                  <span style={{
                    background: r.status === 'active' ? '#22c55e' : '#6b7280',
                    color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                  }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}