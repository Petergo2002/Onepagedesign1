#!/usr/bin/env node

import { cp, access, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

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

function toIdentifier(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function registerProfileInRegistry(root, id) {
  const registryPath = path.join(root, 'src', 'lib', 'template', 'profile-registry.ts')
  const text = await readFile(registryPath, 'utf-8')
  if (text.includes(`'${id}': {`)) return

  const ident = toIdentifier(id)
  const importBlock = `import ${ident}Site from '../../../profiles/${id}/site'\nimport ${ident}Industry from '../../../profiles/${id}/industry'\nimport ${ident}Services from '../../../profiles/${id}/services'\nimport ${ident}Testimonials from '../../../profiles/${id}/testimonials'\n`
  const withImports = text.replace('// @profile-imports', `${importBlock}// @profile-imports`)
  const entry = `  '${id}': {\n    site: ${ident}Site as SiteConfig,\n    industry: ${ident}Industry as IndustryCopy,\n    services: ${ident}Services as ServiceCatalogItem[],\n    testimonials: ${ident}Testimonials as Testimonial[],\n  },\n`
  const withEntries = withImports.replace('// @profile-entries', `${entry}  // @profile-entries`)

  await writeFile(registryPath, withEntries, 'utf-8')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const from = args.from
  const to = args.to

  if (!from || !to || !isSlug(from) || !isSlug(to)) {
    throw new Error('Usage: npm run mockup:promote -- --from <mockup-profile> --to <production-profile>')
  }

  const root = process.cwd()
  const source = path.join(root, 'profiles', from)
  const target = path.join(root, 'profiles', to)

  if (!(await exists(source))) throw new Error(`Source profile not found: ${source}`)
  if (await exists(target)) throw new Error(`Target profile already exists: ${target}`)

  await cp(source, target, { recursive: true })
  await registerProfileInRegistry(root, to)

  console.log(`Promoted profile: profiles/${from} -> profiles/${to}`)
  console.log(`Updated profile registry with profile: ${to}`)
  console.log('Next: run APP_MODE=production TEMPLATE_PROFILE=<to> npm run template:validate')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
