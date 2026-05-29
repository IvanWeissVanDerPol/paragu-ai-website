import { NextResponse } from 'next/server'
import { readAdminState } from '@/lib/admin-store'

export async function GET() {
  const state = await readAdminState()

  const activeLeads = state.leads.filter((l) => !['won', 'lost'].includes(l.status)).length
  const topLeads = [...state.leads].sort((a, b) => b.score - a.score).slice(0, 5)
  const deployingCount = state.deployments.filter((d) => d.status !== 'running').length
  const mrr = state.revenue.reduce((sum, r) => sum + (Number(r.monthlyGs) || 0), 0)

  return NextResponse.json({
    clients: state.clients,
    leads: state.leads,
    revenue: state.revenue,
    deployments: state.deployments,
    activeLeads,
    topLeads,
    deployingCount,
    mrr,
    generatedAt: new Date().toISOString(),
  })
}
