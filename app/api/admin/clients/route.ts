import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('pa_clients').select('*').order('sort_order')
    if (error) throw error
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { slug, ...updates } = body
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

    const { data, error } = await supabaseAdmin
      .from('pa_clients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .select()
      .single()
    if (error) throw error

    await supabaseAdmin.from('pa_activity').insert({
      action: 'Updated client', entity_type: 'client', entity_id: slug, details: updates,
    })
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const clients = await req.json()
    if (!Array.isArray(clients)) return NextResponse.json({ error: 'Expected array' }, { status: 400 })

    const { data, error } = await supabaseAdmin
      .from('pa_clients')
      .upsert(clients, { onConflict: 'slug' })
      .select()
    if (error) throw error

    await supabaseAdmin.from('pa_activity').insert({
      action: 'Synced clients to Supabase', entity_type: 'client', details: { count: clients.length },
    })
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
