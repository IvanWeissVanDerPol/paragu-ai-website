import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'paraguai_admin_session'

async function sign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function isValidSession(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false
  const [expRaw, nonce, signature] = token.split('.')
  if (!expRaw || !nonce || !signature) return false

  const expected = await sign(`${expRaw}.${nonce}`, secret)
  if (expected !== signature) return false

  const exp = Number(expRaw)
  if (!Number.isFinite(exp)) return false
  return exp > Math.floor(Date.now() / 1000)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public admin auth routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/')) {
    return NextResponse.next()
  }

  const secret = process.env.ADMIN_AUTH_SECRET
  if (!secret || secret.length < 24) {
    return new NextResponse('Admin auth misconfigured: set ADMIN_AUTH_SECRET', { status: 503 })
  }

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const ok = await isValidSession(session, secret)
  if (ok) return NextResponse.next()

  if (pathname.startsWith('/api/admin/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', req.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
