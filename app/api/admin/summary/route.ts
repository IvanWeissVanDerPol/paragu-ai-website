import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [clientsRes, revenueRes, leadsRes, healthRes, activityRes] = await Promise.all([
      supabaseAdmin.from('pa_clients').select('*').order('sort_order'),
      supabaseAdmin.from('pa_revenue').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('leads').select('id, business_name, slug, business_type, phone, email, city, status, source, priority_score, review_count, created_at, updated_at').order('priority_score', { ascending: false }),
      supabaseAdmin.from('pa_health_checks').select('client_slug, ok, latency_ms, checked_at').order('checked_at', { ascending: false }),
      supabaseAdmin.from('pa_activity').select('*').order('created_at', { ascending: false }).limit(50),
    ])

    const clients = clientsRes.data ?? []
    const revenue = revenueRes.data ?? []
    const leads = leadsRes.data ?? []
    const healthChecks = healthRes.data ?? []
    const activity = activityRes.data ?? []

    const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status)).length
    const topLeads = leads.slice(0, 5)
    const mrr = revenue.filter(r => r.status === 'active').reduce((sum, r) => sum + (Number(r.monthly_gs) || 0), 0)
    const totalSetup = revenue.filter(r => r.status === 'active').reduce((sum, r) => sum + (Number(r.setup_gs) || 0), 0)

    const latestHealth: Record<string, typeof healthChecks[0]> = {}
    for (const h of healthChecks) {
      if (!latestHealth[h.client_slug]) latestHealth[h.client_slug] = h
    }

    return NextResponse.json({
      data: {
        clients,
        revenue,
        leads,
        activity,
        healthChecks: latestHealth,
        activeLeads,
        topLeads,
        mrr,
        totalSetup,
        payingCount: clients.filter(c => c.type === 'paying').length,
        liveCount: clients.filter(c => c.status === 'live').length,
        generatedAt: new Date().toISOString(),
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
