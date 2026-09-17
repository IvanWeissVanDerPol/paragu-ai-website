import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const config: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "",
  env: {
    NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP,
  },
};

// Required by @opennextjs/cloudflare so `next dev` resolves CF bindings
// (KV, R2, Workers AI, etc.) the same way they are at runtime.
initOpenNextCloudflareForDev();

export default config;
