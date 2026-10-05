'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TiendaLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/tienda/auth/login', {
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

    const nextParam = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('next')
      : null
    const next =
      nextParam && nextParam.startsWith('/tienda/admin') && !nextParam.startsWith('/tienda/admin/login')
        ? nextParam
        : '/tienda/admin'
    router.replace(next)
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#faf7f2', color: '#1E5C2E' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: '#fff', border: '1px solid #e8e0d4', borderRadius: 14, padding: 28, boxShadow: '0 8px 30px rgba(30,92,46,0.08)' }}>
        <div style={{ fontSize: 32, marginBottom: 4 }}>🌸</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: '#1E5C2E' }}>Mburucuyá Poty</h1>
        <p style={{ color: '#8a7f6e', fontSize: 13, marginBottom: 18 }}>Panel de la boutique</p>

        <label style={{ fontSize: 12, color: '#8a7f6e' }}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginTop: 8, marginBottom: 12, padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd3c2', background: '#faf7f2', color: '#1E5C2E' }}
        />

        {error ? <div style={{ color: '#b91c1c', fontSize: 12, marginBottom: 12 }}>{error}</div> : null}

        <button
          disabled={loading}
          type="submit"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', background: '#1E5C2E', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
