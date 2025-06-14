import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'
const pageConfig: PageConfig = {
  // Title for your status page
  title: "Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/tannerln7', label: 'GitHub', highlight: true},
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '🌐 Public (Plex)': ['Local Server', 'Plex', 'Overseerr', 'Radarr', 'Sonarr', 'Download Client', 'Download Server', 'Authentication', 'Automation', 'Cloudflare'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // Example HTTP Monitor
    {
      // `id` should be unique, history will be kept if the `id` remains constant
      id: 'server',
      // `name` is used at status page and callback message
      name: 'Local Server',
      // `method` should be a valid HTTP Method
      method: 'POST',
      // `target` is a valid URL
      target: process.env.PLEX!,
      // [OPTIONAL] `tooltip` is ONLY used at status page to show a tooltip
      tooltip: 'https connection to local plex server.',
      // [OPTIONAL] `statusPageLink` is ONLY used for clickable link at status page
      // statusPageLink: 'https://example.com',
      // [OPTIONAL] `hideLatencyChart` will hide status page latency chart if set to true
      hideLatencyChart: false,
      // [OPTIONAL] `expectedCodes` is an array of acceptable HTTP response codes, if not specified, default to 2xx
      expectedCodes: [200],
      // [OPTIONAL] `timeout` in millisecond, if not specified, default to 10000
      timeout: 10000,
      // [OPTIONAL] headers to be sent
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
      // [OPTIONAL] body to be sent
      // body: 'Hello, world!',
      // [OPTIONAL] if specified, the response must contains the keyword to be considered as operational.
      // responseKeyword: 'success',
      // [OPTIONAL] if specified, the response must NOT contains the keyword to be considered as operational.
      // responseForbiddenKeyword: 'bad gateway',
      // [OPTIONAL] if specified, will call the check proxy to check the monitor, mainly for geo-specific checks
      // refer to docs https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup before setting this value
      // currently supports `worker://` and `http(s)://` proxies
      checkProxy: 'worker://enam',
      // [OPTIONAL] if true, the check will fallback to local if the specified proxy is down
      checkProxyFallback: true,
    },
    {
      id: 'plex',
      name: 'app.plex.tv',
      method: 'POST',
      target: 'https://app.plex.tv',
      tooltip: 'Plex official webapp',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'overseerr',
      name: 'Overseerr',
      method: 'POST',
      target: process.env.OVERSEERR!,
      tooltip: 'Media request webapp.',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
    },
    {
      id: 'radarr',
      name: 'Movie API',
      method: 'POST',
      target: process.env.RADARR!,
      tooltip: 'Backend movie API',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
    },
    {
      id: 'sonarr',
      name: 'Episodes API',
      method: 'POST',
      target: process.env.SONARR!,
      tooltip: 'Backend TV episode API',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
    },
    {
      id: 'nzbget',
      name: 'Download Client',
      method: 'POST',
      target: process.env.NZBGET!,
      tooltip: 'Download client api.',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
    },
    {
      id: 'unet',
      name: 'Download server',
      method: 'POST',
      target: process.env.UN_SERVER!,
      tooltip: 'Download server NTTP API',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'cloudflare',
      name: 'Cloudflare',
      method: 'POST',
      target: process.env.CLOUDFLARE!,
      tooltip: 'Domain host and DNS routeing',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'ha',
      name: 'Automations',
      method: 'POST',
      target: process.env.HA!,
      tooltip: 'Automation server / dashboard',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: `Bearer ${process.env.UPTIME_KEY!}`,
      },
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    // appriseApiServer: 'https://apprise.example.com/notify',
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    // recipientUrl: 'tgram://bottoken/ChatID',
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    // timeZone: 'Asia/Shanghai',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    // gracePeriod: 5,
    // [Optional] disable notification for monitors with specified ids
    // skipNotificationIds: ['foo_monitor', 'bar_monitor'],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
const maintenances: MaintenanceConfig[] = []
// const maintenances: MaintenanceConfig[] = [
  // {
    // [Optional] Monitor IDs to be affected by this maintenance
    // monitors: ['foo_monitor', 'bar_monitor'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    // title: 'Test Maintenance',
    // Description of the maintenance, will be shown at status page
    // body: 'This is a test maintenance, server software upgrade',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    // start: '2025-04-27T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    // end: '2025-04-30T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    // color: 'blue',
  // },
// ]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
