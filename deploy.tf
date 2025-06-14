terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "cloudflare" {
  # token is read from $CLOUDFLARE_API_TOKEN
}

variable "CLOUDFLARE_ACCOUNT_ID" { type = string }

# Define one variable per secret
variable "PLEX_URL"      { type = string }
variable "OVERSEERR_URL" { type = string }
variable "RADARR_URL"    { type = string }
variable "SONARR_URL"    { type = string }
variable "NZBGET_URL"    { type = string }
variable "UN_SERVER_URL" { type = string }
variable "CLOUDFLARE_URL"{ type = string }
variable "HA_URL"        { type = string }
variable "UPTIME_KEY"    { type = string }

resource "cloudflare_workers_kv_namespace" "uptimeflare_kv" {
  account_id = var.CLOUDFLARE_ACCOUNT_ID
  title      = "uptimeflare_kv"
}

resource "cloudflare_worker_script" "uptimeflare" {
  account_id         = var.CLOUDFLARE_ACCOUNT_ID
  name               = "uptimeflare_worker"
  content            = file("worker/dist/index.js")
  module             = true
  compatibility_date = "2025-04-02"

  kv_namespace_binding {
    name         = "UPTIMEFLARE_STATE"
    namespace_id = cloudflare_workers_kv_namespace.uptimeflare_kv.id
  }
}

# Inject your secrets properly
resource "cloudflare_worker_secret" "env" {
  for_each    = {
    PLEX        = var.PLEX_URL
    OVERSEERR   = var.OVERSEERR_URL
    RADARR      = var.RADARR_URL
    SONARR      = var.SONARR_URL
    NZBGET      = var.NZBGET_URL
    UN_SERVER   = var.UN_SERVER_URL
    CLOUDFLARE  = var.CLOUDFLARE_URL
    HA          = var.HA_URL
    UPTIME_KEY  = var.UPTIME_KEY
  }
  account_id  = var.CLOUDFLARE_ACCOUNT_ID
  script_name = cloudflare_worker_script.uptimeflare.name
  name        = each.key
  secret_text = each.value
}

resource "cloudflare_worker_cron_trigger" "uptimeflare_worker_cron" {
  account_id  = var.CLOUDFLARE_ACCOUNT_ID
  script_name = cloudflare_worker_script.uptimeflare.name
  schedules   = ["* * * * *"]
}

resource "cloudflare_pages_project" "uptimeflare" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = "uptimeflare"
  production_branch = "main"

  deployment_configs {
    production {
      kv_namespaces = {
        UPTIMEFLARE_STATE = cloudflare_workers_kv_namespace.uptimeflare_kv.id
      }
      compatibility_date  = "2025-04-02"
      compatibility_flags = ["nodejs_compat"]
    }
  }
}