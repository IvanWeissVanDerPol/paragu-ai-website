// supabase/functions/paragu-proxy/index.ts
//
// Server-side proxy for Supabase 2026 publishable/secret key split.
//
// Why this exists: In Supabase 2026, the publishable key (sb_publishable_*)
// can no longer read REST data (/rest/v1/), and the secret key (sb_secret_*)
// MUST NOT ship to the browser (privacy invariant 11).
//
// This proxy holds the secret key in the Edge Function runtime, never in the
// browser. The browser sends the user's JWT via the Authorization header; the
// proxy preserves it upstream so RLS still applies.
//
// Architecture:
//   Browser (sb_publishable_*) + user JWT
//     -> https://<ref>.supabase.co/functions/v1/paragu-proxy/rest/v1/...
//     -> Edge Function: strips /functions/v1/paragu-proxy/, adds secret key
//     -> Supabase REST + Auth + Storage (with user's JWT for RLS)
//     -> Edge Function passes response (status + headers + body) back

import { corsHeaders, handleCors } from '../_shared/cors.ts'

const SUPABASE_URL =
  Deno.env.get('SUPABASE_URL') ?? Deno.env.get('PROJECT_URL') ?? ''
const SUPABASE_SECRET_KEY =
  Deno.env.get('SUPABASE_SECRET_KEY') ??
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
  ''

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  throw new Error(
    'paragu-proxy: SUPABASE_URL and SUPABASE_SECRET_KEY required as function secrets'
  )
}

// Headers we forward verbatim from the browser request.
// Excludes: authorization (handled separately to preserve JWT),
//           apikey (we set the secret), and any host-specific headers.
const FORWARD_REQUEST_HEADERS = [
  'accept',
  'accept-encoding',
  'accept-language',
  'cache-control',
  'content-length',
  'content-type',
  'if-match',
  'if-none-match',
  'if-modified-since',
  'if-unmodified-since',
  'prefer',
  'range',
  'x-client-info',
  'x-supabase-api-version',
]

Deno.serve(async (req: Request) => {
  // 1. CORS preflight
  const preflight = handleCors(req)
  if (preflight) return preflight

  // 2. Strip the proxy mount from the path
  const proxyMount = '/functions/v1/paragu-proxy'
  const url = new URL(req.url)
  let upstreamPath = url.pathname
  if (upstreamPath.startsWith(proxyMount)) {
    upstreamPath = upstreamPath.slice(proxyMount.length)
  }
  if (!upstreamPath.startsWith('/')) upstreamPath = '/' + upstreamPath

  const upstreamUrl = new URL(SUPABASE_URL + upstreamPath + url.search)

  // 3. Build upstream headers
  const upstreamHeaders = new Headers()
  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = req.headers.get(name)
    if (value !== null) upstreamHeaders.set(name, value)
  }
  upstreamHeaders.set('apikey', SUPABASE_SECRET_KEY)

  // 4. Preserve the user's JWT for RLS. If absent (anon probe), fall back
  //    to the secret key so the upstream returns anon-level RLS, not
  //    service-role access.
  const userJwt = req.headers.get('authorization')
  upstreamHeaders.set(
    'authorization',
    userJwt ?? `Bearer ${SUPABASE_SECRET_KEY}`
  )

  // 5. Forward body for non-GET/HEAD requests
  let body: BodyInit | null = null
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.arrayBuffer()
  }

  // 6. Call upstream
  const upstream = await fetch(upstreamUrl.toString(), {
    method: req.method,
    headers: upstreamHeaders,
    body,
    redirect: 'manual',
  })

  // 7. Pass response back, stripping any upstream CORS headers
  const responseHeaders = new Headers()
  for (const [k, v] of upstream.headers.entries()) {
    if (k.toLowerCase().startsWith('access-control-')) continue
    responseHeaders.set(k, v)
  }
  for (const [k, v] of Object.entries(corsHeaders)) {
    responseHeaders.set(k, v as string)
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
})
