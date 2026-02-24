#!/usr/bin/env node

import { cp, access, mkdir, readFile, writeFile } from 'node:fs/promises'
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

  const ident = toIdentifier(id)
  const importBlock = `import ${ident}Site from '../../../profiles/${id}/site'\nimport ${ident}Industry from '../../../profiles/${id}/industry'\nimport ${ident}Services from '../../../profiles/${id}/services'\nimport ${ident}Testimonials from '../../../profiles/${id}/testimonials'\n`

  if (text.includes(`'${id}': {`)) return

  const withImports = text.replace('// @profile-imports', `${importBlock}// @profile-imports`)
  const entry = `  '${id}': {\n    site: ${ident}Site as SiteConfig,\n    industry: ${ident}Industry as IndustryCopy,\n    services: ${ident}Services as ServiceCatalogItem[],\n    testimonials: ${ident}Testimonials as Testimonial[],\n  },\n`
  const withEntries = withImports.replace('// @profile-entries', `${entry}  // @profile-entries`)

  await writeFile(registryPath, withEntries, 'utf-8')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const id = args.id

  if (!id || !isSlug(id)) {
    console.error('Usage: npm run template:new-profile -- --id <profile-id>')
    process.exit(1)
  }

  const root = process.cwd()
  const source = path.join(root, 'profiles', 'default')
  const target = path.join(root, 'profiles', id)

  if (!(await exists(source))) {
    console.error('profiles/default does not exist.')
    process.exit(1)
  }

  if (await exists(target)) {
    console.error(`Profile already exists: ${target}`)
    process.exit(1)
  }

  await cp(source, target, { recursive: true })
  await registerProfileInRegistry(root, id)

  const readmePath = path.join(target, 'README.md')
  const readme = `# Profile: ${id}

This profile is generated from \`profiles/default\`.

## Next steps

1. Update \`site.ts\` with brand and contact details.
2. Update \`industry.ts\` with market-specific copy.
3. Update \`services.ts\` with real services.
4. Rewrite all JSON files in \`locations/\`.
5. Run \`APP_MODE=production TEMPLATE_PROFILE=${id} npm run template:validate\`.
`

  await mkdir(target, { recursive: true })
  await writeFile(readmePath, readme, 'utf-8')

  console.log(`Created profile: profiles/${id}`)
  console.log(`Updated profile registry with profile: ${id}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
