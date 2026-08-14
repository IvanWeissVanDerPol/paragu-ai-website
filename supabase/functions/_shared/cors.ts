// supabase/functions/_shared/cors.ts
//
// Shared CORS handler for all Edge Functions.
//
// Browsers treat Edge Functions as cross-origin (served from
// <ref>.supabase.co, not from your frontend's origin). Without these
// headers, the browser refuses POST/DELETE/PATCH before the function
// runs.
//
// ALLOWED_ORIGIN must be set to the exact frontend origin in production:
//   supabase secrets set ALLOWED_ORIGIN=https://paragu-ai.com
// Falls back to '*' for development convenience (less strict).

export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-api-version, prefer, range, if-match, if-none-match, if-modified-since',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
}

export function handleCors(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }
  return null
}
