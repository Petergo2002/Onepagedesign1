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
