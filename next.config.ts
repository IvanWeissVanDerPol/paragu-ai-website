import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '',
  env: {
    NEXT_PUBLIC_MESSAGING: process.env.NEXT_PUBLIC_MESSAGING,
  },
}

export default config
