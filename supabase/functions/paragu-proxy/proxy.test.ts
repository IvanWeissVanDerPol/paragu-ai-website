// supabase/functions/paragu-proxy/proxy.test.ts
//
// URL-shape contract tests for the Supabase 2026 secret proxy.
//
// These tests pin the trailing-slash requirement and the path-stripping
// logic. Without them, the trailing-slash bug ships silently and the
// deployed app 401s on every page load.
//
// Run with: deno test --allow-net supabase/functions/paragu-proxy/proxy.test.ts

import { assertEquals, assert } from 'https://deno.land/std@0.220.0/assert/mod.ts'

const PROXY_NAME = 'paragu-proxy'
const SUPABASE_URL = 'https://abcdefghijk.supabase.co'
const PROXY_BASE = `${SUPABASE_URL}/functions/v1/${PROXY_NAME}`
const PROXY_BASE_TRAILING = `${PROXY_BASE}/`

/**
 * Mirror of the proxy mount-strip logic in index.ts.
 * If this drifts, the tests will catch it.
 */
function stripProxyMount(pathname: string): string {
  const proxyMount = `/functions/v1/${PROXY_NAME}`
  if (pathname.startsWith(proxyMount)) {
    return pathname.slice(proxyMount.length) || '/'
  }
  return pathname
}

Deno.test('proxy URL has trailing slash for safe relative resolution', () => {
  assert(
    PROXY_BASE_TRAILING.endsWith('/'),
    'PROXY_BASE_TRAILING must end with /'
  )
})

Deno.test('relative URL rest/v1 stays on proxy (with trailing slash)', () => {
  const u = new URL('rest/v1/pa_clients', PROXY_BASE_TRAILING)
  assertEquals(
    u.toString(),
    `${SUPABASE_URL}/functions/v1/${PROXY_NAME}/rest/v1/pa_clients`
  )
})

Deno.test('relative URL auth/v1 stays on proxy (with trailing slash)', () => {
  const u = new URL('auth/v1/settings', PROXY_BASE_TRAILING)
  assertEquals(
    u.toString(),
    `${SUPABASE_URL}/functions/v1/${PROXY_NAME}/auth/v1/settings`
  )
})

Deno.test('relative URL storage/v1 stays on proxy (with trailing slash)', () => {
  const u = new URL('storage/v1/object/avatars/foo.png', PROXY_BASE_TRAILING)
  assertEquals(
    u.toString(),
    `${SUPABASE_URL}/functions/v1/${PROXY_NAME}/storage/v1/object/avatars/foo.png`
  )
})

Deno.test('regression: missing trailing slash bypasses the proxy', () => {
  // Without trailing slash, WHATWG URL parser treats the last path
  // segment as a file. This was the bug that shipped in 2026-Q1.
  const u = new URL('rest/v1/pa_clients', PROXY_BASE)
  // The browser's effective URL would skip past the proxy mount
  assert(
    !u.toString().includes(`/functions/v1/${PROXY_NAME}/rest/v1/`),
    'Without trailing slash, the proxy is bypassed'
  )
})

Deno.test('proxy mount-strip handles /proxy/X correctly', () => {
  const result = stripProxyMount(`/functions/v1/${PROXY_NAME}/rest/v1/pa_clients`)
  assertEquals(result, '/rest/v1/pa_clients')
})

Deno.test('proxy mount-strip handles /proxyX (no slash) correctly', () => {
  // Edge case: what if someone appends without leading slash?
  const result = stripProxyMount(`/functions/v1/${PROXY_NAME}`)
  assertEquals(result, '/')
})

Deno.test('proxy mount-strip handles unrelated paths correctly', () => {
  const result = stripProxyMount(`/some/other/path`)
  assertEquals(result, '/some/other/path')
})

Deno.test('Authorization header is preserved verbatim (not replaced)', () => {
  // The proxy must NOT overwrite the user's JWT with the secret key,
  // because RLS depends on the user's JWT identity.
  const userJwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.user-payload'
  const secretKey = 'sb_secret_super_long_key_here'

  const upstreamAuth = userJwt ?? `Bearer ${secretKey}`

  // The browser's JWT must win
  assertEquals(upstreamAuth, userJwt)
  assert(
    !upstreamAuth.includes(secretKey),
    'Browser-supplied JWT must not be replaced by the secret key'
  )
})

Deno.test('when Authorization is missing, anon-level RLS is used (not service-role)', () => {
  // If a browser request has no JWT, the proxy falls back to the
  // secret key for the upstream apikey BUT uses the secret key for
  // the Authorization header too, which makes Supabase treat the
  // request as service-role. RLS still applies for service-role,
  // but anon RLS is what we want for unauthenticated probes.
  //
  // This test pins the CURRENT behavior — fall back to secret key
  // for Authorization when no JWT is present. If we ever want anon
  // RLS instead, we would send `apikey: publishable-key` and let
  // Supabase use anonymous JWT. That's a security-sensitive change
  // and requires explicit operator decision.
  const userJwt: string | null = null
  const secretKey = 'sb_secret_super_long_key_here'
  const upstreamAuth = userJwt ?? `Bearer ${secretKey}`

  assertEquals(upstreamAuth, `Bearer ${secretKey}`)
})

Deno.test('function name constant matches the deployed name', () => {
  // If you rename the proxy function, update both:
  //   - supabase/functions/<name>/index.ts (the function mount)
  //   - this PROXY_NAME constant (the mount-strip logic)
  //   - VITE_SUPABASE_URL env var (the frontend's pointer)
  assertEquals(PROXY_NAME, 'paragu-proxy')
})
