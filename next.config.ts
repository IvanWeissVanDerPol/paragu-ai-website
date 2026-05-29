import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '',
  env: {
    NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP,
  },
}

export default config
