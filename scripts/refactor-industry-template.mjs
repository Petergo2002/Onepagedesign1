#!/usr/bin/env node

import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

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

function toTitleFromSlug(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function parseBoolean(value, defaultValue = false) {
  if (value == null) return defaultValue
  const normalized = String(value).trim().toLowerCase()
  return normalized === 'true' || normalized === '1' || normalized === 'yes'
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const profile = args.profile || 'default'

  const industry = args.industry || 'hantverk'
  const industrySingular = args['industry-singular'] || industry
  const industryPlural = args['industry-plural'] || `${industry} tjänster`
  const service = args.service || 'tjanst'
  const serviceName = args['service-name'] || toTitleFromSlug(service)
  const location = args.location || 'stockholm'
  const locationName = args['location-name'] || toTitleFromSlug(location)
  const domain = args.domain || 'example.se'
  const brandName = args['brand-name'] || 'Demo Hantverk AB'
  const brandShort = args['brand-short'] || 'DH'
  const email = args.email || 'kontakt@example.se'
  const phoneDisplay = args['phone-display'] || '010-000 00 00'
  const phoneHref = args['phone-href'] || 'tel:+46100000000'
  const gbpCategory = args['gbp-category'] || serviceName
  const schemaType = args['schema-type'] || 'LocalBusiness'
  const cleanExistingPages = parseBoolean(args['clean-existing-pages'], true)

  const profileDir = path.join(process.cwd(), 'profiles', profile)
  const locationsDir = path.join(profileDir, 'locations')
  const sitePath = path.join(profileDir, 'site.ts')
  const industryPath = path.join(profileDir, 'industry.ts')
  const servicesPath = path.join(profileDir, 'services.ts')
  const testimonialsPath = path.join(profileDir, 'testimonials.ts')

  await mkdir(profileDir, { recursive: true })
  await mkdir(locationsDir, { recursive: true })

  if (cleanExistingPages) {
    const files = (await readdir(locationsDir)).filter((f) => f.endsWith('.json'))
    await Promise.all(files.map((file) => unlink(path.join(locationsDir, file))))
  }

  const siteContent = `const site = {
  brandName: ${JSON.stringify(brandName)},
  brandShort: ${JSON.stringify(brandShort)},
  domain: ${JSON.stringify(domain)},
  phoneDisplay: ${JSON.stringify(phoneDisplay)},
  phoneHref: ${JSON.stringify(phoneHref)},
  email: ${JSON.stringify(email)},
  defaultLocale: 'sv_SE',
  legalCompanyName: ${JSON.stringify(`${brandName} AB`)},
  serviceAreaSummary: ${JSON.stringify(`${COPY_PLACEHOLDER}: Ange områden för ${locationName}.`)},
  contactPage: {
    metadataTitle: 'Kontakta oss',
    metadataDescription: 'Kontakta oss för prisförslag, rådgivning eller för att boka platsbesök.',
    headingTitle: 'Kontakta oss',
    headingDescription: ${JSON.stringify(`${COPY_PLACEHOLDER}: Beskriv kontaktflödet för ${industrySingular}.`)},
    infoDescription: ${JSON.stringify(`${COPY_PLACEHOLDER}: Kort beskrivning av ${brandName}.`)},
    certificationLabel: ${JSON.stringify(`${COPY_PLACEHOLDER}: Certifiering/behörighet`)},
    areaLabel: 'Verksamhetsområde',
    areaCoverage: ${JSON.stringify(locationName)},
    areaSubtext: ${JSON.stringify(`${COPY_PLACEHOLDER}: Exempelområden`)},
    openingHours: ${JSON.stringify(`${COPY_PLACEHOLDER}: Mån - Fre 07:00 - 16:00`)},
    openingHoursNote: ${JSON.stringify(`${COPY_PLACEHOLDER}: Helger enligt överenskommelse`)},
    responseHint: ${JSON.stringify(`${COPY_PLACEHOLDER}: Svarstid`)},
  },
  home: {
    stats: [
      { number: '[ANPASSA SIFFRA]', label: 'uppdrag' },
      { number: '[ANPASSA SIFFRA]', label: 'års erfarenhet' },
      { number: '[ANPASSA SIFFRA]', label: 'nöjda kunder' },
      { number: '[ANPASSA SIFFRA]', label: 'garanti' }
    ],
    areas: [
      { id: 1, name: ${JSON.stringify(locationName)}, image: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?q=80&w=2070&auto=format&fit=crop' }
    ]
  }
}

export default site
`

  const industryContent = `const industry = {
  key: ${JSON.stringify(industry)},
  singularLabel: ${JSON.stringify(industrySingular)},
  pluralLabel: ${JSON.stringify(industryPlural)},
  hero: {
    badge: ${JSON.stringify(`${industrySingular.toUpperCase()} I ${locationName.toUpperCase()}`)},
    titleLead: 'Vi levererar',
    titleAccent: ${JSON.stringify(`${serviceName.toLowerCase()} med kvalitet`)},
    description: ${JSON.stringify(`${COPY_PLACEHOLDER}: unik hero-copy`)},
  },
  services: {
    badge: 'VÅRA TJÄNSTER',
    titleLead: ${JSON.stringify(`${industryPlural} med`)},
    titleAccent: 'precision och trygghet',
    description: ${JSON.stringify(`${COPY_PLACEHOLDER}: beskriv erbjudandet`)},
  },
  servicesLanding: {
    title: ${JSON.stringify(`${industryPlural} för privatpersoner och företag`)},
    description: 'Välj en tjänst nedan för att läsa mer.',
  },
  about: {
    badge: 'VÅRT UPPDRAG',
    titleLead: ${JSON.stringify(serviceName)},
    titleAccent: 'med fokus på kvalitet',
    description: ${JSON.stringify(`${COPY_PLACEHOLDER}: erfarenhet och arbetssätt`)},
    cards: [
      { title: 'Expertis', description: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'zap' },
      { title: 'Kundfokus', description: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'users' },
      { title: 'Kvalitet', description: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'award' }
    ],
    visionTitle: 'Vår vision',
    visionText: ${JSON.stringify(`${COPY_PLACEHOLDER}: vision`)},
    stats: [
      { value: '10+', label: 'års erfarenhet' },
      { value: '500+', label: 'uppdrag' },
      { value: '100%', label: 'kvalitetsfokus' }
    ]
  },
  contact: {
    intro: 'Berätta om ditt behov så återkommer vi snabbt.',
    messagePlaceholder: ${JSON.stringify(`Beskriv ditt behov inom ${serviceName.toLowerCase()}...`)},
    reasonsTitle: 'Varför välja oss?',
    reasons: ['Fast pris och tydlig plan', 'Erfarna specialister', 'Trygg kommunikation', 'Nöjd-kund-garanti'],
    responsePromise: 'Vi svarar normalt inom 24 timmar.'
  },
  footer: {
    description: ${JSON.stringify(`${COPY_PLACEHOLDER}: kort företagsbeskrivning`)},
    ctaTitle: ${JSON.stringify(`Behöver du hjälp inom ${industrySingular}?`)},
    ctaText: 'Skicka en offertförfrågan så hör vi av oss snabbt.'
  },
  seo: {
    titleSuffix: ${JSON.stringify(`${serviceName} i hela Sverige`)},
    description: ${JSON.stringify(`${brandName} hjälper privatpersoner och företag med ${industryPlural}.`)},
    keywords: [${JSON.stringify(industrySingular)}, ${JSON.stringify(serviceName.toLowerCase())}, 'offert', 'lokala tjänster']
  }
}

export default industry
`

  const servicesContent = `const services = [
  {
    slug: ${JSON.stringify(service)},
    title: ${JSON.stringify(serviceName)},
    subtitle: ${JSON.stringify(`Lokal ${industrySingular}`)},
    shortDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}: kort tjänstebeskrivning`)},
    longDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}: lång tjänstebeskrivning`)},
    image: ${JSON.stringify(IMAGE_PLACEHOLDER)},
    content: {
      introTitle: ${JSON.stringify(`Vad innebär ${serviceName.toLowerCase()}?`)},
      introText: ${JSON.stringify(`${COPY_PLACEHOLDER}: intro`)},
      benefitsTitle: ${JSON.stringify(`Varför välja oss för ${serviceName.toLowerCase()}?`)},
      benefitsDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}: benefit-intro`)},
      benefits: [
        { title: 'Auktoriserade utövare', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'shield-check' },
        { title: 'Totalentreprenad', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'handshake' },
        { title: 'Fast pris & tidsplan', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}, icon: 'calendar-clock' }
      ],
      processIntro: 'Vår arbetsmetod',
      processTitle: 'Så går ditt projekt till',
      processDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)},
      process: [
        { step: '01', title: 'Platsbesök', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)} },
        { step: '02', title: 'Offert', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)} },
        { step: '03', title: 'Utförande', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)} },
        { step: '04', title: 'Slutkontroll', desc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)} }
      ],
      includedTitle: 'Detta ingår',
      includedDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)},
      included: [${JSON.stringify(`${COPY_PLACEHOLDER}`)}, ${JSON.stringify(`${COPY_PLACEHOLDER}`)}],
      trustBadgeYears: '10+',
      trustBadgeGuarantee: '5 år',
      trustBadgeSatisfaction: '100%',
      locationsIntro: 'Vi jobbar även i',
      locationsAreaText: ${JSON.stringify(`${COPY_PLACEHOLDER}`)},
      faqIntro: 'Hittar du inte svaret? Kontakta oss.',
      faq: [{ q: 'Vanlig fråga?', a: ${JSON.stringify(`${COPY_PLACEHOLDER}`)} }],
      ctaTitle: 'Redo att starta?',
      ctaDesc: ${JSON.stringify(`${COPY_PLACEHOLDER}`)}
    }
  }
]

export default services
`

  const testimonialsContent = `const testimonials = [
  { name: 'Kund 1', role: 'Privatperson', text: ${JSON.stringify(`${COPY_PLACEHOLDER}: verkligt omdöme`)}, avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Kund 2', role: 'Företag', text: ${JSON.stringify(`${COPY_PLACEHOLDER}: verkligt omdöme`)}, avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Kund 3', role: 'BRF', text: ${JSON.stringify(`${COPY_PLACEHOLDER}: verkligt omdöme`)}, avatar: 'https://i.pravatar.cc/150?img=32' }
]

export default testimonials
`

  const locationJson = {
    serviceSlug: service,
    serviceName,
    locationName,
    locationSlug: location,
    schemaType,
    gbpCategory,
    businessName: brandName,
    businessAddress: {
      streetAddress: COPY_PLACEHOLDER,
      postalCode: COPY_PLACEHOLDER,
      addressLocality: locationName,
      addressRegion: COPY_PLACEHOLDER,
      addressCountry: 'SE',
    },
    sameAs: [`https://${domain}`],
    pageTitle: `${serviceName} i ${locationName}`,
    metaTitle: `${gbpCategory} ${locationName} | ${brandName}`,
    metaDesc: `${COPY_PLACEHOLDER}: unik meta description för ${locationName}`,
    heroTitle: `${serviceName} i ${locationName}`,
    heroSubtitle: `${COPY_PLACEHOLDER}: unik lokal hero-copy`,
    heroImg: IMAGE_PLACEHOLDER,
    phoneHref,
    phoneLabel: phoneDisplay,
    responseText: `${COPY_PLACEHOLDER}: svarstid`,
    features: [{ title: 'Lokal närvaro', desc: COPY_PLACEHOLDER, icon: 'map-pin' }],
    offerings: [{ title: `${serviceName} för privatkunder`, desc: COPY_PLACEHOLDER, details: COPY_PLACEHOLDER, highlights: [COPY_PLACEHOLDER], img: IMAGE_PLACEHOLDER }],
    localProblems: [{ title: `Vanligt problem i ${locationName}`, desc: COPY_PLACEHOLDER }],
    process: [{ title: '1. Behovsanalys', desc: COPY_PLACEHOLDER }],
    caseStudies: [{ title: `Case i ${locationName}`, area: locationName, challenge: COPY_PLACEHOLDER, solution: COPY_PLACEHOLDER, result: COPY_PLACEHOLDER, img: IMAGE_PLACEHOLDER }],
    priceExamples: [{ title: 'Prisexempel', price: 'Från [ANPASSA PRIS]', desc: COPY_PLACEHOLDER }],
    areas: [locationName],
    reviews: [{ name: 'Kund 1', role: locationName, text: COPY_PLACEHOLDER, rating: 5 }],
    faq: [{ q: `Vad kostar ${serviceName.toLowerCase()}?`, a: COPY_PLACEHOLDER }],
    relatedServices: [{ title: 'Relaterad tjänst', slug: service, desc: COPY_PLACEHOLDER }]
  }

  await writeFile(sitePath, siteContent, 'utf-8')
  await writeFile(industryPath, industryContent, 'utf-8')
  await writeFile(servicesPath, servicesContent, 'utf-8')
  await writeFile(testimonialsPath, testimonialsContent, 'utf-8')
  await writeFile(path.join(locationsDir, `${service}__${location}.json`), `${JSON.stringify(locationJson, null, 2)}\n`, 'utf-8')

  console.log(`Updated profile: profiles/${profile}`)
  console.log(`Created location page: profiles/${profile}/locations/${service}__${location}.json`)
  console.log('Next: follow docs/workflows/industry-switch.md')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
