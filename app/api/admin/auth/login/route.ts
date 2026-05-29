import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from '@/lib/admin-server-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createSessionToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
