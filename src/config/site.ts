import { loadActiveProfile } from '@/lib/template/profile'

export const siteConfig = loadActiveProfile().site

export const siteUrl = `https://${siteConfig.domain}`

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteUrl).toString()
}
