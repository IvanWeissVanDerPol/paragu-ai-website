import { NextResponse } from 'next/server'
import { TIENDA_SESSION_COOKIE } from '@/lib/tienda-server-auth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: TIENDA_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 0,
  })
  return res
}
