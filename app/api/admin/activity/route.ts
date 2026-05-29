import { NextResponse } from 'next/server'
import { readAdminState } from '@/lib/admin-store'

export async function GET() {
  const state = await readAdminState()
  return NextResponse.json({ data: state.activity })
}
