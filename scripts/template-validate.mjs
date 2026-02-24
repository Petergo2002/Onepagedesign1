#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const PLACEHOLDER_PATTERNS = ['[ANPASSA TEXT]', '[BYT BILD]', '[ANPASSA PRIS]', '[ANPASSA OMRÅDE]', '[ANPASSA SIFFRA]', '[ANPASSA FRÅGA', '[ANPASSA SVAR']
const FORBIDDEN_DOMAINS = ['example.se']

const APP_MODE = (process.env.APP_MODE || 'mockup').toLowerCase() === 'production' ? 'production' : 'mockup'
const TEMPLATE_PROFILE = process.env.TEMPLATE_PROFILE || 'default'

function isJsonFile(fileName) {
  return fileName.endsWith('.json')
}

function collectPlaceholderMatches(raw) {
  return PLACEHOLDER_PATTERNS.filter((pattern) => raw.includes(pattern))
}

function extractSiteDomain(siteRaw) {
  const match = siteRaw.match(/domain:\s*['\"]([^'\"]+)['\"]/)
  return match?.[1]?.trim() ?? null
}

async function validateLocations(root, errors) {
  const locationsDir = path.join(root, 'profiles', TEMPLATE_PROFILE, 'locations')
  const files = (await readdir(locationsDir)).filter(isJsonFile)

  if (!files.length) {
    errors.push(`No location files found in ${locationsDir}`)
    return
  }

  for (const file of files) {
    const fullPath = path.join(locationsDir, file)
    const raw = await readFile(fullPath, 'utf-8')
    const data = JSON.parse(raw)

    if (!Array.isArray(data.faq) || data.faq.length === 0) {
      errors.push(`${file}: faq must contain at least 1 item`)
    }

    if (!Array.isArray(data.reviews) || data.reviews.length === 0) {
      errors.push(`${file}: reviews must contain at least 1 item`)
    }

    if (!Array.isArray(data.relatedServices) || data.relatedServices.length === 0) {
      errors.push(`${file}: relatedServices must contain at least 1 item`)
    }

    if (APP_MODE === 'production') {
      const matches = collectPlaceholderMatches(raw)
      if (matches.length) {
        errors.push(`${file}: contains placeholders (${matches.join(', ')})`)
      }
    }
  }
}

async function validateSite(root, errors) {
  const sitePath = path.join(root, 'profiles', TEMPLATE_PROFILE, 'site.ts')
  const raw = await readFile(sitePath, 'utf-8')

  const domain = extractSiteDomain(raw)
  if (!domain) {
    errors.push('profiles/<id>/site.ts: domain field not found')
    return
  }

  if (APP_MODE === 'production' && FORBIDDEN_DOMAINS.includes(domain.toLowerCase())) {
    errors.push(`profiles/${TEMPLATE_PROFILE}/site.ts: domain cannot be ${domain} in production mode`)
  }

  if (APP_MODE === 'production') {
    const matches = collectPlaceholderMatches(raw)
    if (matches.length) {
      errors.push(`profiles/${TEMPLATE_PROFILE}/site.ts: contains placeholders (${matches.join(', ')})`)
    }
  }
}

async function validateHardcodedContact(root, errors) {
  const targetDirs = [path.join(root, 'src', 'components'), path.join(root, 'src', 'app')]
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
  const telRegex = /tel:\+?[0-9]/gi

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(full)
        continue
      }
      if (!/\.(ts|tsx|js|jsx)$/.test(entry.name)) continue

      const raw = await readFile(full, 'utf-8')
      const hasRegexEmailPattern = raw.includes('[^\\s@]+@[^\\s@]+')
      if (emailRegex.test(raw) && !raw.includes('siteConfig.email') && !hasRegexEmailPattern) {
        errors.push(`${path.relative(root, full)}: hardcoded email found`)
      }
      emailRegex.lastIndex = 0

      if (telRegex.test(raw) && !raw.includes('siteConfig.phoneHref') && !raw.includes('data.phoneHref')) {
        errors.push(`${path.relative(root, full)}: hardcoded telephone href found`)
      }
      telRegex.lastIndex = 0
    }
  }

  for (const dir of targetDirs) {
    await walk(dir)
  }
}

async function validateProfileExists(root, errors) {
  const profileDir = path.join(root, 'profiles', TEMPLATE_PROFILE)
  try {
    await readdir(profileDir)
  } catch {
    errors.push(`Profile not found: ${profileDir}`)
  }
}

async function main() {
  const root = process.cwd()
  const errors = []

  await validateProfileExists(root, errors)
  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  await validateSite(root, errors)
  await validateLocations(root, errors)
  await validateHardcodedContact(root, errors)

  if (errors.length > 0) {
    throw new Error(`Template validation failed (APP_MODE=${APP_MODE}, TEMPLATE_PROFILE=${TEMPLATE_PROFILE}):\n- ${errors.join('\n- ')}`)
  }

  console.log(`Template validation passed (APP_MODE=${APP_MODE}, TEMPLATE_PROFILE=${TEMPLATE_PROFILE})`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
