#!/usr/bin/env node

import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'src/lib/service-location-pages/data')
const WORKFLOW_DIR = path.join(process.cwd(), 'docs/workflows')
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
    if (Array.isArray(input)) {
        return input.map((item) => replaceImageFields(item))
    }

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

async function pickFallbackTemplatePath() {
    const files = (await readdir(DATA_DIR)).filter((file) => file.endsWith('.json')).sort((a, b) => a.localeCompare(b, 'sv'))
    if (files.length === 0) return null
    return path.join(DATA_DIR, files[0])
}

function printUsage() {
    console.log('Usage:')
    console.log('  npm run workflow:new-location -- --service elinstallation --location stockholm [--service-name "Elinstallation"] [--location-name "Stockholm"]')
    console.log('Optional:')
    console.log('  --from-service elinstallation')
    console.log('  --from-location goteborg')
    console.log('  --gbp-category "Elektriker"')
}

async function main() {
    const args = parseArgs(process.argv.slice(2))

    if (args.help === 'true') {
        printUsage()
        process.exit(0)
    }

    const service = args.service
    const location = args.location
    const serviceName = args['service-name'] ?? toTitleFromSlug(service || '')
    const locationName = args['location-name'] ?? toTitleFromSlug(location || '')
    const fromService = args['from-service'] ?? 'elinstallation'
    const fromLocation = args['from-location'] ?? 'goteborg'
    const gbpCategory = args['gbp-category'] ?? undefined

    if (!service || !location) {
        console.error('Missing required args: --service and --location')
        printUsage()
        process.exit(1)
    }

    if (!isSlug(service) || !isSlug(location)) {
        console.error('Invalid slug format. Use lowercase and hyphens only.')
        process.exit(1)
    }

    let sourcePath = path.join(DATA_DIR, `${fromService}__${fromLocation}.json`)
    const targetPath = path.join(DATA_DIR, `${service}__${location}.json`)

    if (!(await fileExists(sourcePath))) {
        const fallbackSourcePath = await pickFallbackTemplatePath()
        if (!fallbackSourcePath) {
            console.error(`Template source not found: ${sourcePath}`)
            console.error(`No fallback template found in ${DATA_DIR}`)
            process.exit(1)
        }
        sourcePath = fallbackSourcePath
        console.warn(`Template source not found. Using fallback template: ${path.relative(process.cwd(), sourcePath)}`)
    }

    if (await fileExists(targetPath)) {
        console.error(`Target file already exists: ${targetPath}`)
        process.exit(1)
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
    draft.schemaType = draft.schemaType ?? 'Electrician'
    draft.gbpCategory = gbpCategory ?? draft.gbpCategory ?? serviceName
    draft.businessName = draft.businessName ?? `ElFutur ${locationName}`
    draft.businessAddress = draft.businessAddress ?? {
        streetAddress: '',
        postalCode: '',
        addressLocality: locationName,
        addressRegion: '',
        addressCountry: 'SE',
    }
    draft.sameAs = Array.isArray(draft.sameAs) ? draft.sameAs : ['https://elfutur.se']
    draft.pageTitle = `${serviceName} i ${locationName}`
    draft.metaTitle = `${draft.gbpCategory} ${locationName} | ElFutur`
    draft.metaDesc = `Behöver du ${serviceName.toLowerCase()} i ${locationName}? ElFutur hjälper dig med planering, installation och felsökning. Auktoriserade elektriker och snabb offert.`
    draft.heroTitle = `${serviceName} i ${locationName}, gjort rätt från start`
    draft.heroSubtitle = `Vi hjälper privatpersoner, BRF:er och företag i ${locationName} med säkra installationer enligt gällande regler. Tydlig offert, punktlig leverans och dokumenterat utförande.`
    const draftWithImagePlaceholders = replaceImageFields(draft)

    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(targetPath, `${JSON.stringify(draftWithImagePlaceholders, null, 2)}\n`, 'utf-8')

    const workflowFile = path.join(WORKFLOW_DIR, `${service}-${location}.md`)
    const workflowBody = `# Workflow: ${serviceName} i ${locationName}

Generated: ${new Date().toISOString().slice(0, 10)}
Data file: \`src/lib/service-location-pages/data/${service}__${location}.json\`

## Todo before publish

1. Replace hero image with local/relevant image.
2. Rewrite offerings so they are unique for ${locationName}.
3. Update localProblems with real local pain points.
4. Replace caseStudies with local projects and outcomes.
5. Update areas list for ${locationName}.
6. Rewrite FAQ with local intent and wording.
7. Check related services for this customer.
8. Run \`npm run lint\`.
9. Run \`npm run build\`.
`

    await mkdir(WORKFLOW_DIR, { recursive: true })
    await writeFile(workflowFile, workflowBody, 'utf-8')

    console.log(`Created page data: ${path.relative(process.cwd(), targetPath)}`)
    console.log(`Created workflow checklist: ${path.relative(process.cwd(), workflowFile)}`)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
