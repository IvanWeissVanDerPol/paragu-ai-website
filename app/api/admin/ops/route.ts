import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [deploymentsRes, domainsRes] = await Promise.all([
      supabaseAdmin.from('pa_deployments').select('*').order('service_name'),
      supabaseAdmin.from('pa_domains').select('*').order('domain'),
    ])
    return NextResponse.json({ deployments: deploymentsRes.data ?? [], domains: domainsRes.data ?? [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
