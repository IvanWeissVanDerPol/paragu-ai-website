import { MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/utils'

export function MobileWhatsAppBar() {
  return (
    <a
      href={waLink('Hola, vi ParaguAI y quiero una demo gratis.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed inset-x-3 bottom-3 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-emerald-900/30 transition-transform active:scale-[0.98] md:hidden"
    >
      <MessageCircle size={18} />
      Pedir demo gratis
    </a>
  )
}
