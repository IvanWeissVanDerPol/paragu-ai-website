import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'paraguai_admin_session'

const DEFAULT_TTL_SECONDS = 60 * 60 * 8 // 8 hours

function getAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET
  if (!secret || secret.length < 24) {
    throw new Error('ADMIN_AUTH_SECRET is required and must be >= 24 chars')
  }
  return secret
}

function getPasswordHash() {
  const hash = process.env.ADMIN_PASSWORD_SHA256
  if (!hash || hash.length !== 64) {
    throw new Error('ADMIN_PASSWORD_SHA256 is required (sha256 hex)')
  }
  return hash.toLowerCase()
}

function sign(payload: string) {
  const hmac = crypto.createHmac('sha256', getAuthSecret())
  hmac.update(payload)
  return hmac.digest('hex')
}

export function verifyPassword(rawPassword: string) {
  const hash = crypto.createHash('sha256').update(rawPassword).digest('hex')
  const expected = Buffer.from(getPasswordHash(), 'utf8')
  const actual = Buffer.from(hash, 'utf8')
  if (expected.length !== actual.length) return false
  return crypto.timingSafeEqual(expected, actual)
}

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + DEFAULT_TTL_SECONDS
  const nonce = crypto.randomBytes(12).toString('hex')
  const payload = `${exp}.${nonce}`
  const signature = sign(payload)
  return `${payload}.${signature}`
}

export function verifySessionToken(token?: string | null) {
  if (!token) return false
  const [expRaw, nonce, signature] = token.split('.')
  if (!expRaw || !nonce || !signature) return false

  const expected = sign(`${expRaw}.${nonce}`)
  const expectedBuf = Buffer.from(expected, 'utf8')
  const providedBuf = Buffer.from(signature, 'utf8')
  if (expectedBuf.length !== providedBuf.length) return false
  if (!crypto.timingSafeEqual(expectedBuf, providedBuf)) return false

  const exp = Number(expRaw)
  if (!Number.isFinite(exp)) return false
  return exp > Math.floor(Date.now() / 1000)
}

export async function getServerSessionStatus() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return verifySessionToken(session)
}
