import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

const ALLOWED_PATTERN = /^[a-z][a-z0-9_-]+_web$/

export async function POST(req: Request) {
  try {
    const { serviceName } = await req.json()
    if (!serviceName || !ALLOWED_PATTERN.test(serviceName)) {
      return NextResponse.json({ error: 'Invalid service name. Must match *_web pattern.' }, { status: 400 })
    }

    execSync(
      `ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no root@72.61.44.159 "docker service update --force ${serviceName}"`,
      { encoding: 'utf8', timeout: 30000 }
    )

    await supabaseAdmin.from('pa_activity').insert({
      action: 'Redeploy triggered',
      entity_type: 'deployment',
      entity_id: serviceName,
      details: { serviceName, triggeredAt: new Date().toISOString() },
    })

    await supabaseAdmin.from('pa_deployments').update({
      status: 'deploying',
      updated_at: new Date().toISOString(),
    }).eq('id', serviceName).then(() => {})

    return NextResponse.json({ success: true, message: `Redeploy triggered for ${serviceName}` })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, hint: 'SSH to VPS failed or service not found' }, { status: 503 })
  }
}
