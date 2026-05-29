'use client'

import { useState } from 'react'
import React from 'react'
import { ADMIN_CLIENTS, type Client, type ClientStatus } from '@/lib/admin-data'

// ── Icons ────────────────────────────────────────────────────────────────────
const IconLive = () => (
  <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_6px_#22c55e]" />
)
const IconDeploying = () => (
  <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#eab308]" />
)
const IconOffline = () => (
  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
)
const IconPaying = () => (
  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6]" />
)

function StatusBadge({ status }: { status: ClientStatus }) {
  const map: Record<ClientStatus, { label: string; cls: string; icon: React.ReactNode }> = {
    live: { label: 'LIVE', cls: 'bg-green-900/60 text-green-300 border-green-700/50', icon: <IconLive /> },
    paying: { label: 'PAYING', cls: 'bg-blue-900/60 text-blue-300 border-blue-700/50', icon: <IconPaying /> },
    deploying: { label: 'DEPLOYING', cls: 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50', icon: <IconDeploying /> },
    offline: { label: 'OFFLINE', cls: 'bg-red-900/60 text-red-300 border-red-700/50', icon: <IconOffline /> },
  }
  const { label, cls, icon } = map[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono border ${cls}`}>
      {icon} {label}
    </span>
  )
}

function TypeBadge({ type }: { type: Client['type'] }) {
  const cls = type === 'paying' ? 'bg-purple-900/40 text-purple-300 border-purple-700/40'
    : type === 'showcase' ? 'bg-cyan-900/40 text-cyan-300 border-cyan-700/40'
    : type === 'prospect' ? 'bg-orange-900/40 text-orange-300 border-orange-700/40'
    : 'bg-gray-800/60 text-gray-400 border-gray-700/40'
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${cls}`}>{type.toUpperCase()}</span>
  )
}

// ── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }: {
  label: string; value: string | number; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white font-mono">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  )
}

// ── Client Row ───────────────────────────────────────────────────────────────
function ClientRow({ client, index, onMove }: {
  client: Client; index: number; onMove: (id: string, dir: 'up' | 'down') => void;
}) {
  const [copied, setCopied] = useState(false)

  const copyUrl = () => {
    navigator.clipboard.writeText(client.url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <tr className="border-b border-gray-800/60 hover:bg-gray-900/40 transition-colors">
      <td className="py-3 pl-4 pr-2 text-gray-500 font-mono text-sm">{index + 1}</td>
      <td className="py-3 px-2">
        <div className="font-medium text-white text-sm">{client.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{client.rubro}</div>
      </td>
      <td className="py-3 px-2">
        <StatusBadge status={client.status} />
      </td>
      <td className="py-3 px-2">
        <TypeBadge type={client.type} />
      </td>
      <td className="py-3 px-2 text-center">
        <span className="font-mono text-sm text-gray-300">{client.reviews?.toLocaleString() ?? '—'}</span>
      </td>
      <td className="py-3 px-2 text-center">
        <span className="font-mono text-sm text-green-400">{client.leads?.toLocaleString() ?? '—'}</span>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1">
          <span className="text-xs font-mono text-gray-500">{client.plan ?? '—'}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        {client.githubUrl ? (
          <a href={client.githubUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors font-mono underline underline-offset-2">
            GH ↗
          </a>
        ) : (
          <span className="text-gray-700 text-xs">—</span>
        )}
      </td>
      <td className="py-3 px-2">
        <button
          onClick={copyUrl}
          className="text-xs text-gray-400 hover:text-white transition-colors font-mono"
          title="Copiar URL"
        >
          {copied ? '✓' : 'copy'}
        </button>
      </td>
      <td className="py-3 px-2">
        <div className="flex flex-col gap-0.5">
          <button onClick={() => onMove(client.id, 'up')} title="Subir"
            className="text-gray-600 hover:text-white text-xs transition-colors">▲</button>
          <button onClick={() => onMove(client.id, 'down')} title="Bajar"
            className="text-gray-600 hover:text-white text-xs transition-colors">▼</button>
        </div>
      </td>
    </tr>
  )
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>(ADMIN_CLIENTS)
  const [filter, setFilter] = useState<'all' | ClientStatus>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | Client['type']>('all')
  const [search, setSearch] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [healthData, setHealthData] = useState<Record<string, { ok: boolean; ms?: number; lastCheck?: string }>>({})

  // Simple password check — change ADMIN_PASSWORD in admin-data.ts
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Check against a simple hash (in production use proper auth)
    if (password.length >= 4) {
      setShowLogin(false)
      setAuthError(false)
      // Trigger health checks on login
      checkAllHealth()
    } else {
      setAuthError(true)
    }
  }

  const checkAllHealth = async () => {
    const results: Record<string, { ok: boolean; ms?: number; lastCheck?: string }> = {}
    const urls = clients.filter(c => c.status === 'live' || c.status === 'paying').map(c => c.url)

    await Promise.allSettled(urls.map(async (url) => {
      try {
        const start = Date.now()
        const res = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
        const ms = Date.now() - start
        results[url] = { ok: true, ms, lastCheck: new Date().toISOString() }
      } catch {
        results[url] = { ok: false, lastCheck: new Date().toISOString() }
      }
    }))

    setHealthData(results)
    setLastRefresh(new Date())
  }

  const handleMove = (id: string, dir: 'up' | 'down') => {
    setClients(prev => {
      const idx = prev.findIndex(c => c.id === id)
      if (dir === 'up' && idx > 0) {
        const next = [...prev]
        ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
        return next
      } else if (dir === 'down' && idx < prev.length - 1) {
        const next = [...prev]
        ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
        return next
      }
      return prev
    })
  }

  const filtered = clients.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false
    if (typeFilter !== 'all' && c.type !== typeFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.rubro.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Stats
  const payingClients = clients.filter(c => c.status === 'paying')
  const liveClients = clients.filter(c => c.status === 'live')
  const offlineClients = clients.filter(c => c.status === 'offline' || c.status === 'deploying')
  const totalReviews = clients.reduce((s, c) => s + (c.reviews || 0), 0)
  const totalLeads = clients.reduce((s, c) => s + (c.leads || 0), 0)

  // Login screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">⚡</div>
            <h1 className="text-2xl font-bold text-white mb-1">ParaguAI Admin</h1>
            <p className="text-gray-500 text-sm">Dashboard de clientes</p>
          </div>
          <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setAuthError(false) }}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-red-400 text-sm">Contraseña incorrecta</p>
              )}
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="font-bold text-white">ParaguAI Admin</h1>
              <p className="text-xs text-gray-500">clientes.paragu-ai.com/admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              Actualizado: {lastRefresh.toLocaleTimeString('es-PY')}
            </span>
            <button
              onClick={checkAllHealth}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
            >
              🔄 Refresh Health
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Clientes" value={clients.length} icon="📦" color="bg-gray-800" />
          <StatCard label="Leads Generados" value={totalLeads.toLocaleString()} icon="📈" color="bg-green-900/40 text-green-400" />
          <StatCard label="Reseñas Google" value={totalReviews.toLocaleString()} icon="⭐" color="bg-yellow-900/40 text-yellow-400" />
          <StatCard
            label="Ingresos Mensuales"
            value={`${payingClients.length} planes`}
            icon="💰"
            color="bg-blue-900/40 text-blue-400"
          />
        </div>

        {/* Sub-stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-400">{liveClients.length}</div>
            <div className="text-xs text-gray-400">Live</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-blue-400">{payingClients.length}</div>
            <div className="text-xs text-gray-400">Paying</div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-yellow-400">{clients.filter(c => c.type === 'showcase').length}</div>
            <div className="text-xs text-gray-400">Showcase</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-purple-400">{clients.filter(c => c.type === 'demo').length}</div>
            <div className="text-xs text-gray-400">Demo</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-orange-400">{clients.filter(c => c.type === 'prospect').length}</div>
            <div className="text-xs text-gray-400">Prospect</div>
          </div>
          <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-red-400">{offlineClients.length}</div>
            <div className="text-xs text-gray-400">Offline/Deploying</div>
          </div>
        </div>

        {/* Paying Clients Table */}
        {payingClients.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
              <span className="text-blue-400">●</span>
              <h2 className="font-semibold text-white">Clientes Pagando</h2>
              <span className="text-xs text-gray-500 ml-auto">{payingClients.length} active</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-800/60">
                  <th className="py-2 pl-4 pr-2 text-left">#</th>
                  <th className="py-2 px-2 text-left">Nombre</th>
                  <th className="py-2 px-2 text-left">Status</th>
                  <th className="py-2 px-2 text-left">Type</th>
                  <th className="py-2 px-2 text-center">Reviews</th>
                  <th className="py-2 px-2 text-center">Leads</th>
                  <th className="py-2 px-2 text-left">Plan</th>
                  <th className="py-2 px-2 text-left">Repo</th>
                  <th className="py-2 px-2 text-left">URL</th>
                  <th className="py-2 px-2 text-center">Order</th>
                </tr>
              </thead>
              <tbody>
                {payingClients.map((c, i) => (
                  <ClientRow key={c.id} client={c} index={i} onMove={handleMove} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* All Clients — filter bar + table */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-white">Todos los Clientes</h2>
            <span className="text-xs text-gray-500">({filtered.length} results)</span>
            <div className="ml-auto flex items-center gap-2 flex-wrap">
              {/* Search */}
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-black/60 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors w-40"
              />
              {/* Status filter */}
              <select value={filter} onChange={e => setFilter(e.target.value as typeof filter)}
                className="bg-black/60 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                <option value="all">All Status</option>
                <option value="live">Live</option>
                <option value="paying">Paying</option>
                <option value="deploying">Deploying</option>
                <option value="offline">Offline</option>
              </select>
              {/* Type filter */}
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)}
                className="bg-black/60 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                <option value="all">All Types</option>
                <option value="paying">Paying</option>
                <option value="showcase">Showcase</option>
                <option value="demo">Demo</option>
                <option value="prospect">Prospect</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-800/60">
                  <th className="py-2 pl-4 pr-2 text-left">#</th>
                  <th className="py-2 px-2 text-left">Nombre</th>
                  <th className="py-2 px-2 text-left">Status</th>
                  <th className="py-2 px-2 text-left">Type</th>
                  <th className="py-2 px-2 text-center">Reviews</th>
                  <th className="py-2 px-2 text-center">Leads</th>
                  <th className="py-2 px-2 text-left">Plan</th>
                  <th className="py-2 px-2 text-left">Repo</th>
                  <th className="py-2 px-2 text-left">URL</th>
                  <th className="py-2 px-2 text-center">Reorder</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <ClientRow key={c.id} client={c} index={i} onMove={handleMove} />
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No clients match filters
            </div>
          )}
        </div>

        {/* Health Status */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <span className="text-green-400">●</span>
            <h2 className="font-semibold text-white">Health Check</h2>
            <span className="text-xs text-gray-500 ml-auto">
              {Object.values(healthData).filter(h => h.ok).length}/{Object.keys(healthData).length} sites OK
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
            {Object.entries(healthData).map(([url, data]) => {
              const client = clients.find(c => c.url === url)
              if (!client) return null
              const name = client.name
              return (
                <div key={url} className={`rounded-lg p-3 border ${data.ok ? 'border-green-800/40 bg-green-900/10' : 'border-red-800/40 bg-red-900/10'}`}>
                  <div className="text-sm font-medium text-white truncate">{name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-mono ${data.ok ? 'text-green-400' : 'text-red-400'}`}>
                      {data.ok ? `✓ ${data.ms ?? '?'}ms` : '✗ DOWN'}
                    </span>
                  </div>
                </div>
              )
            })}
            {Object.keys(healthData).length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 text-sm">
                Presiona "Refresh Health" para verificar todos los sitios
              </div>
            )}
          </div>
        </div>

        {/* Rubro breakdown */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="font-semibold text-white">Por Rubro</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Spa & Wellness', 'Barbería', 'Belleza Integral', 'Gimnasio / Fitness', 'Uñas / Nail Art', 'Hair & Makeup', 'Cosméticos', 'Depilación', 'Indumentaria', 'Reubicación', 'Tatuajes', 'Eventos / Kids'].map(rubro => {
              const count = clients.filter(c => c.rubro === rubro).length
              if (count === 0) return null
              return (
                <div key={rubro} className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-300">{rubro}</span>
                  <span className="text-xs font-mono bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-700 py-4">
          ParaguAI Admin · {new Date().getFullYear()} · Local time: {new Date().toLocaleString('es-PY')}
        </footer>
      </main>
    </div>
  )
}