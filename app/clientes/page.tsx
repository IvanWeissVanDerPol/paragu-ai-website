import { redirect } from 'next/navigation'

// The portfolio page now lives at /. /clientes redirects here so
// any existing links (Google, share chats, etc.) keep working.
export default function ClientesPage() {
  redirect('/')
}
