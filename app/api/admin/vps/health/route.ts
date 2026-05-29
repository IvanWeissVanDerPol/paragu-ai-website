import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function GET() {
  try {
    const raw = execSync('ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no root@72.61.44.159 "cat /root/infrastructure/health-logs/health-cache.json"', {
      encoding: 'utf8',
      timeout: 15000,
    })

    const cache = JSON.parse(raw)
    const sites: Array<{ domain: string; ok: boolean; ms?: number }> = cache.sites ?? cache.up ?? []

    const results = []
    for (const site of sites) {
      const slug = site.domain?.replace('.paragu-ai.com', '').replace('.com.py', '') ?? site.domain
      const ok = site.ok ?? (cache.up?.some((u: any) => u.domain === site.domain) ?? false)

      if (slug) {
        await supabaseAdmin.from('pa_health_checks').insert({
          client_slug: slug,
          ok,
          latency_ms: site.ms ?? null,
          checked_at: new Date().toISOString(),
        }).then(() => {})

        results.push({ slug, domain: site.domain, ok, ms: site.ms })
      }
    }

    await supabaseAdmin.from('pa_activity').insert({
      action: 'Health check refresh from VPS',
      entity_type: 'system',
      details: { checked: results.length, ok: results.filter(r => r.ok).length },
    })

    return NextResponse.json({ data: results, total: results.length, ok: results.filter(r => r.ok).length, updated: cache.updated })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, hint: 'SSH to VPS failed' }, { status: 503 })
  }
}
