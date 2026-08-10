import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function waLink(
  message: string,
  phone: string = '595981324569'
): string {
  return `tel:+${phone}?text=${encodeURIComponent(message)}`
}

export const MESSAGING = '595981324569'
export const SITE_URL = 'https://paragu-ai.com'
