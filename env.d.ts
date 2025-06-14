/// <reference types="@cloudflare/workers-types" />

export {}

declare global {
  // This is the shape of the `env` object injected at runtime
  interface Env {
    // KV binding (already there)
    UPTIMEFLARE_STATE: KVNamespace

    // Your custom secrets & URLs:
    PLEX:       string
    OVERSEERR:  string
    RADARR:     string
    SONARR:     string
    NZBGET:     string
    UN_SERVER:  string
    CLOUDFLARE: string
    HA:         string

    // The shared secret header you’re using
    UPPTIME_KEY: string
  }
}