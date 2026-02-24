export type AppMode = 'mockup' | 'production'

export interface SiteConfig {
  brandName: string
  brandShort: string
  domain: string
  phoneDisplay: string
  phoneHref: string
  email: string
  defaultLocale: string
  legalCompanyName: string
  serviceAreaSummary: string
  contactPage: {
    metadataTitle: string
    metadataDescription: string
    headingTitle: string
    headingDescription: string
    infoDescription: string
    certificationLabel: string
    areaLabel: string
    areaCoverage: string
    areaSubtext: string
    openingHours: string
    openingHoursNote: string
    responseHint: string
  }
  home: {
    stats: Array<{ number: string; label: string }>
    areas: Array<{ id: number; name: string; image: string }>
  }
}

export interface IndustryStat {
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

export type FeatureIconKey =
  | 'shield-check'
  | 'map-pin'
  | 'clock-3'
  | 'check-circle-2'
  | 'zap'
  | 'wrench'
  | 'star'

export interface Feature {
  title: string
  desc: string
  icon: FeatureIconKey
}

export interface Offering {
  title: string
  desc: string
  details: string
  highlights: string[]
  img: string
}

export interface LocalProblem {
  title: string
  desc: string
}

export interface ProcessStep {
  title: string
  desc: string
}

export interface CaseStudy {
  title: string
  area: string
  challenge: string
  solution: string
  result: string
  img: string
}

export interface PriceExample {
  title: string
  price: string
  desc: string
}

export interface Review {
  name: string
  role: string
  text: string
  rating: number
}

export interface FaqItem {
  q: string
  a: string
}

export interface RelatedService {
  title: string
  slug: string
  desc: string
}

export interface BusinessAddress {
  streetAddress: string
  postalCode: string
  addressLocality: string
  addressRegion: string
  addressCountry: string
}

export interface ServiceLocationPageData {
  serviceSlug: string
  serviceName: string
  locationName: string
  locationSlug: string
  schemaType: string
  gbpCategory: string
  businessName: string
  businessAddress: BusinessAddress
  sameAs: string[]
  pageTitle: string
  metaTitle: string
  metaDesc: string
  heroTitle: string
  heroSubtitle: string
  heroImg: string
  phoneHref: string
  phoneLabel: string
  responseText: string
  features: Feature[]
  offerings: Offering[]
  localProblems: LocalProblem[]
  process: ProcessStep[]
  caseStudies: CaseStudy[]
  priceExamples: PriceExample[]
  areas: string[]
  reviews: Review[]
  faq: FaqItem[]
  relatedServices: RelatedService[]
}

export type ServiceSlug = string

export interface ServiceFeature {
  title: string
  desc: string
  icon: 'shield-check' | 'handshake' | 'calendar-clock' | 'zap' | 'users' | 'award'
}

export interface ServiceProcessStep {
  step: string
  title: string
  desc: string
}

export interface ServiceFaqItem {
  q: string
  a: string
}

export interface ServiceContent {
  introTitle: string
  introText: string
  benefitsTitle: string
  benefitsDesc: string
  benefits: ServiceFeature[]
  processIntro: string
  processTitle: string
  processDesc: string
  process: ServiceProcessStep[]
  includedTitle: string
  includedDesc: string
  included: string[]
  trustBadgeYears: string
  trustBadgeGuarantee: string
  trustBadgeSatisfaction: string
  locationsIntro: string
  locationsAreaText: string
  faqIntro: string
  faq: ServiceFaqItem[]
  ctaTitle: string
  ctaDesc: string
}

export interface ServiceCatalogItem {
  slug: ServiceSlug
  title: string
  subtitle: string
  shortDesc: string
  longDesc: string
  image: string
  content: ServiceContent
}

export interface Testimonial {
  text: string
  name: string
  role: string
  avatar: string
}

export interface TemplateProfile {
  id: string
  mode: AppMode
  site: SiteConfig
  industry: IndustryCopy
  services: ServiceCatalogItem[]
  testimonials: Testimonial[]
}
