#!/usr/bin/env node

import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'src/lib/service-location-pages/data')
const WORKFLOW_DIR = path.join(process.cwd(), 'docs/workflows')
const SITE_CONFIG_PATH = path.join(process.cwd(), 'src/config/site.ts')
const INDUSTRY_CONFIG_PATH = path.join(process.cwd(), 'src/config/industry.ts')
const SERVICES_PATH = path.join(process.cwd(), 'src/lib/services.ts')
const TESTIMONIALS_PATH = path.join(process.cwd(), 'src/app/data/testimonials.js')

const IMAGE_PLACEHOLDER = '[BYT BILD]'
const COPY_PLACEHOLDER = '[ANPASSA TEXT]'

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

function toBrandShort(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? '')
        .join('') || 'DM'
}

function parseBoolean(value, defaultValue = false) {
    if (value == null) return defaultValue
    const normalized = String(value).trim().toLowerCase()
    return normalized === 'true' || normalized === '1' || normalized === 'yes'
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

function buildSiteConfigContent({ brandName, brandShort, domain, phoneDisplay, phoneHref, email }) {
    return `export const siteConfig = {
  brandName: ${JSON.stringify(brandName)},
  brandShort: ${JSON.stringify(brandShort)},
  domain: ${JSON.stringify(domain)},
  phoneDisplay: ${JSON.stringify(phoneDisplay)},
  phoneHref: ${JSON.stringify(phoneHref)},
  email: ${JSON.stringify(email)},
  defaultLocale: 'sv_SE',
} as const

export const siteUrl = \`https://\${siteConfig.domain}\`

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : \`/\${path}\`
  return new URL(normalizedPath, siteUrl).toString()
}
`
}

function buildIndustryConfigContent({ industryKey, industrySingular, industryPlural, serviceName }) {
    const industryConfig = {
        key: industryKey,
        singularLabel: industrySingular,
        pluralLabel: industryPlural,
        hero: {
            badge: `${industrySingular.toUpperCase()} I ${COPY_PLACEHOLDER}`,
            titleLead: `Vi levererar`,
            titleAccent: `${serviceName.toLowerCase()} med kvalitet`,
            description: `${COPY_PLACEHOLDER}: skriv en unik hero-text för din bransch och målgrupp.`,
        },
        services: {
            badge: 'VÅRA TJÄNSTER',
            titleLead: `${industryPlural} med`,
            titleAccent: 'precision och trygghet',
            description: `${COPY_PLACEHOLDER}: beskriv erbjudandet för din bransch.`,
        },
        servicesLanding: {
            title: `${industryPlural} för privatpersoner och företag`,
            description: `Välj en tjänst nedan för att läsa mer och komma vidare till rätt sida.`,
        },
        about: {
            badge: 'VÅRT UPPDRAG',
            titleLead: `${serviceName} med`,
            titleAccent: 'fokus på kvalitet',
            description: `${COPY_PLACEHOLDER}: skriv kort om företagets erfarenhet och arbetssätt.`,
            cards: [
                {
                    title: 'Expertis',
                    description: `${COPY_PLACEHOLDER}: beskriv teamets kompetens inom ${industrySingular}.`,
                    icon: 'zap',
                },
                {
                    title: 'Kundfokus',
                    description: `${COPY_PLACEHOLDER}: beskriv hur ni arbetar med kommunikation och leverans.`,
                    icon: 'users',
                },
                {
                    title: 'Kvalitet',
                    description: `${COPY_PLACEHOLDER}: beskriv kvalitetsprocess och garanti.`,
                    icon: 'award',
                },
            ],
            visionTitle: 'Vår vision',
            visionText: `${COPY_PLACEHOLDER}: skriv en branschspecifik vision.`,
            stats: [
                { value: '10+', label: 'års erfarenhet' },
                { value: '500+', label: 'genomförda uppdrag' },
                { value: '100%', label: 'kvalitetsfokus' },
            ],
        },
        contact: {
            intro: `Berätta kort om ditt behov så återkommer vi snabbt med en offert.`,
            messagePlaceholder: `Beskriv ditt behov inom ${serviceName.toLowerCase()}...`,
            reasonsTitle: 'Varför välja oss?',
            reasons: [
                'Fast pris och tydlig tidsplan',
                `Erfarna specialister inom ${industrySingular}`,
                'Trygg kommunikation under hela uppdraget',
                'Nöjd-kund-garanti',
            ],
            responsePromise: 'Vi svarar normalt inom 24 timmar.',
        },
        footer: {
            description: `${COPY_PLACEHOLDER}: skriv en kort, branschspecifik företagsbeskrivning.`,
            ctaTitle: `Behöver du hjälp inom ${industrySingular}?`,
            ctaText: 'Skicka en offertförfrågan så hör vi av oss inom 24 timmar.',
        },
        seo: {
            titleSuffix: `${serviceName} i hela Sverige`,
            description: `hjälper privatpersoner och företag med ${industryPlural}. Fast pris, tydlig leverans och hög kvalitet.`,
            keywords: [
                industrySingular,
                serviceName.toLowerCase(),
                `${serviceName.toLowerCase()} offert`,
                `${industrySingular} pris`,
                'lokala tjänster',
            ],
        },
    }

    return `export interface IndustryStat {
  value: string
  label: string
}

export interface IndustryFeatureCard {
  title: string
  description: string
  icon: 'zap' | 'users' | 'award'
}

export interface IndustryCopy {
  key: string
  singularLabel: string
  pluralLabel: string
  hero: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
  }
  services: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
  }
  servicesLanding: {
    title: string
    description: string
  }
  about: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
    cards: IndustryFeatureCard[]
    visionTitle: string
    visionText: string
    stats: IndustryStat[]
  }
  contact: {
    intro: string
    messagePlaceholder: string
    reasonsTitle: string
    reasons: string[]
    responsePromise: string
  }
  footer: {
    description: string
    ctaTitle: string
    ctaText: string
  }
  seo: {
    titleSuffix: string
    description: string
    keywords: string[]
  }
}

export const industryCopy = ${JSON.stringify(industryConfig, null, 2)} satisfies IndustryCopy
`
}

function buildServicesContent({ serviceSlug, serviceName, industrySingular, locationName }) {
    const services = [
        {
            slug: serviceSlug,
            title: serviceName,
            subtitle: `Lokal ${industrySingular}`,
            shortDesc: `${COPY_PLACEHOLDER}: skriv en unik kort tjänstebeskrivning för ${serviceName.toLowerCase()}.`,
            longDesc: `${COPY_PLACEHOLDER}: skriv en unik lång tjänstebeskrivning för ${serviceName.toLowerCase()} i ${locationName}.`,
            image: IMAGE_PLACEHOLDER,
        },
    ]

    return `export type ServiceSlug = string

export interface ServiceCatalogItem {
  slug: ServiceSlug
  title: string
  subtitle: string
  shortDesc: string
  longDesc: string
  image: string
}

export const SERVICES: ServiceCatalogItem[] = ${JSON.stringify(services, null, 2)}

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<string, ServiceCatalogItem>
`
}

function buildTestimonialsContent() {
    return `/** Generic testimonials generated during industry refactor. Replace with real customer quotes. */
const testimonials = [
  {
    name: 'Kund 1',
    role: 'Privatperson',
    text: '${COPY_PLACEHOLDER}: lägg in ett verkligt kundomdöme för branschen.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    name: 'Kund 2',
    role: 'Företag',
    text: '${COPY_PLACEHOLDER}: lägg in ett verkligt kundomdöme för branschen.',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Kund 3',
    role: 'Bostadsrättsförening',
    text: '${COPY_PLACEHOLDER}: lägg in ett verkligt kundomdöme för branschen.',
    avatar: 'https://i.pravatar.cc/150?img=32'
  }
]

export default testimonials
`
}

function buildServiceLocationData({
    serviceSlug,
    serviceName,
    locationSlug,
    locationName,
    schemaType,
    gbpCategory,
    brandName,
    phoneHref,
    phoneLabel,
    sameAs,
}) {
    const base = {
        serviceSlug,
        serviceName,
        locationName,
        locationSlug,
        schemaType,
        gbpCategory,
        businessName: `${brandName} ${locationName}`,
        businessAddress: {
            streetAddress: COPY_PLACEHOLDER,
            postalCode: COPY_PLACEHOLDER,
            addressLocality: locationName,
            addressRegion: COPY_PLACEHOLDER,
            addressCountry: 'SE',
        },
        sameAs,
        pageTitle: `${serviceName} i ${locationName}`,
        metaTitle: `${gbpCategory} ${locationName} | ${brandName}`,
        metaDesc: `${COPY_PLACEHOLDER}: skriv en unik meta description för ${serviceName.toLowerCase()} i ${locationName}.`,
        heroTitle: `${serviceName} i ${locationName}`,
        heroSubtitle: `${COPY_PLACEHOLDER}: skriv unik lokal hero-text för ${locationName}.`,
        heroImg: IMAGE_PLACEHOLDER,
        phoneHref,
        phoneLabel,
        responseText: 'Svar oftast inom 1 timme på vardagar.',
        features: [
            {
                title: `Erfarenhet inom ${serviceName.toLowerCase()}`,
                desc: `${COPY_PLACEHOLDER}: unik fördel för bransch och tjänst.`,
                icon: 'shield-check',
            },
            {
                title: `Lokal närvaro i ${locationName}`,
                desc: `${COPY_PLACEHOLDER}: lokal trovärdighet och snabb respons.`,
                icon: 'map-pin',
            },
            {
                title: 'Tydlig plan och offert',
                desc: `${COPY_PLACEHOLDER}: beskriv offertprocessen.`,
                icon: 'clock-3',
            },
            {
                title: 'Kvalitet med garanti',
                desc: `${COPY_PLACEHOLDER}: beskriv kvalitetslöfte.`,
                icon: 'check-circle-2',
            },
        ],
        offerings: [
            {
                title: `${serviceName} för privatkunder`,
                desc: `${COPY_PLACEHOLDER}: beskriv vad som ingår.`,
                details: `${COPY_PLACEHOLDER}: skriv detaljer för denna tjänstedel.`,
                highlights: [`${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`],
                img: IMAGE_PLACEHOLDER,
            },
            {
                title: `${serviceName} för företag`,
                desc: `${COPY_PLACEHOLDER}: beskriv vad som ingår.`,
                details: `${COPY_PLACEHOLDER}: skriv detaljer för denna tjänstedel.`,
                highlights: [`${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`],
                img: IMAGE_PLACEHOLDER,
            },
            {
                title: `Service och uppföljning`,
                desc: `${COPY_PLACEHOLDER}: beskriv serviceupplägg.`,
                details: `${COPY_PLACEHOLDER}: skriv detaljer för denna tjänstedel.`,
                highlights: [`${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`, `${COPY_PLACEHOLDER}`],
                img: IMAGE_PLACEHOLDER,
            },
        ],
        localProblems: [
            {
                title: `Vanligt problem i ${locationName}`,
                desc: `${COPY_PLACEHOLDER}: lokalt problem kopplat till tjänsten.`,
            },
            {
                title: 'Bristande planering eller kvalitet',
                desc: `${COPY_PLACEHOLDER}: konkret lokalt scenario.`,
            },
            {
                title: 'Otydliga offerter och leveranser',
                desc: `${COPY_PLACEHOLDER}: beskriv hur ni löser detta bättre.`,
            },
        ],
        process: [
            { title: '1. Behovsanalys', desc: `${COPY_PLACEHOLDER}: beskriv steg 1.` },
            { title: '2. Offert och planering', desc: `${COPY_PLACEHOLDER}: beskriv steg 2.` },
            { title: '3. Utförande', desc: `${COPY_PLACEHOLDER}: beskriv steg 3.` },
            { title: '4. Slutkontroll och överlämning', desc: `${COPY_PLACEHOLDER}: beskriv steg 4.` },
        ],
        caseStudies: [
            {
                title: `${serviceName} – lokalt case`,
                area: locationName,
                challenge: `${COPY_PLACEHOLDER}: utmaning`,
                solution: `${COPY_PLACEHOLDER}: lösning`,
                result: `${COPY_PLACEHOLDER}: resultat`,
                img: IMAGE_PLACEHOLDER,
            },
            {
                title: `${serviceName} – företagscase`,
                area: locationName,
                challenge: `${COPY_PLACEHOLDER}: utmaning`,
                solution: `${COPY_PLACEHOLDER}: lösning`,
                result: `${COPY_PLACEHOLDER}: resultat`,
                img: IMAGE_PLACEHOLDER,
            },
        ],
        priceExamples: [
            {
                title: `${serviceName} baspaket`,
                price: 'Från [ANPASSA PRIS]',
                desc: `${COPY_PLACEHOLDER}: vad ingår och vad påverkar priset.`,
            },
            {
                title: `${serviceName} standard`,
                price: 'Från [ANPASSA PRIS]',
                desc: `${COPY_PLACEHOLDER}: vad ingår och vad påverkar priset.`,
            },
            {
                title: `${serviceName} premium`,
                price: 'Från [ANPASSA PRIS]',
                desc: `${COPY_PLACEHOLDER}: vad ingår och vad påverkar priset.`,
            },
        ],
        areas: [locationName, '[ANPASSA OMRÅDE]', '[ANPASSA OMRÅDE]'],
        reviews: [
            {
                name: 'Kund 1',
                role: `${locationName}`,
                text: `${COPY_PLACEHOLDER}: verkligt kundomdöme.`,
                rating: 5,
            },
            {
                name: 'Kund 2',
                role: `${locationName}`,
                text: `${COPY_PLACEHOLDER}: verkligt kundomdöme.`,
                rating: 5,
            },
            {
                name: 'Kund 3',
                role: `${locationName}`,
                text: `${COPY_PLACEHOLDER}: verkligt kundomdöme.`,
                rating: 5,
            },
        ],
        faq: [
            {
                q: `Vad kostar ${serviceName.toLowerCase()} i ${locationName}?`,
                a: `${COPY_PLACEHOLDER}: lokalt och realistiskt svar.`,
            },
            {
                q: 'Hur snabbt kan ni starta?',
                a: `${COPY_PLACEHOLDER}: svar med realistisk ledtid.`,
            },
            {
                q: 'Vilka områden täcker ni?',
                a: `${COPY_PLACEHOLDER}: svar med lokal täckning.`,
            },
            {
                q: 'Hur fungerar offertprocessen?',
                a: `${COPY_PLACEHOLDER}: stegvis förklaring.`,
            },
        ],
        relatedServices: [],
    }

    return replaceImageFields(base)
}

function printUsage() {
    console.log('Usage:')
    console.log('  npm run workflow:industry-refactor -- --industry taklaggare --service taklaggning --service-name "Takläggning" --location stockholm --location-name "Stockholm"')
    console.log('Optional:')
    console.log('  --industry-singular "takläggare"')
    console.log('  --industry-plural "takarbeten"')
    console.log('  --brand-name "TakPartner Stockholm" --brand-short "TP"')
    console.log('  --domain "takpartner.se" --email "offert@takpartner.se"')
    console.log('  --phone-display "08-123 45 67" --phone-href "tel:+4681234567"')
    console.log('  --gbp-category "Takläggare" --schema-type "RoofingContractor"')
    console.log('  --same-as "https://example.se,https://instagram.com/example"')
    console.log('  --clean-existing-pages true|false')
    console.log('  --force true')
}

async function main() {
    const args = parseArgs(process.argv.slice(2))

    if (args.help === 'true') {
        printUsage()
        process.exit(0)
    }

    const industry = args.industry
    const serviceSlug = args.service
    const locationSlug = args.location

    if (!industry || !serviceSlug || !locationSlug) {
        console.error('Missing required args: --industry --service --location')
        printUsage()
        process.exit(1)
    }

    if (!isSlug(industry) || !isSlug(serviceSlug) || !isSlug(locationSlug)) {
        console.error('Invalid slug format. Use lowercase and hyphens only.')
        process.exit(1)
    }

    const industryName = args['industry-name'] ?? toTitleFromSlug(industry)
    const industrySingular = args['industry-singular'] ?? industryName.toLowerCase()
    const industryPlural = args['industry-plural'] ?? `${industryName.toLowerCase()}tjänster`
    const serviceName = args['service-name'] ?? toTitleFromSlug(serviceSlug)
    const locationName = args['location-name'] ?? toTitleFromSlug(locationSlug)
    const brandName = args['brand-name'] ?? `${industryName} ${locationName}`
    const brandShort = args['brand-short'] ?? toBrandShort(brandName)
    const domain = args.domain ?? 'example.se'
    const email = args.email ?? 'kontakt@example.se'
    const phoneDisplay = args['phone-display'] ?? '010-000 00 00'
    const phoneHref = args['phone-href'] ?? 'tel:+46100000000'
    const gbpCategory = args['gbp-category'] ?? serviceName
    const schemaType = args['schema-type'] ?? 'LocalBusiness'
    const cleanExistingPages = parseBoolean(args['clean-existing-pages'], true)
    const force = parseBoolean(args.force, false)
    const sameAs = (args['same-as'] ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)

    await mkdir(DATA_DIR, { recursive: true })
    await mkdir(WORKFLOW_DIR, { recursive: true })

    const targetPath = path.join(DATA_DIR, `${serviceSlug}__${locationSlug}.json`)

    const existingJsonFiles = (await readdir(DATA_DIR)).filter((file) => file.endsWith('.json'))
    const targetExists = existingJsonFiles.includes(path.basename(targetPath))
    if (targetExists && !force) {
        console.error(`Target file already exists: ${targetPath}`)
        console.error('Pass --force true to overwrite.')
        process.exit(1)
    }

    if (cleanExistingPages) {
        await Promise.all(
            existingJsonFiles
                .filter((file) => path.join(DATA_DIR, file) !== targetPath)
                .map((file) => unlink(path.join(DATA_DIR, file)))
        )
    }

    const siteConfigContent = buildSiteConfigContent({
        brandName,
        brandShort,
        domain,
        phoneDisplay,
        phoneHref,
        email,
    })

    const industryConfigContent = buildIndustryConfigContent({
        industryKey: industry,
        industrySingular,
        industryPlural,
        serviceName,
    })

    const servicesContent = buildServicesContent({
        serviceSlug,
        serviceName,
        industrySingular,
        locationName,
    })

    const pageData = buildServiceLocationData({
        serviceSlug,
        serviceName,
        locationSlug,
        locationName,
        schemaType,
        gbpCategory,
        brandName,
        phoneHref,
        phoneLabel: phoneDisplay,
        sameAs: sameAs.length > 0 ? sameAs : [`https://${domain}`],
    })

    const workflowFile = path.join(WORKFLOW_DIR, `${industry}-${serviceSlug}-${locationSlug}.md`)
    const workflowBody = `# Workflow: ${industryName} (${serviceName} i ${locationName})

Generated: ${new Date().toISOString().slice(0, 10)}

## Kontroll före publicering

1. Byt alla bildfält markerade med \`${IMAGE_PLACEHOLDER}\`.
2. Ersätt all text markerad med \`${COPY_PLACEHOLDER}\`.
3. Verifiera att tjänstebeskrivning, case och FAQ är lokalt unika.
4. Kör \`npm run lint\`.
5. Kör \`npm run build\`.
`

    await Promise.all([
        writeFile(SITE_CONFIG_PATH, siteConfigContent, 'utf-8'),
        writeFile(INDUSTRY_CONFIG_PATH, industryConfigContent, 'utf-8'),
        writeFile(SERVICES_PATH, servicesContent, 'utf-8'),
        writeFile(TESTIMONIALS_PATH, buildTestimonialsContent(), 'utf-8'),
        writeFile(targetPath, `${JSON.stringify(pageData, null, 2)}\n`, 'utf-8'),
        writeFile(workflowFile, workflowBody, 'utf-8'),
    ])

    const onboardingPath = path.join(process.cwd(), 'docs/onboarding.md')
    const onboardingExists = await readFile(onboardingPath, 'utf-8').then(() => true).catch(() => false)

    console.log(`Updated: ${path.relative(process.cwd(), SITE_CONFIG_PATH)}`)
    console.log(`Updated: ${path.relative(process.cwd(), INDUSTRY_CONFIG_PATH)}`)
    console.log(`Updated: ${path.relative(process.cwd(), SERVICES_PATH)}`)
    console.log(`Updated: ${path.relative(process.cwd(), TESTIMONIALS_PATH)}`)
    console.log(`Created: ${path.relative(process.cwd(), targetPath)}`)
    console.log(`Created: ${path.relative(process.cwd(), workflowFile)}`)
    if (onboardingExists) {
        console.log(`Review next: ${path.relative(process.cwd(), onboardingPath)}`)
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
