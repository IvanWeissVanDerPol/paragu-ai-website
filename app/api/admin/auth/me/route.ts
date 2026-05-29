import { NextResponse } from 'next/server'
import { getServerSessionStatus } from '@/lib/admin-server-auth'

export async function GET() {
  const authenticated = await getServerSessionStatus()
  return NextResponse.json({ authenticated })
}
