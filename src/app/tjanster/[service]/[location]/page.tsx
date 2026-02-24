import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Star } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getServiceLocationPage, getServiceLocationStaticParams } from '@/lib/service-location-pages/repository'
import { siteConfig, toAbsoluteUrl } from '@/config/site'
import { ServiceHero } from '@/components/service-page/Hero'
import { ProcessSteps } from '@/components/service-page/ProcessSteps'
import { StickyMobileCTA } from '@/components/service-page/StickyMobileCTA'
import { ServiceGrid } from '@/components/service-page/ServiceGrid'
import { LocalProblems } from '@/components/service-page/LocalProblems'
import { CaseStudies } from '@/components/service-page/CaseStudies'
import { PricingTable } from '@/components/service-page/PricingTable'
import { getAppMode } from '@/lib/template/profile'

const IMAGE_PLACEHOLDER = '[BYT BILD]'

function isRenderableImageSrc(src: string | null | undefined): src is string {
  if (!src) return false
  const trimmedSrc = src.trim()
  if (!trimmedSrc || trimmedSrc === IMAGE_PLACEHOLDER) return false
  return trimmedSrc.startsWith('/') || trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')
}

function isVideoSrc(src: string | null | undefined): src is string {
  if (!src) return false
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src.trim())
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
  const heroImage = isRenderableImageSrc(data.heroImg) && !isVideoSrc(data.heroImg) ? data.heroImg : undefined

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

  const isMockup = getAppMode() === 'mockup'
  const pageUrl = toAbsoluteUrl(`/tjanster/${service}/${location}`)
  const serviceUrl = toAbsoluteUrl(`/tjanster/${service}`)
  const heroImageSrc = isRenderableImageSrc(data.heroImg) ? data.heroImg : null
  const heroPreviewImage = heroImageSrc && !isVideoSrc(heroImageSrc) ? heroImageSrc : null

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
    ...(heroPreviewImage ? { image: heroPreviewImage } : {}),
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
        {isMockup ? (
          <div className="pt-24">
            <div className="container mx-auto px-4">
              <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                Mockup-läge: innehåll med placeholders visas för snabb förhandsgranskning.
              </div>
            </div>
          </div>
        ) : null}

        <ServiceHero
          title={data.heroTitle}
          subtitle={data.heroSubtitle}
          location={data.locationName}
          service={data.serviceName}
          serviceSlug={data.serviceSlug}
          imageSrc={heroImageSrc}
          phoneHref={data.phoneHref}
          phoneLabel={data.phoneLabel}
        />

        {/* Trust/Expertise Grid Section */}
        <section className="relative z-20 py-16 bg-slate-950 lg:-mt-16">
          <div className="container mx-auto px-4 gap-8">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Card 1 */}
              <div className="bg-slate-900 rounded-xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-brand-500/30 transition-colors h-full flex flex-col justify-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-500/5 flex items-center justify-center mb-6 text-brand-400 border border-brand-500/10">
                  <Star size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Certifierad expertis</h3>
                <p className="text-slate-400 leading-relaxed font-light text-lg">
                  Professionellt utbildade tekniker med erfarenhet av alla stora {data.serviceName.toLowerCase()}svarumärken och modeller.
                </p>
              </div>

              {/* Text Block */}
              <div className="py-4 lg:px-6 h-full flex flex-col justify-center">
                <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-3 inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  Varför välja oss
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white leading-[1.15]">
                  Varför fastighetsägare litar på våra experter
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
                  Lokala yrkesmän. Beprövade metoder. En servicekvalitet du kan lita på varje gång för {data.serviceName.toLowerCase()}.
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  {data.areas.slice(0, 4).map((area, areaIndex) => (
                    <div key={`${area}-${areaIndex}`} className="inline-flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                      <span className="truncate">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacked Cards */}
              <div className="flex flex-col gap-6">
                <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-white/5 hover:border-brand-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 text-brand-400">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Lokalt Förankrad</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Nätverk med certifierade lokala experter som täcker hela regionen, redo med kort varsel.
                  </p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-white/5 hover:border-brand-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 text-brand-400">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Pålitliga Reparationer</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Högkvalitativa reservdelar och beprövade lösningar byggda för långsiktig prestanda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Action Bar */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.04),transparent_45%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto rounded-2xl">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Akut behov av hjälp i {data.locationName}?
                </h2>
                <p className="text-brand-100/80 text-lg md:text-xl font-light">
                  Lokala tekniker tillgängliga för snabba insatser och service dygnet runt.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Link href="/#offert" className="flex items-center justify-center gap-3 px-8 py-5 rounded-lg bg-brand-500 hover:bg-brand-400 text-white font-bold text-lg transition-all shadow-xl shadow-brand-900/50 w-full">
                  Se Tillgänglighet / Boka Nu
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Split Section */}
        <section className="py-24 bg-slate-950 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-[1.15]">
                  Varför fastighetsägare väljer våra yrkesmän
                </h2>
                <div className="space-y-6">
                  {data.features.map((feature) => (
                    <div key={feature.title} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-1 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                        <CheckCircle2 size={12} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm font-light">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-slate-900/80 p-8 rounded-xl border border-white/5 text-center flex flex-col justify-center min-h-[160px] lg:min-h-[200px]">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-2">100+</div>
                  <div className="text-slate-400 text-sm font-medium">Genomförda Projekt</div>
                </div>
                <div className="bg-slate-900/80 p-8 rounded-xl border border-white/5 text-center flex flex-col justify-center min-h-[160px] lg:min-h-[200px]">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-2">24/7</div>
                  <div className="text-slate-400 text-sm font-medium">Jour & Support</div>
                </div>
                <div className="bg-slate-900/80 p-8 rounded-xl border border-white/5 text-center flex flex-col justify-center min-h-[160px] lg:min-h-[200px]">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-2">100%</div>
                  <div className="text-slate-400 text-sm font-medium">Nöjd-kund Garanti</div>
                </div>
                <div className="bg-brand-900/40 p-8 rounded-xl border border-brand-500/30 text-center flex flex-col justify-center min-h-[160px] lg:min-h-[200px]">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">Snabb</div>
                  <div className="text-brand-200 text-sm font-medium">Inställelsetid</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceGrid offerings={data.offerings} serviceName={data.serviceName} locationName={data.locationName} />
        <LocalProblems problems={data.localProblems} serviceName={data.serviceName} locationName={data.locationName} />
        <ProcessSteps steps={data.process} />
        <CaseStudies cases={data.caseStudies} serviceName={data.serviceName} locationName={data.locationName} />
        <PricingTable priceExamples={data.priceExamples} locationName={data.locationName} />

        <section className="py-20 bg-slate-900/50 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Kundomdömen</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vad kunder i {data.locationName} säger</h2>
              <p className="text-slate-400">Riktiga omdömen från kunder som anlitat oss för {data.serviceName.toLowerCase()} i {data.locationName}.</p>
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
                    <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">{review.name.charAt(0)}</div>
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

        <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Relaterade tjänster</span>
              <h2 className="text-3xl md:text-4xl font-bold">Upptäck fler tjänster</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.relatedServices.map((related) => (
                <Link
                  key={`${related.slug}-${related.title}`}
                  href={`/tjanster/${related.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-6 hover:border-brand-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{related.title}</h3>
                  <p className="text-slate-400">{related.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-brand-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-slate-950 to-slate-950" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto border border-white/5 bg-slate-900/80 backdrop-blur-xl p-10 md:p-14 rounded-3xl text-center shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                24/7 {data.serviceName.toLowerCase()} <span className="block md:inline text-brand-400">— snabb lokal service</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                Skicka en offertförfrågan eller ring oss direkt för att få snabb hjälp av pålitliga tekniker i {data.locationName}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#offert" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-brand-500 text-white font-bold text-lg hover:bg-brand-400 transition-colors shadow-xl shadow-brand-500/20">
                  Få prisförslag nu
                  <ArrowRight size={20} />
                </Link>
                <a href={data.phoneHref} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors">
                  <Phone size={20} className="text-brand-400" />
                  Ring oss på {data.phoneLabel}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm font-medium text-slate-400 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-400" />
                  <span>Certifierad personal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-400" />
                  <span>Bra garantier</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-400" />
                  <span>Lokal service</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA phoneHref={data.phoneHref} />
    </div>
  )
}
