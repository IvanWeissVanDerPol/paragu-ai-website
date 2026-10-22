import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TIENDA_SESSION_COOKIE, verifyTiendaSessionToken } from '@/lib/tienda-server-auth'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get(TIENDA_SESSION_COOKIE)?.value
  return NextResponse.json({ authenticated: verifyTiendaSessionToken(session) })
}
