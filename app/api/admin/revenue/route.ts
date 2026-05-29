import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('pa_revenue').select('*').order('created_at', { ascending: false })
    if (error) throw error

    const mrr = data.filter(r => r.status === 'active').reduce((s, r) => s + (Number(r.monthly_gs) || 0), 0)
    const totalSetup = data.filter(r => r.status === 'active').reduce((s, r) => s + (Number(r.setup_gs) || 0), 0)
    const planCounts = data.reduce((acc, r) => { acc[r.plan] = (acc[r.plan] || 0) + 1; return acc }, {} as Record<string, number>)

    const soonRenewals = data.filter(r => {
      if (!r.next_renewal_at || r.status !== 'active') return false
      const diff = (new Date(r.next_renewal_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      return diff > 0 && diff <= 60
    })

    return NextResponse.json({ data, mrr, totalSetup, planCounts, soonRenewals, activeCount: data.filter(r => r.status === 'active').length })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
