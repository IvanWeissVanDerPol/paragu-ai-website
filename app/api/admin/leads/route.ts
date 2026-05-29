import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

const VALID_STATUS = ['new', 'contacted', 'demo', 'negotiating', 'won', 'lost']

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('priority_score', { ascending: false })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, status } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    if (status && !VALID_STATUS.includes(status)) {
      return NextResponse.json({ error: 'invalid status' }, { status: 400 })
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() }
    if (status) updates.status = status

    const { data, error } = await supabaseAdmin
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error

    await supabaseAdmin.from('pa_activity').insert({
      action: `Lead status updated → ${status}`,
      entity_type: 'lead',
      entity_id: id,
      details: { status },
    })
    return NextResponse.json({ ok: true, data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
