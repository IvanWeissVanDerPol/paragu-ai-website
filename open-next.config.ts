import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Default behavior — incremental cache is in-memory per request.
  // R2-backed cache can be added later via overrides/incremental-cache/r2-incremental-cache
  // once a CF R2 binding is provisioned in wrangler.jsonc.
});
