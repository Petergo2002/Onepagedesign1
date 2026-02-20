export const siteConfig = {
  brandName: "Svensk Bygg & Snickeri",
  brandShort: "SBS",
  domain: "svenskbygg.se",
  phoneDisplay: "08-123 45 67",
  phoneHref: "tel:+4681234567",
  email: "offert@svenskbygg.se",
  defaultLocale: 'sv_SE',
} as const

export const siteUrl = `https://${siteConfig.domain}`

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteUrl).toString()
}
