#!/usr/bin/env node

import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const IMAGE_PLACEHOLDER = '[BYT BILD]'

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) continue
    const key = token.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = 'true'
      continue
    }
    args[key] = next
    i += 1
  }
  return args
}

function isSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

function toTitleFromSlug(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function replaceInStrings(input, replacements) {
  if (typeof input === 'string') {
    let output = input
    for (const [from, to] of replacements) {
      output = output.split(from).join(to)
    }
    return output
  }

  if (Array.isArray(input)) {
    return input.map((item) => replaceInStrings(item, replacements))
  }

  if (input && typeof input === 'object') {
    const out = {}
    for (const [key, value] of Object.entries(input)) {
      out[key] = replaceInStrings(value, replacements)
    }
    return out
  }

  return input
}

function replaceImageFields(input) {
  if (Array.isArray(input)) return input.map((item) => replaceImageFields(item))

  if (input && typeof input === 'object') {
    const out = {}
    for (const [key, value] of Object.entries(input)) {
      const isImageField = typeof value === 'string' && (key === 'heroImg' || key.toLowerCase().endsWith('img'))
      out[key] = isImageField ? IMAGE_PLACEHOLDER : replaceImageFields(value)
    }
    return out
  }

  return input
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function pickFallbackTemplatePath(dataDir) {
  const files = (await readdir(dataDir)).filter((file) => file.endsWith('.json')).sort((a, b) => a.localeCompare(b, 'sv'))
  if (files.length === 0) return null
  return path.join(dataDir, files[0])
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help === 'true') {
    console.log('Usage: npm run template:new-location -- --profile <profile-id> --service <service-slug> --location <location-slug> [--service-name "..."] [--location-name "..."] [--gbp-category "..."]')
    process.exit(0)
  }

  const profileId = args.profile || process.env.TEMPLATE_PROFILE || 'default'
  const service = args.service
  const location = args.location
  const serviceName = args['service-name'] ?? toTitleFromSlug(service || '')
  const locationName = args['location-name'] ?? toTitleFromSlug(location || '')
  const gbpCategory = args['gbp-category'] ?? serviceName

  if (!profileId || !service || !location) {
    throw new Error('Missing required args: --profile, --service and --location')
  }

  if (!isSlug(profileId) || !isSlug(service) || !isSlug(location)) {
    throw new Error('Invalid slug format. Use lowercase and hyphens only.')
  }

  const profileDir = path.join(process.cwd(), 'profiles', profileId)
  const dataDir = path.join(profileDir, 'locations')

  if (!(await fileExists(profileDir))) {
    throw new Error(`Profile not found: ${profileDir}`)
  }

  const targetPath = path.join(dataDir, `${service}__${location}.json`)
  if (await fileExists(targetPath)) {
    throw new Error(`Target file already exists: ${targetPath}`)
  }

  const sourcePath = await pickFallbackTemplatePath(dataDir)
  if (!sourcePath) {
    throw new Error(`No template source found in ${dataDir}`)
  }

  const sourceRaw = await readFile(sourcePath, 'utf-8')
  const sourceData = JSON.parse(sourceRaw)

  const replacements = [
    [sourceData.serviceName, serviceName],
    [sourceData.locationName, locationName],
    [sourceData.locationSlug, location],
    [sourceData.serviceSlug, service],
  ]

  const draft = replaceInStrings(sourceData, replacements)
  draft.serviceSlug = service
  draft.locationSlug = location
  draft.serviceName = serviceName
  draft.locationName = locationName
  draft.gbpCategory = gbpCategory
  draft.pageTitle = `${serviceName} i ${locationName}`
  draft.metaTitle = `${gbpCategory} ${locationName} | [ANPASSA FÖRETAGSNAMN]`
  draft.metaDesc = `[ANPASSA TEXT]: unik meta description för ${serviceName.toLowerCase()} i ${locationName}.`
  draft.heroTitle = `${serviceName} i ${locationName}`
  draft.heroSubtitle = `[ANPASSA TEXT]: unik lokal hero-copy för ${locationName}.`
  draft.relatedServices = Array.isArray(draft.relatedServices) && draft.relatedServices.length > 0
    ? draft.relatedServices
    : [{ title: 'Relaterad tjänst', slug: service, desc: '[ANPASSA TEXT]' }]

  const finalized = replaceImageFields(draft)
  await mkdir(dataDir, { recursive: true })
  await writeFile(targetPath, `${JSON.stringify(finalized, null, 2)}\n`, 'utf-8')

  console.log(`Created page data: ${path.relative(process.cwd(), targetPath)}`)
  console.log('Next: follow docs/workflows/service-location.md')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
