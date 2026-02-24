import type { AppMode, ServiceLocationPageData, TemplateProfile } from './types'

export const PLACEHOLDER_PATTERNS = ['[ANPASSA TEXT]', '[BYT BILD]', '[ANPASSA PRIS]', '[ANPASSA OMRÅDE]', '[ANPASSA SIFFRA]', '[ANPASSA FRÅGA', '[ANPASSA SVAR']

const FORBIDDEN_TEST_DOMAINS = ['example.se']

function collectStrings(input: unknown, path = 'root', acc: Array<{ path: string; value: string }> = []) {
  if (typeof input === 'string') {
    acc.push({ path, value: input })
    return acc
  }

  if (Array.isArray(input)) {
    input.forEach((value, index) => collectStrings(value, `${path}[${index}]`, acc))
    return acc
  }

  if (input && typeof input === 'object') {
    Object.entries(input).forEach(([key, value]) => collectStrings(value, `${path}.${key}`, acc))
  }

  return acc
}

export function validateLocationPage(page: ServiceLocationPageData, mode: AppMode): string[] {
  const errors: string[] = []

  if (!page.relatedServices?.length) {
    errors.push(`${page.serviceSlug}/${page.locationSlug}: relatedServices must contain at least 1 item`)
  }

  if (!page.faq?.length) {
    errors.push(`${page.serviceSlug}/${page.locationSlug}: faq must contain at least 1 item`)
  }

  if (!page.reviews?.length) {
    errors.push(`${page.serviceSlug}/${page.locationSlug}: reviews must contain at least 1 item`)
  }

  if (mode === 'production') {
    const strings = collectStrings(page, `${page.serviceSlug}/${page.locationSlug}`)
    for (const { path, value } of strings) {
      if (PLACEHOLDER_PATTERNS.some((pattern) => value.includes(pattern))) {
        errors.push(`${path}: contains placeholder text`)
      }
    }
  }

  return errors
}

export function validateProfile(profile: TemplateProfile): string[] {
  const errors: string[] = []

  if (!profile.site.brandName.trim()) errors.push('site.brandName is required')
  if (!profile.site.domain.trim()) errors.push('site.domain is required')
  if (!profile.services.length) errors.push('services must contain at least 1 item')

  if (profile.mode === 'production') {
    if (FORBIDDEN_TEST_DOMAINS.includes(profile.site.domain.trim().toLowerCase())) {
      errors.push(`site.domain cannot be a test domain in production mode (${profile.site.domain})`)
    }

    const profileStrings = collectStrings(profile, 'profile')
    for (const { path, value } of profileStrings) {
      if (PLACEHOLDER_PATTERNS.some((pattern) => value.includes(pattern))) {
        errors.push(`${path}: contains placeholder text`)
      }
    }
  }

  return errors
}
