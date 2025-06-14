/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PLEX:         string
      OVERSEERR:    string
      RADARR:       string
      SONARR:       string
      NZBGET:       string
      UN_SERVER:    string
      CLOUDFLARE:   string
      HA:           string
      UPTIME_KEY:   string

      // your Worker KV binding
      UPTIMEFLARE_STATE: KVNamespace
    }
  }
}

export {}