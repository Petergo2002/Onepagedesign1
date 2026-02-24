import { STATIC_PROFILE_REGISTRY } from './profile-registry'
import { validateProfile } from './validate'
import type { AppMode, TemplateProfile } from './types'

let cached: TemplateProfile | null = null
let cachedKey: string | null = null

function getRuntimeProfileId(): string | null {
  if (typeof window === 'undefined') return null
  const value = (globalThis as { __TEMPLATE_PROFILE__?: unknown }).__TEMPLATE_PROFILE__
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function getRuntimeAppMode(): AppMode | null {
  if (typeof window === 'undefined') return null
  const value = (globalThis as { __APP_MODE__?: unknown }).__APP_MODE__
  return value === 'production' ? 'production' : value === 'mockup' ? 'mockup' : null
}

export function getAppMode(): AppMode {
  const runtimeMode = getRuntimeAppMode()
  if (runtimeMode) return runtimeMode
  const raw = process.env.APP_MODE?.trim().toLowerCase() ?? process.env.NEXT_PUBLIC_APP_MODE?.trim().toLowerCase()
  return raw === 'production' ? 'production' : 'mockup'
}

export function getTemplateProfileId(): string {
  const runtimeProfileId = getRuntimeProfileId()
  if (runtimeProfileId) return runtimeProfileId
  return process.env.TEMPLATE_PROFILE?.trim() || process.env.NEXT_PUBLIC_TEMPLATE_PROFILE?.trim() || 'default'
}

export function loadActiveProfile(): TemplateProfile {
  const id = getTemplateProfileId()
  const mode = getAppMode()
  const key = `${id}:${mode}`

  if (cached && cachedKey === key) return cached

  const record = STATIC_PROFILE_REGISTRY[id] ?? STATIC_PROFILE_REGISTRY.default

  if (!STATIC_PROFILE_REGISTRY[id]) {
    console.warn(`[template] Unknown TEMPLATE_PROFILE=\"${id}\", falling back to \"default\"`)
  }

  const profile: TemplateProfile = {
    id: STATIC_PROFILE_REGISTRY[id] ? id : 'default',
    mode,
    site: record.site,
    industry: record.industry,
    services: record.services,
    testimonials: record.testimonials,
  }

  const errors = validateProfile(profile)
  if (errors.length > 0) {
    const message = `[template] Validation failed for profile \"${profile.id}\" in mode \"${profile.mode}\":\n- ${errors.join('\n- ')}`
    throw new Error(message)
  }

  cached = profile
  cachedKey = key
  return profile
}
