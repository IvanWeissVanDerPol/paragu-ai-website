import { NextResponse } from 'next/server'
import { readAdminState } from '@/lib/admin-store'

export async function GET() {
  const state = await readAdminState()
  return NextResponse.json({
    domains: state.domains,
    deployments: state.deployments,
    repos: state.repos,
  })
}
