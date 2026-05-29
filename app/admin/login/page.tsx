'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Login failed' }))
      setError(body.error || 'Login failed')
      setLoading(false)
      return
    }

    const next = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('next') || '/admin'
      : '/admin'
    router.replace(next)
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#08080d', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: '#111118', border: '1px solid #1a1a24', borderRadius: 14, padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Admin Access</h1>
        <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 18 }}>ParaguAI internal panel</p>

        <label style={{ fontSize: 12, color: '#9ca3af' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginTop: 8, marginBottom: 12, padding: '10px 12px', borderRadius: 10, border: '1px solid #2a2a3a', background: '#0a0a0f', color: '#fff' }}
        />

        {error ? <div style={{ color: '#f87171', fontSize: 12, marginBottom: 12 }}>{error}</div> : null}

        <button
          disabled={loading}
          type="submit"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
