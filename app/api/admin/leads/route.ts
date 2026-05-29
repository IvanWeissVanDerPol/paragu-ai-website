import { NextResponse } from 'next/server'
import { readAdminState, writeAdminState } from '@/lib/admin-store'
import type { LeadStatus } from '@/lib/admin-full-data'

const VALID_STATUS: LeadStatus[] = ['new', 'contacted', 'demo', 'negotiating', 'won', 'lost']

export async function GET() {
  const state = await readAdminState()
  return NextResponse.json({ data: state.leads })
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const id = typeof body?.id === 'string' ? body.id : ''
    const status = body?.status as LeadStatus | undefined
    const assignedTo = typeof body?.assignedTo === 'string' ? body.assignedTo : undefined
    const nextAction = typeof body?.nextAction === 'string' ? body.nextAction : undefined

    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    if (status && !VALID_STATUS.includes(status)) {
      return NextResponse.json({ error: 'invalid status' }, { status: 400 })
    }

    const state = await readAdminState()
    const index = state.leads.findIndex((lead) => lead.id === id)
    if (index < 0) return NextResponse.json({ error: 'lead not found' }, { status: 404 })

    const prev = state.leads[index]
    const next = {
      ...prev,
      status: status ?? prev.status,
      assignedTo: assignedTo ?? prev.assignedTo,
      nextAction: nextAction ?? prev.nextAction,
      lastContact: new Date().toISOString().slice(0, 10),
    }

    state.leads[index] = next
    state.activity.unshift({
      id: `act-${Date.now()}`,
      date: new Date().toISOString(),
      action: `Lead status updated (${prev.status} → ${next.status})`,
      user: 'admin',
      target: next.business,
      targetId: next.id,
    })

    await writeAdminState(state)
    return NextResponse.json({ ok: true, data: next })
  } catch {
    return NextResponse.json({ error: 'invalid request body' }, { status: 400 })
  }
}
