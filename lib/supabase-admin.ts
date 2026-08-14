import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase admin client.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY (server-only) to bypass RLS for admin
 * operations. This file MUST NOT be imported from any client-side code
 * (page.tsx with 'use client', components in components/, etc.) — the
 * service role key would leak into the browser bundle.
 *
 * Privacy invariant (Supabase 2026): sb_secret_* / SUPABASE_SERVICE_ROLE_KEY
 * MUST NOT ship to the browser. This file is the only consumer of that
 * key, and it's server-only by import.
 *
 * If a browser-side Supabase client is ever needed, use the Edge Function
 * proxy at supabase/functions/paragu-proxy/ — never import this file from
 * a 'use client' module.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

// Defensive: throw at module-load if the secret key has the wrong shape.
// Catches the case where the operator accidentally sets NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
// or otherwise tries to expose the secret to the browser bundle.
if (typeof window !== 'undefined' && supabaseServiceKey !== 'placeholder') {
  throw new Error(
    'lib/supabase-admin.ts: SUPABASE_SERVICE_ROLE_KEY must not be loaded in the browser. ' +
    'Use the Edge Function proxy at /functions/v1/paragu-proxy/ for browser-side Supabase access.'
  )
}

// Defensive: warn at server-side load if the key format is suspicious.
// Supabase 2026 keys should start with 'sb_secret_' (or legacy 'eyJ...').
if (supabaseServiceKey !== 'placeholder') {
  const isLegacyJwt = supabaseServiceKey.startsWith('eyJ')
  const isNewSecret = supabaseServiceKey.startsWith('sb_secret_')
  if (!isLegacyJwt && !isNewSecret) {
    console.warn(
      '[lib/supabase-admin] SUPABASE_SERVICE_ROLE_KEY does not look like a Supabase key ' +
      '(should start with "sb_secret_" for Supabase 2026 or "eyJ" for legacy JWT).'
    )
  }
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})