import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function GET() {
  try {
    const servicesRaw = execSync(
      'ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no root@72.61.44.159 "docker service ls --format \'{{.Name}}\\t{{.Image}}\\t{{.Replicas}}\'"',
      { encoding: 'utf8', timeout: 15000 }
    )

    const lines = servicesRaw.trim().split('\n').filter(Boolean)
    const results = []

    for (const line of lines) {
      const [name, image, replicas] = line.split('\t')
      const [current, desired] = (replicas || '0/0').split('/').map(Number)
      const status = current === desired ? 'running' : current > 0 ? 'degraded' : 'down'
      const clientSlug = name.replace(/_web$/, '').replace(/-/g, '-')

      results.push({
        id: name,
        service_name: name,
        image,
        replicas: desired ?? 0,
        status,
        stack_name: name.includes('_') ? name.split('_').slice(0, -1).join('_') : name,
      })

      await supabaseAdmin.from('pa_deployments').upsert({
        id: name,
        client_slug: clientSlug,
        service_name: name,
        image,
        replicas: desired ?? 0,
        status,
        stack_name: name.includes('_') ? name.split('_').slice(0, -1).join('_') : name,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' }).then(() => {})
    }

    await supabaseAdmin.from('pa_activity').insert({
      action: 'Deployment refresh from VPS',
      entity_type: 'system',
      details: { total: results.length, running: results.filter(r => r.status === 'running').length },
    })

    return NextResponse.json({ data: results, total: results.length, running: results.filter(r => r.status === 'running').length })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, hint: 'SSH to VPS failed' }, { status: 503 })
  }
}
