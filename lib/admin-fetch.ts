export type ApiEnvelope<T> = { data: T; error?: string }

export async function adminFetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })

  const body = (await res.json().catch(() => ({}))) as Partial<ApiEnvelope<T>>
  if (!res.ok) {
    throw new Error((body.error as string) || `Request failed (${res.status})`)
  }

  return (body.data ?? body) as T
}
