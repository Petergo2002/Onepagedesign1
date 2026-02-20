import type { Metadata } from 'next'
import type { ElementType } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Star, Wrench, Zap, MapPin, Clock3 } from 'lucide-react'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import { getServiceLocationPage, getServiceLocationStaticParams } from '@/lib/service-location-pages/repository'
import type { FeatureIconKey } from '@/lib/service-location-pages/types'
import { siteConfig, toAbsoluteUrl } from '@/config/site'
import { ServiceHero } from '@/components/service-page/Hero'
import { ProcessSteps } from '@/components/service-page/ProcessSteps'
import { StickyMobileCTA } from '@/components/service-page/StickyMobileCTA'

const IMAGE_PLACEHOLDER = '[BYT BILD]'

function isRenderableImageSrc(src: string | null | undefined): src is string {
    if (!src) {
        return false
    }

    const trimmedSrc = src.trim()
    if (!trimmedSrc || trimmedSrc === IMAGE_PLACEHOLDER) {
        return false
    }

    return trimmedSrc.startsWith('/') || trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')
}

export async function generateStaticParams() {
    return getServiceLocationStaticParams()
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }): Promise<Metadata> {
    const { service, location } = await params
    const data = await getServiceLocationPage(service, location)

    if (!data) {
        return {
            title: 'Sidan hittades inte',
            description: 'Den här sidan finns inte.',
        }
    }

    const canonicalPath = `/tjanster/${service}/${location}`
    const gbpCategory = data.gbpCategory?.trim() || data.serviceName
    const locationIntentTitle = `${gbpCategory} ${data.locationName}`
    const heroImage = isRenderableImageSrc(data.heroImg) ? data.heroImg : undefined

    return {
        title: `${locationIntentTitle} | ${siteConfig.brandName}`,
        description: data.metaDesc,
        alternates: { canonical: canonicalPath },
        keywords: [
            `${gbpCategory.toLowerCase()} ${data.locationName.toLowerCase()}`,
            `${data.serviceName.toLowerCase()} ${data.locationName.toLowerCase()}`,
            `${data.serviceName.toLowerCase()} pris ${data.locationName.toLowerCase()}`,
        ],
        openGraph: {
            title: `${locationIntentTitle} | ${siteConfig.brandName}`,
            description: data.metaDesc,
            url: toAbsoluteUrl(canonicalPath),
            images: heroImage ? [heroImage] : undefined,
            locale: siteConfig.defaultLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${locationIntentTitle} | ${siteConfig.brandName}`,
            description: data.metaDesc,
            images: heroImage ? [heroImage] : undefined,
        },
    }
}

export default async function LocationPage({ params }: { params: Promise<{ service: string; location: string }> }) {
    const { service, location } = await params
    const data = await getServiceLocationPage(service, location)

    if (!data) {
        notFound()
    }

    const pageUrl = toAbsoluteUrl(`/tjanster/${service}/${location}`)
    const serviceUrl = toAbsoluteUrl(`/tjanster/${service}`)
    const heroImageSrc = isRenderableImageSrc(data.heroImg) ? data.heroImg : null

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Hem', item: toAbsoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Tjänster', item: toAbsoluteUrl('/tjanster') },
            { '@type': 'ListItem', position: 3, name: data.serviceName, item: serviceUrl },
            { '@type': 'ListItem', position: 4, name: `${data.serviceName} ${data.locationName}`, item: pageUrl },
        ],
    }

    const localBusinessLd = {
        '@context': 'https://schema.org',
        '@type': data.schemaType || 'LocalBusiness',
        name: data.businessName || `${siteConfig.brandName} ${data.locationName}`,
        ...(heroImageSrc ? { image: heroImageSrc } : {}),
        description: data.metaDesc,
        areaServed: data.areas.map((area) => ({
            '@type': 'City',
            name: `${area}, ${data.locationName}`,
        })),
        address: {
            '@type': 'PostalAddress',
            streetAddress: data.businessAddress?.streetAddress || '',
            postalCode: data.businessAddress?.postalCode || '',
            addressLocality: data.businessAddress?.addressLocality || data.locationName,
            addressRegion: data.businessAddress?.addressRegion || '',
            addressCountry: data.businessAddress?.addressCountry || 'SE',
        },
        telephone: siteConfig.phoneHref.replace('tel:', ''),
        priceRange: '$$',
        sameAs: data.sameAs,
        url: pageUrl,
    }

    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: data.serviceName,
        name: data.pageTitle,
        description: data.metaDesc,
        areaServed: {
            '@type': 'City',
            name: data.locationName,
        },
        provider: {
            '@type': 'Organization',
            name: siteConfig.brandName,
            url: toAbsoluteUrl('/'),
        },
    }

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <NavBar />

            <main>
                <ServiceHero
                    title={data.heroTitle}
                    subtitle={data.heroSubtitle}
                    location={data.locationName}
                    service={data.serviceName}
                    imageSrc={heroImageSrc}
                    phoneHref={data.phoneHref}
                    phoneLabel={data.phoneLabel}
                    responseText={data.responseText}
                />

                {/* Lokal Förankring / Konvertering */}
                <section className="relative z-20 py-20 bg-slate-900/90 backdrop-blur border-y border-white/5 lg:-mt-10">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
                        <div>
                            <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Lokal Närvaro</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Din lokala partner för {data.serviceName.toLowerCase()} i {data.locationName}</h2>
                            <p className="text-slate-300 md:text-lg mb-7 leading-relaxed font-light">
                                Du kan anlita oss för {data.serviceName.toLowerCase()} i hela stadsområdet. Som din lokala byggexpert i {data.locationName} kan vi snabbt vara på plats och säkerställa en nära ock personlig kontakt genom hela projektet.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-8">
                                {data.areas.slice(0, 6).map((area) => (
                                    <div key={area} className="inline-flex items-center gap-2 text-slate-300">
                                        <CheckCircle2 size={16} className="text-brand-400" />
                                        <span>{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 shadow-2xl">
                            <h3 className="text-2xl font-semibold mb-4 text-white">Behöver du hjälp snabbt?</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Vi svarar snabbt på förfrågningar och kan ofta boka in ett förutsättningslöst platsbesök inom kort i {data.locationName} med omnejd för att ge dig ett fast pris.
                            </p>
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/#offert"
                                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors shadow-lg"
                                >
                                    Begär fri offert i {data.locationName}
                                    <ArrowRight size={18} />
                                </Link>
                                <a
                                    href={data.phoneHref}
                                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
                                >
                                    <Phone size={18} className="text-brand-400" />
                                    Ringoss på {data.phoneLabel}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Huvudtjänsten kortfattat via processen */}
                <div className="pt-20 bg-slate-950">
                    <div className="container mx-auto px-4 text-center max-w-3xl mb-12">
                        <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Vår arbetsmetod</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Så här fungerar {data.serviceName.toLowerCase()}</h2>
                        <p className="text-slate-400">Vi följer en strikt kvalitetssäkrad process för alla bygg- och renoveringsprojekt i {data.locationName}.</p>
                    </div>
                    <ProcessSteps steps={data.process} />
                </div>

                {/* Social Proof */}
                <section className="py-20 bg-slate-900/50 border-y border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Kundomdömen</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vad kunder i {data.locationName} säger</h2>
                            <p className="text-slate-400">Riktiga omdömen från grannar som anlitat oss för {data.serviceName.toLowerCase()} i {data.locationName}.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {data.reviews.slice(0, 3).map((review) => (
                                <article key={review.name} className="rounded-2xl border border-white/10 bg-slate-900 p-8 hover:border-brand-500/30 transition-colors">
                                    <div className="flex items-center gap-1 mb-4">
                                        {Array.from({ length: review.rating }).map((_, idx) => (
                                            <Star key={`${review.name}-${idx}`} size={16} className="text-brand-400 fill-brand-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 leading-relaxed mb-6 font-light">&quot;{review.text}&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-semibold text-white">{review.name}</p>
                                            <p className="text-slate-400">{review.role}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Localized */}
                <section className="py-20 bg-slate-950">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">FAQ</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vanliga frågor om {data.serviceName.toLowerCase()} i {data.locationName}</h2>
                        </div>

                        <div className="space-y-4">
                            {data.faq.map((item) => (
                                <article key={item.q} className="rounded-xl border border-white/10 bg-slate-900 p-6">
                                    <h3 className="text-lg font-semibold mb-3 inline-flex items-start gap-3 text-white">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                                        {item.q}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed pl-5">{item.a}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Avslutande Lokal CTA */}
                <section className="py-24 bg-brand-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Behöver du {data.serviceName.toLowerCase()} i {data.locationName}?</h2>
                        <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
                            Skicka en förfrågan så återkommer vi med en tydlig plan och offert för just ditt projekt.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/#offert"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-brand-900 font-bold hover:bg-slate-100 transition-colors shadow-2xl"
                            >
                                Få prisförslag nu
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href={data.phoneHref}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-colors backdrop-blur-md"
                            >
                                <Phone size={18} />
                                Ring oss
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <StickyMobileCTA phoneHref={data.phoneHref} phoneLabel={data.phoneLabel} />
        </div>
    )
}
