import fs from 'fs/promises'
import path from 'path'
import {
  ACTIVITY_LOG,
  DEPLOYMENTS,
  DOMAINS,
  LEADS,
  REPOS,
  REVENUE,
  type ActivityEntry,
  type Deployment,
  type DomainInfo,
  type Lead,
  type RepoInfo,
  type RevenueClient,
} from '@/lib/admin-full-data'
import { ADMIN_CLIENTS, type Client } from '@/lib/admin-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const STATE_FILE = path.join(DATA_DIR, 'admin-state.json')

export type AdminState = {
  leads: Lead[]
  clients: Client[]
  revenue: RevenueClient[]
  activity: ActivityEntry[]
  domains: DomainInfo[]
  deployments: Deployment[]
  repos: RepoInfo[]
}

const defaultState: AdminState = {
  leads: LEADS,
  clients: ADMIN_CLIENTS,
  revenue: REVENUE,
  activity: ACTIVITY_LOG,
  domains: DOMAINS,
  deployments: DEPLOYMENTS,
  repos: REPOS,
}

async function ensureStateFile() {
  try {
    await fs.access(STATE_FILE)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(STATE_FILE, JSON.stringify(defaultState, null, 2), 'utf8')
  }
}

export async function readAdminState(): Promise<AdminState> {
  await ensureStateFile()
  const raw = await fs.readFile(STATE_FILE, 'utf8')
  const parsed = JSON.parse(raw) as Partial<AdminState>

  return {
    leads: Array.isArray(parsed.leads) ? parsed.leads : defaultState.leads,
    clients: Array.isArray(parsed.clients) ? parsed.clients : defaultState.clients,
    revenue: Array.isArray(parsed.revenue) ? parsed.revenue : defaultState.revenue,
    activity: Array.isArray(parsed.activity) ? parsed.activity : defaultState.activity,
    domains: Array.isArray(parsed.domains) ? parsed.domains : defaultState.domains,
    deployments: Array.isArray(parsed.deployments) ? parsed.deployments : defaultState.deployments,
    repos: Array.isArray(parsed.repos) ? parsed.repos : defaultState.repos,
  }
}

export async function writeAdminState(nextState: AdminState) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(STATE_FILE, JSON.stringify(nextState, null, 2), 'utf8')
}
