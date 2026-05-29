/**
 * Client order utilities
 * Reads custom order from /public/client-order.json (fetched at runtime).
 * Falls back to order field in lib/data.ts if no custom order is set.
 */

/**
 * Fetch the custom order from the deployed JSON file.
 * Returns null if the file doesn't exist yet (first-time setup).
 */
export async function fetchClientOrder(): Promise<Record<string, number> | null> {
  if (typeof window === 'undefined') return null // SSR guard
  try {
    const res = await fetch('/client-order.json', { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Sort clients by custom order (or fallback to data.ts order field).
 */
export function sortClients<T extends { slug: string; order: number }>(
  clients: T[],
  customOrder: Record<string, number> | null
): T[] {
  return [...clients].sort((a, b) => {
    const aOrder = customOrder?.[a.slug] ?? a.order
    const bOrder = customOrder?.[b.slug] ?? b.order
    return aOrder - bOrder
  })
}

/**
 * Serialize a slug→position map to JSON string for GitHub commit.
 */
export function orderToJson(order: Record<string, number>): string {
  return JSON.stringify(order, null, 2)
}

/**
 * Parse a JSON string back to a slug→position map.
 */
export function parseOrder(json: string): Record<string, number> {
  try {
    return JSON.parse(json) as Record<string, number>
  } catch {
    return {}
  }
}