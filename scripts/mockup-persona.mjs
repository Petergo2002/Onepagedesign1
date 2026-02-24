#!/usr/bin/env node

import { spawnSync } from 'node:child_process'

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

function slugToTitle(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const PERSONA_PRESETS = {
  elektriker: {
    industry: 'elektriker',
    industrySingular: 'elektriker',
    industryPlural: 'eltjanster',
    service: 'elinstallation',
    serviceName: 'Elinstallation',
    gbpCategory: 'Elektriker',
    schemaType: 'Electrician',
  },
  taklaggare: {
    industry: 'taklaggare',
    industrySingular: 'taklaggare',
    industryPlural: 'takarbeten',
    service: 'taklaggning',
    serviceName: 'Taklaggning',
    gbpCategory: 'Taklaggare',
    schemaType: 'RoofingContractor',
  },
  bygg: {
    industry: 'bygg',
    industrySingular: 'byggfirma',
    industryPlural: 'byggtjanster',
    service: 'byggentreprenad',
    serviceName: 'Byggentreprenad',
    gbpCategory: 'Byggfirma',
    schemaType: 'GeneralContractor',
  },
}

const ALIASES = {
  tak: 'taklaggare',
  takläggare: 'taklaggare',
  elektrik: 'elektriker',
  electrician: 'elektriker',
}

function normalizePersona(input) {
  const raw = String(input || '').trim().toLowerCase()
  return ALIASES[raw] || raw
}

function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help === 'true') {
    console.log('Usage: npm run workflow:mockup-persona -- --profile <profile-id> --persona <elektriker|taklaggare|bygg> --city <city-slug> [--city-name "City"] [--brand-name "Brand"]')
    process.exit(0)
  }

  const profile = args.profile || 'default'
  const personaKey = normalizePersona(args.persona || '')
  const preset = PERSONA_PRESETS[personaKey]
  const city = args.city || 'stockholm'
  const cityName = args['city-name'] || slugToTitle(city)

  if (!preset) {
    console.error(`Unknown persona: ${args.persona || '(missing)'}`)
    console.error('Supported personas: elektriker, taklaggare, bygg')
    process.exit(1)
  }

  const brandName = args['brand-name'] || `${cityName} ${preset.serviceName}`
  const brandShort = args['brand-short'] || brandName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
  const domain = args.domain || 'example.se'
  const email = args.email || 'kontakt@example.se'
  const phoneDisplay = args['phone-display'] || '010-000 00 00'
  const phoneHref = args['phone-href'] || 'tel:+46100000000'

  const refactorArgs = [
    'scripts/refactor-industry-template.mjs',
    '--profile',
    profile,
    '--industry',
    preset.industry,
    '--industry-singular',
    preset.industrySingular,
    '--industry-plural',
    preset.industryPlural,
    '--service',
    preset.service,
    '--service-name',
    preset.serviceName,
    '--location',
    city,
    '--location-name',
    cityName,
    '--brand-name',
    brandName,
    '--brand-short',
    brandShort,
    '--domain',
    domain,
    '--email',
    email,
    '--phone-display',
    phoneDisplay,
    '--phone-href',
    phoneHref,
    '--gbp-category',
    preset.gbpCategory,
    '--schema-type',
    preset.schemaType,
    '--clean-existing-pages',
    'true',
  ]

  const result = spawnSync(process.execPath, refactorArgs, { stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  console.log(`Mockup persona applied: ${personaKey} (${cityName}) on profile ${profile}`)
  console.log('Next: follow docs/workflows/mockup-persona.md')
}

main()
