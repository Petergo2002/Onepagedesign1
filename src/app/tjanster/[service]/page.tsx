import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Zap, MapPin, ShieldCheck, Handshake, CalendarClock } from 'lucide-react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'
import Image from 'next/image'
import { SERVICES, SERVICE_BY_SLUG, type ServiceSlug } from '@/lib/services'
import { getLocationsForService } from '@/lib/service-location-pages/repository'

function isRenderableImageSrc(src: string | null | undefined): src is string {
    if (!src) return false
    const trimmedSrc = src.trim()
    if (!trimmedSrc || trimmedSrc === '[BYT BILD]') return false
    return trimmedSrc.startsWith('/') || trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')
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

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <NavBar />

            <main className="pt-24 pb-0 bg-slate-950">
                {/* 1. Hero (Premium, Neutral, Conversion-Focused) */}
                <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-slate-950">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-slate-950 to-slate-950" />
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full" />
                    </div>

                    <div className="container mx-auto max-w-6xl">
                        <Breadcrumbs />

                        <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-brand-500/10 text-brand-300 mb-8 border border-brand-500/20">
                                    <Zap size={16} />
                                    <span className="uppercase tracking-wider">{data.subtitle}</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white tracking-tight">
                                    {data.title}
                                </h1>

                                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10 font-light">
                                    {data.longDesc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/#offert"
                                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                                    >
                                        Begär fri offert
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/kontakt"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-colors border border-white/10"
                                    >
                                        Kontakta oss
                                    </Link>
                                </div>
                            </div>

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] group">
                                {heroImageSrc ? (
                                    <Image
                                        src={heroImageSrc}
                                        alt={data.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-slate-800" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. NY: Vad innebär tjänsten? (Pedagogisk) */}
                <section className="py-24 bg-slate-900/50 border-y border-white/5">
                    <div className="container mx-auto max-w-4xl px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Vad innebär {data.title.toLowerCase()}?</h2>
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            Att genomföra en {data.title.toLowerCase()} är ett omfattande projekt som kräver noggrann planering, rätt kompetens och ett strukturerat utförande.
                            Vi tar ett helhetsansvar (totalentreprenad) där vi samordnar alla involverade hantverkare – från snickare och målare till behöriga elektriker och VVS-montörer.
                            Genom att ha en och samma kontaktperson genom hela byggtiden garanterar vi ett smidigt, tidseffektivt och tryggt resultat.
                        </p>
                    </div>
                </section>

                {/* 3. Fördelar / Varför välja oss (Grid) */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm block mb-4">Dina fördelar</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Varför anlita oss för din {data.title.toLowerCase()}?</h2>
                            <p className="text-lg text-slate-400">Vi bygger långsiktiga relationer genom transparens, skickligt hantverk och tydliga avtal.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'Auktoriserade Hantverkare', desc: 'Vi innehar alla nödvändiga behörigheter och branschcertifikat, vilket garanterar att arbetet utförs säkert och fackmannamässigt.', icon: ShieldCheck },
                                { title: 'Totalentreprenad', desc: 'Slipp agera projektledare. Vi sköter all samordning, planering och utförande så du kan luta dig tillbaka.', icon: Handshake },
                                { title: 'Fast Pris & Tidsplan', desc: 'Du får alltid en tydlig offert med ett fast pris utan dolda kostnader, samt en realistisk tidplan vi håller oss till.', icon: CalendarClock },
                            ].map((feature, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-brand-500/30 transition-colors">
                                    <div className="mb-6">
                                        <feature.icon className="w-10 h-10 text-brand-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed md:text-lg font-light">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Process (Raffinerad design) */}
                <section className="py-24 bg-slate-900 rounded-[3rem] mx-4 md:mx-12 my-12 border border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="container mx-auto max-w-6xl px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm block mb-4">Vår Arbetsmetod</span>
                                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Så går ditt projekt till</h2>
                                <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light">
                                    En framgångsrik {data.title.toLowerCase()} bygger på struktur. Från första idémötet till slutbesiktningen säkerställer vår beprövade process att allt flyter på utan obehagliga överraskningar.
                                </p>
                                <div className="space-y-10">
                                    {[
                                        { step: '01', title: 'Kostnadsfritt hembesök', desc: 'Vi kommer ut till dig, lyssnar på dina visioner, inspekterar förutsättningarna och bollar idéer.' },
                                        { step: '02', title: 'Detaljerad Offert', desc: 'Inom kort återkommer vi med en utförlig offert där allt material, arbetskostnad (inkl. ROT) och tidsram framgår.' },
                                        { step: '03', title: 'Byggstart & Utförande', desc: 'Projektet startar enligt plan. Vi håller dig löpande uppdaterad om framstegen och säkerställer ett städat bygge.' },
                                        { step: '04', title: 'Slutbesiktning & Överlämning', desc: 'Vi går tillsammans igenom arbetet. När du är 100% nöjd överlämnar vi alla relevanta kvalitetsdokument.' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="text-brand-500/50 group-hover:text-brand-400 font-bold text-2xl transition-colors">{item.step}</div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-slate-400 font-light">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop"
                                    alt="Byggprocess illustration"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Vad ingår (Uppdaterad hierarki) */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Full service vid {data.title.toLowerCase()}</h2>
                            <p className="text-lg text-slate-400">Vi skräddarsyr alltid leveransen, men ett typiskt projekt hos oss innefattar följande delmoment:</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                'Kostnadsfri konsultation & rådgivning',
                                'Projektledning och samordning av yrkesgrupper',
                                'Hantering av ROT-avdrag direkt på fakturan',
                                'Kvalitativa materialinköp via etablerade grossister',
                                'Skyddstäckning, rivning och dammhantering',
                                'Bortforsling av byggstäd och miljösortering',
                                'Kvalitetsdokument, våtrumsintyg och garantibevis',
                                'Slutbesiktning av oberoende besiktningsman vid behov'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-white/5 hover:border-brand-500/20 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-400" />
                                    </div>
                                    <span className="text-slate-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Expert/Trust */}
                <section className="py-24 bg-brand-900 relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ett tryggt val för din bostad</h2>
                        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">10+</div>
                                <div className="text-white/80 font-medium">Års Erfarenhet</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">5 år</div>
                                <div className="text-white/80 font-medium">Garanti på Arbete</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">100%</div>
                                <div className="text-white/80 font-medium">Nöjd-Kund Garanti</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Lokala Områden (Router) & Serviceområden (SEO Non-Links) */}
                <section className="py-24 bg-slate-900 border-b border-white/5">
                    <div className="container mx-auto max-w-6xl px-4 space-y-12">

                        {/* 7a. Klickbara dedikerade landningssidor (Spokes) */}
                        <section>
                            <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm block mb-4">LOKALA TJÄNSTER</span>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Populära orter för {data.title.toLowerCase()}
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-2xl font-light">
                                Vi utför de flesta av våra fackmannamässiga uppdrag i och runt våra huvudetableringar. Välj din ort nedan för att läsa mer om hur vi arbetar lokalt nära dig.
                            </p>

                            {locations.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {locations.map((locationPage) => (
                                        <Link
                                            key={locationPage.locationSlug}
                                            href={`/tjanster/${service}/${locationPage.locationSlug}`}
                                            className="inline-flex items-center px-6 py-3 rounded-full bg-slate-950 border border-white/10 hover:border-brand-500/50 hover:bg-brand-500/10 transition-all text-white font-medium group"
                                        >
                                            <MapPin className="w-4 h-4 mr-2 text-brand-400 group-hover:scale-110 transition-transform" />
                                            {locationPage.locationName}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-left rounded-2xl border border-dashed border-white/20 bg-slate-950/50 p-6 inline-block">
                                    <p className="text-slate-400 text-sm">Tyvärr inga publicerade lokala sidor just nu.</p>
                                </div>
                            )}
                        </section>

                        {/* 7b. Naturligt serviceområde (EJ länkar, endast bred SEO-täckning) */}
                        <section className="bg-slate-950 rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 md:items-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
                            <div className="flex-1 relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                    Vi jobbar även i
                                </h3>
                                <p className="text-slate-400 leading-relaxed max-w-2xl font-light">
                                    Vi utgår från Alingsås och hjälper kunder med fackmannamässigt hantverk i hela närområdet. Utöver våra huvudorter utför vi även {data.title.toLowerCase()} i exempelvis Lerum, Vårgårda, Herrljunga, Partille och närliggande områden.
                                </p>
                            </div>
                            <div className="relative z-10 md:text-right shrink-0">
                                <p className="text-white font-medium mb-4">Ligger din ort utanför listan?</p>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors"
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Vanliga Frågor</h2>
                            <p className="text-slate-400">Hittar du inte det du söker? Kontakta oss.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { q: `Gör ni hembesök för ${data.title.toLowerCase()} kostnadsfritt?`, a: "Ja, det första hembesöket för konsultation är alltid helt kostnadsfritt och utan köpkrav." },
                                { q: "Får jag använda ROT-avdraget?", a: "Självklart. Om du är berättigad sköter vi allt pappersarbete och drar avbeloppet direkt på din slutfaktura för att göra det enkelt för dig." },
                                { q: "Hur lång tid tar ett normalt projekt?", a: "Det beror helt på omfattningen. Efter vårt första hembesök ger vi dig en realistisk och detaljerad tidsplan tillsammans med offerten." },
                            ].map((faq, i) => (
                                <details key={i} className="group bg-slate-900 border border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-white text-lg">
                                        {faq.q}
                                        <span className="relative flex shrink-0 ml-1.5 w-5 h-5">
                                            <span className="absolute bg-brand-400 w-5 h-0.5 top-1/2 -translate-y-1/2 rounded-full transition-transform group-open:rotate-180" />
                                            <span className="absolute bg-brand-400 w-0.5 h-5 left-1/2 -translate-x-1/2 rounded-full transition-transform group-open:rotate-90" />
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
                <section className="py-24 relative overflow-hidden bg-slate-900 border-t border-brand-500/20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Klar att förverkliga planerna?</h2>
                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Låt oss ta ett första möte. Vi lyssnar på dina idéer och presenterar en lösning med fast pris för din {data.title.toLowerCase()}.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/#offert"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg transition-all shadow-xl shadow-brand-500/20"
                            >
                                Få prisförslag nu
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
