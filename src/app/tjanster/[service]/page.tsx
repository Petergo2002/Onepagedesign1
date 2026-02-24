import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Zap, CalendarClock, Handshake, ShieldCheck, MapPin } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Image from 'next/image'
import { SERVICES, SERVICE_BY_SLUG, type ServiceSlug } from '@/lib/services'
import { getLocationsForService } from '@/lib/service-location-pages/repository'

function isRenderableImageSrc(src: string | null | undefined): src is string {
    if (!src) return false
    const trimmedSrc = src.trim()
    if (!trimmedSrc || trimmedSrc === '[BYT BILD]') return false
    return trimmedSrc.startsWith('/') || trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')
}

function isVideoSrc(src: string | null | undefined): src is string {
    if (!src) return false
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src.trim())
}

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        service: service.slug,
    }))
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params
    const data = SERVICE_BY_SLUG[service as ServiceSlug]

    if (!data) {
        return notFound()
    }

    const locations = await getLocationsForService(service)
    const heroImageSrc = isRenderableImageSrc(data.image) ? data.image : null
    const heroVideoSrc = isVideoSrc(heroImageSrc) ? heroImageSrc : null

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <NavBar />

            <main className="pt-24 pb-0 bg-slate-950">
                {/* 1. Hero (Premium, Neutral, Conversion-Focused) */}
                <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 lg:pb-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-slate-950">
                        {heroVideoSrc ? (
                            <video
                                src={heroVideoSrc}
                                className="h-full w-full object-cover opacity-60"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                aria-hidden="true"
                            />
                        ) : heroImageSrc ? (
                            <Image src={heroImageSrc} alt={data.title} fill className="object-cover opacity-60" priority sizes="100vw" />
                        ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(27,167,88,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(27,167,88,0.15),transparent_45%)]" />
                        )}
                        <div className="absolute inset-0 bg-slate-950/80 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/90 sm:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <div className="mb-6">
                                <Breadcrumbs />
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-500/20 text-brand-400 mb-6 text-sm font-semibold tracking-wide backdrop-blur-sm border border-brand-500/30">
                                <Zap size={14} />
                                <span className="uppercase">{data.subtitle}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                                {data.title}
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl font-light">
                                {data.longDesc}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link
                                    href="/#offert"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg transition-all shadow-lg shadow-brand-500/25"
                                >
                                    Begär fri offert
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-brand-400 text-brand-400 font-semibold text-lg hover:bg-brand-400 hover:text-white transition-colors shadow-lg shadow-brand-500/10"
                                >
                                    Kontakta oss
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Vad innebär tjänsten? (Pedagogisk) */}
                <section className="py-24 bg-slate-900/50 border-y border-white/5">
                    <div className="container mx-auto max-w-4xl px-4 text-center">
                        <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm block mb-4">Om tjänsten</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">{data.content.introTitle}</h2>
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            {data.content.introText}
                        </p>
                    </div>
                </section>

                {/* 3. Fördelar / Varför välja oss (Grid) */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div className="sticky top-24">
                                <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-3 inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                    Dina fördelar
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
                                    {data.content.benefitsTitle}
                                </h2>
                                <p className="text-lg text-slate-400 leading-relaxed font-light mb-8 max-w-xl">
                                    {data.content.benefitsDesc}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {data.content.benefits.map((feature, i) => {
                                    const IconComp = feature.icon === 'shield-check' ? ShieldCheck :
                                        feature.icon === 'handshake' ? Handshake :
                                            feature.icon === 'calendar-clock' ? CalendarClock : Zap
                                    return (
                                        <div key={i} className="p-8 rounded-xl bg-slate-900/50 backdrop-blur border border-white/5 hover:border-brand-500/30 transition-colors group h-full flex flex-col">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-500/5 flex items-center justify-center mb-6 text-brand-400 border border-brand-500/10 group-hover:bg-brand-500/20 transition-colors">
                                                <IconComp size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-slate-400 leading-relaxed text-sm font-light mt-auto">{feature.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Process (Raffinerad design) */}
                <section className="py-24 bg-slate-900/80 mx-4 md:mx-12 my-12 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="container mx-auto max-w-6xl px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-4 inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                    {data.content.processIntro}
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-[1.15]">{data.content.processTitle}</h2>
                                <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                                    {data.content.processDesc}
                                </p>
                                <div className="space-y-10">
                                    {data.content.process.map((item, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-slate-950 border border-brand-500/30 text-brand-400 font-bold flex items-center justify-center relative z-10 group-hover:bg-brand-500 group-hover:text-white group-hover:border-transparent transition-all shadow-lg shadow-brand-500/0 group-hover:shadow-brand-500/30">
                                                    {i + 1}
                                                </div>
                                                {i !== data.content.process.length - 1 && (
                                                    <div className="w-px h-full bg-white/10 mt-2" />
                                                )}
                                            </div>
                                            <div className="pb-8">
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                                {heroVideoSrc ? (
                                    <video
                                        src={heroVideoSrc}
                                        className="h-full w-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Image
                                        src={heroImageSrc || "/demo-images/bygg-hero.svg"}
                                        alt="Process illustration"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Vad ingår (Uppdaterad hierarki) */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center mb-16">
                            <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-4">Det här ingår</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">{data.content.includedTitle}</h2>
                            <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">{data.content.includedDesc}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {data.content.included.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-xl border border-white/5 hover:border-brand-500/20 transition-colors group">
                                    <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-brand-400" />
                                    </div>
                                    <span className="text-slate-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Expert/Trust */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.04),transparent_45%)]" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto rounded-2xl">
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Ett tryggt val för din bostad</h2>
                                <p className="text-brand-100/80 text-lg font-light">
                                    När du anlitar oss får du alltid fackmannamässigt utfört arbete.
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-8 lg:gap-16">
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{data.content.trustBadgeYears}</div>
                                    <div className="text-brand-200 text-sm font-medium uppercase tracking-wide">Erfarenhet</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{data.content.trustBadgeGuarantee}</div>
                                    <div className="text-brand-200 text-sm font-medium uppercase tracking-wide">Jobb Garanti</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{data.content.trustBadgeSatisfaction}</div>
                                    <div className="text-brand-200 text-sm font-medium uppercase tracking-wide">Kundnöjdhet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Lokala Områden (Router) & Serviceområden (SEO Non-Links) */}
                <section className="py-24 bg-slate-900 border-b border-white/5">
                    <div className="container mx-auto max-w-6xl px-4 space-y-12">

                        {/* 7a. Klickbara dedikerade landningssidor (Spokes) */}
                        <section>
                            <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-3 inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                VÅRA OMRÅDEN
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Populära orter för {data.title.toLowerCase()}
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-2xl font-light">
                                Vi utför uppdrag i och omkring våra huvudetableringar. Klicka på din ort nedan för att se lokala erbjudanden.
                            </p>

                            {locations.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {locations.map((locationPage) => (
                                        <Link
                                            key={locationPage.locationSlug}
                                            href={`/tjanster/${service}/${locationPage.locationSlug}`}
                                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 hover:border-brand-500/50 hover:bg-brand-500/10 transition-all text-slate-300 hover:text-white font-medium group shadow-sm shadow-black/20"
                                        >
                                            <MapPin className="w-4 h-4 mr-2 text-brand-400/70 group-hover:text-brand-400 transition-colors" />
                                            {locationPage.locationName}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-left rounded-xl border border-dashed border-white/20 bg-slate-950/50 p-6 inline-block">
                                    <p className="text-slate-400 text-sm">Tyvärr inga publicerade lokala sidor just nu.</p>
                                </div>
                            )}
                        </section>

                        {/* 7b. Naturligt serviceområde (EJ länkar, endast bred SEO-täckning) */}
                        <section className="bg-slate-950 rounded-2xl p-8 md:p-10 border border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 md:items-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
                            <div className="flex-1 relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    {data.content.locationsIntro}
                                </h3>
                                <p className="text-slate-400 leading-relaxed max-w-2xl font-light">
                                    {data.content.locationsAreaText}
                                </p>
                            </div>
                            <div className="relative z-10 md:text-right shrink-0">
                                <p className="text-white font-medium mb-4 text-sm">Hittade du inte din ort?</p>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                                >
                                    Hör av dig till oss
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </section>
                    </div>
                </section>

                {/* 8. FAQ */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto max-w-3xl px-4">
                        <div className="text-center mb-16">
                            <span className="text-brand-400 font-semibold tracking-wider uppercase text-xs block mb-3 inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                FAQ
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Vanliga Frågor</h2>
                            <p className="text-slate-400 font-light">{data.content.faqIntro}</p>
                        </div>
                        <div className="space-y-4">
                            {data.content.faq.map((faq, i) => (
                                <details key={i} className="group bg-slate-900 border border-white/5 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden hover:border-white/10 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-white md:text-lg">
                                        {faq.q}
                                        <span className="relative flex shrink-0 ml-4 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <span className="absolute bg-brand-400 w-5 h-[2px] top-1/2 -translate-y-1/2 rounded-full transition-transform group-open:rotate-180" />
                                            <span className="absolute bg-brand-400 w-[2px] h-5 left-1/2 -translate-x-1/2 rounded-full transition-transform group-open:rotate-90" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-400 font-light leading-relaxed">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. Avslutande CTA */}
                <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-brand-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-slate-950 to-slate-950" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto border border-white/5 bg-slate-900/80 backdrop-blur-xl p-10 md:p-14 rounded-3xl text-center shadow-2xl">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                {data.content.ctaTitle}
                            </h2>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                {data.content.ctaDesc}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/#offert"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-brand-500 text-white font-bold text-lg hover:bg-brand-400 transition-colors shadow-xl shadow-brand-500/20"
                                >
                                    Få prisförslag nu
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors"
                                >
                                    Till Kontakta Oss
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
