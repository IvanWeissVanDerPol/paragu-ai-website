'use client'

import { useState, useEffect, useRef } from 'react'
import { ADMIN_CLIENTS } from '@/lib/admin-data'

// ── Types ────────────────────────────────────────────────────────────────────
type ClientItem = typeof ADMIN_CLIENTS[0] & { currentOrder: number }

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

// ── Constants ─────────────────────────────────────────────────────────────────
const REPO_OWNER = 'IvanWeissVanDerPol'
const REPO_NAME = 'paragu-ai-website'
const JSON_FILE_PATH = 'public/client-order.json'

// ── Helpers ───────────────────────────────────────────────────────────────────
const GITHUB_API = 'https://api.github.com'

async function githubRequest(
  method: string,
  endpoint: string,
  body?: object,
  token?: string
): Promise<any> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `token ${token}`

  const opts: RequestInit = { method, headers }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${GITHUB_API}${endpoint}`, opts)
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub ${method} ${endpoint} → ${res.status}: ${err}`)
  }
  return res.status === 204 ? null : res.json()
}

// ── Draggable Row ─────────────────────────────────────────────────────────────
function DraggableRow({
  client,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragOver,
}: {
  client: ClientItem
  onDragStart: (e: React.DragEvent, slug: string) => void
  onDragOver: (e: React.DragEvent, slug: string) => void
  onDrop: (e: React.DragEvent, slug: string) => void
  onDragEnd: () => void
  isDragOver: boolean
}) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOver(e, client.slug) }}
      onDrop={(e) => onDrop(e, client.slug)}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 48px 1fr 100px 80px 80px',
        gap: 12,
        alignItems: 'center',
        padding: '10px 16px',
        background: isDragOver ? '#3b82f620' : '#0a0a0f',
        border: `1px solid ${isDragOver ? '#3b82f640' : '#1a1a24'}`,
        borderRadius: 10,
        marginBottom: 6,
        transition: 'all 0.15s',
        opacity: 0.6,
      }}
    >
      {/* Drag handle */}
      <span
        draggable
        onDragStart={(e) => onDragStart(e, client.slug)}
        onDragEnd={onDragEnd}
        style={{ color: '#444', fontSize: 16, textAlign: 'center', cursor: 'grab', userSelect: 'none' }}
        title="Drag to reorder"
      >
        ⋮⋮
      </span>

      {/* Screenshot */}
      <div style={{ width: 48, height: 32, background: '#111', borderRadius: 4, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/screenshots/${client.slug}.jpg`}
          alt={client.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Name + rubro */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{client.name}</div>
        <div style={{ fontSize: 11, color: '#666' }}>{client.rubro}</div>
      </div>

      {/* Type badge */}
      <div>
        <span style={{
          background: client.type === 'paying' ? '#a855f720' : client.type === 'showcase' ? '#22c55e20' : '#f59e0b20',
          color: client.type === 'paying' ? '#a855f7' : client.type === 'showcase' ? '#22c55e' : '#f59e0b',
          padding: '2px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700, textTransform: 'uppercase'
        }}>
          {client.type}
        </span>
      </div>

      {/* Reviews */}
      <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, textAlign: 'center' }}>
        {client.reviews ? `★ ${client.reviews}` : '—'}
      </div>

      {/* Current order display */}
      <div style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
        #{client.currentOrder}
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>([])
  const [draggedSlug, setDraggedSlug] = useState<string | null>(null)
  const [dragOverSlug, setDragOverSlug] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [gitHubToken, setGitHubToken] = useState('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const tokenInputRef = useRef<HTMLInputElement>(null)

  // Load + sort initial clients by order
  useEffect(() => {
    const stored = localStorage.getItem('client-order')
    const parsed: Record<string, number> = stored ? JSON.parse(stored) : {}

    const mapped = ADMIN_CLIENTS.map(c => ({
      ...c,
      currentOrder: parsed[c.slug] ?? c.order,
    }))
    mapped.sort((a, b) => a.currentOrder - b.currentOrder)
    setClients(mapped)
  }, [])

  // Auto-save to localStorage on reorder (instant feel)
  function applyReorder(fromSlug: string, toSlug: string) {
    const fromIdx = clients.findIndex(c => c.slug === fromSlug)
    const toIdx = clients.findIndex(c => c.slug === toSlug)
    if (fromIdx === -1 || toIdx === -1) return

    const updated = [...clients]
    const [moved] = updated.splice(fromIdx, 1)
    updated.splice(toIdx, 0, moved)

    // Re-assign order numbers sequentially
    updated.forEach((c, i) => { c.currentOrder = i + 1 })
    setClients(updated)

    // Persist to localStorage immediately
    const orderMap: Record<string, number> = {}
    updated.forEach(c => { orderMap[c.slug] = c.currentOrder })
    localStorage.setItem('client-order', JSON.stringify(orderMap))
  }

  // Drag handlers
  function handleDragStart(e: React.DragEvent, slug: string) {
    setDraggedSlug(slug)
    e.dataTransfer.effectAllowed = 'move'
  }
  function handleDragOver(e: React.DragEvent, slug: string) {
    e.preventDefault()
    setDragOverSlug(slug)
  }
  function handleDrop(e: React.DragEvent, slug: string) {
    e.preventDefault()
    if (draggedSlug && draggedSlug !== slug) {
      applyReorder(draggedSlug, slug)
    }
    setDraggedSlug(null)
    setDragOverSlug(null)
  }
  function handleDragEnd() {
    setDraggedSlug(null)
    setDragOverSlug(null)
  }

  // Build JSON for GitHub commit
  function buildOrderJson(): string {
    const order: Record<string, number> = {}
    clients.forEach(c => { order[c.slug] = c.currentOrder })
    return JSON.stringify(order, null, 2)
  }

  // Save + Redeploy button handler
  async function handleSaveAndRedeploy() {
    if (!gitHubToken.trim()) {
      setShowTokenInput(true)
      setTimeout(() => tokenInputRef.current?.focus(), 50)
      return
    }

    setSaveStatus('saving')
    setErrorMsg('')

    try {
      const content = buildOrderJson()
      const encodedContent = btoa(unescape(encodeURIComponent(content)))
      const branch = 'main'

      // Get current commit SHA
      const ref = await githubRequest('GET', `/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/${branch}`, undefined, gitHubToken)
      const currentCommitSha = ref.object.sha

      // Get current tree SHA
      const commit = await githubRequest('GET', `/repos/${REPO_OWNER}/${REPO_NAME}/commits/${branch}`, undefined, gitHubToken)
      const baseTreeSha = commit.commit.tree.sha

      // Create blob
      const blob = await githubRequest('POST', `/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, {
        content: content,
        encoding: 'utf-8',
      }, gitHubToken)

      // Create new tree
      const newTree = await githubRequest('POST', `/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, {
        base_tree: baseTreeSha,
        tree: [{ path: JSON_FILE_PATH, mode: '100644', type: 'blob', sha: blob.sha }],
      }, gitHubToken)

      // Create commit
      const newCommit = await githubRequest('POST', `/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`, {
        message: 'chore: update client order from admin panel',
        tree: newTree.sha,
        parents: [currentCommitSha],
      }, gitHubToken)

      // Update branch
      await githubRequest('PATCH', `/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${branch}`, {
        sha: newCommit.sha,
        force: false,
      }, gitHubToken)

      setSaveStatus('success')
      setShowTokenInput(false)

      // Clear localStorage since it's now committed
      localStorage.removeItem('client-order')

      setTimeout(() => setSaveStatus('idle'), 4000)
    } catch (err: any) {
      setSaveStatus('error')
      setErrorMsg(err.message || 'Unknown error')
      setTimeout(() => setSaveStatus('idle'), 6000)
    }
  }

  // Reset to original data.ts order
  function handleReset() {
    const reset = ADMIN_CLIENTS.map(c => ({ ...c, currentOrder: c.order }))
    reset.sort((a, b) => a.currentOrder - b.currentOrder)
    setClients(reset)
    localStorage.removeItem('client-order')
    setSaveStatus('idle')
  }

  // Stats
  const payingCount = clients.filter(c => c.type === 'paying').length
  const demoCount = clients.filter(c => c.type === 'demo').length
  const showcaseCount = clients.filter(c => c.type === 'showcase').length

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          🏢 Client Order Manager
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          Drag rows to reorder. Order saves to GitHub → Cloudflare Pages rebuilds automatically.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: clients.length, color: '#fff' },
          { label: 'Paying', value: payingCount, color: '#a855f7' },
          { label: 'Demo', value: demoCount, color: '#f59e0b' },
          { label: 'Showcase', value: showcaseCount, color: '#22c55e' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#111118', border: '1px solid #1a1a24', borderRadius: 10,
            padding: '12px 20px', textAlign: 'center', minWidth: 80
          }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '28px 48px 1fr 100px 80px 80px',
        gap: 12, padding: '0 16px', marginBottom: 4
      }}>
        {['Drag', 'Thumb', 'Client', 'Type', 'Reviews', 'Order'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</div>
        ))}
      </div>

      {/* Draggable list */}
      <div style={{ marginBottom: 24 }}>
        {clients.map(client => (
          <DraggableRow
            key={client.slug}
            client={client}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            isDragOver={dragOverSlug === client.slug && draggedSlug !== client.slug}
          />
        ))}
      </div>

      {/* Action bar */}
      <div style={{
        background: '#111118', border: '1px solid #1a1a24', borderRadius: 12,
        padding: 20, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'
      }}>
        {/* Token input */}
        {showTokenInput && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              ref={tokenInputRef}
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={gitHubToken}
              onChange={e => setGitHubToken(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSaveAndRedeploy()}
              style={{
                background: '#0a0a0f', border: '1px solid #3b82f640', borderRadius: 8,
                padding: '8px 16px', color: '#fff', fontSize: 13, width: 260
              }}
            />
            <span style={{ fontSize: 11, color: '#666' }}>GitHub PAT (repo scope)</span>
          </div>
        )}

        {/* Save + Redeploy button */}
        <button
          onClick={handleSaveAndRedeploy}
          disabled={saveStatus === 'saving'}
          style={{
            background: saveStatus === 'success' ? '#22c55e' : saveStatus === 'error' ? '#ef4444' : '#3b82f6',
            border: 'none', borderRadius: 10, padding: '10px 20px',
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: saveStatus === 'saving' ? 'wait' : 'pointer',
            minWidth: 180, display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          {saveStatus === 'saving' ? '⏳ Saving...' :
           saveStatus === 'success' ? '✅ Saved! Cloudflare rebuilding...' :
           saveStatus === 'error' ? `❌ ${errorMsg.slice(0, 60)}` :
           '💾 Save Order & Redeploy'}
        </button>

        {/* Reset button */}
        <button
          onClick={handleReset}
          style={{
            background: 'transparent', border: '1px solid #333', borderRadius: 10,
            padding: '10px 16px', color: '#888', fontSize: 13, cursor: 'pointer'
          }}
        >
          ↺ Reset to Original
        </button>

        {/* Helper text */}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#444' }}>
          Order auto-saved locally. Hit "Save Order & Redeploy" to publish.
        </div>
      </div>

      {/* How-to */}
      <div style={{
        marginTop: 24, background: '#0a0a0f', border: '1px solid #1a1a24', borderRadius: 12,
        padding: '16px 20px', fontSize: 12, color: '#555', lineHeight: 1.7
      }}>
        <strong style={{ color: '#666' }}>How it works:</strong><br />
        ① Drag rows up/down to reorder<br />
        ② Order auto-saved to browser (instant)<br />
        ③ Click "Save Order & Redeploy" → enters GitHub PAT if not set<br />
        ④ Commits <code style={{ color: '#3b82f6' }}>public/client-order.json</code> to main<br />
        ⑤ Cloudflare Pages detects change → rebuilds → new order live in ~30s
      </div>
    </div>
  )
}