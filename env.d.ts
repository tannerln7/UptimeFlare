// env.d.ts

/// <reference types="@cloudflare/workers-types" />

declare global {
  // your Worker KV binding (already there):
  namespace NodeJS {
    interface ProcessEnv {
      UPTIMEFLARE_STATE: KVNamespace
    }
  }

  // the new `env` global that next-on-pages will wire up
  const env: {
    PLEX:       string
    OVERSEERR:  string
    RADARR:     string
    SONARR:     string
    NZBGET:     string
    UN_SERVER:  string
    CLOUDFLARE: string
    HA:         string
    UPTIME_KEY: string
  }
}

export {}