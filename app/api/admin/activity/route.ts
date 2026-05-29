import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('pa_activity').select('*').order('created_at', { ascending: false }).limit(100)
    if (error) throw error
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { action, entity_type, entity_id, details } = await req.json()
    if (!action) return NextResponse.json({ error: 'action required' }, { status: 400 })

    const { data, error } = await supabaseAdmin.from('pa_activity').insert({ action, entity_type, entity_id, details }).select().single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
