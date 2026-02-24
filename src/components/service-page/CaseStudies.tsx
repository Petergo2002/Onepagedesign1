
import Image from 'next/image'
import type { CaseStudy } from '@/lib/service-location-pages/types'

const IMAGE_PLACEHOLDER = '[BYT BILD]'

function isRenderable(src: string | null | undefined): boolean {
    if (!src) return false
    const s = src.trim()
    if (!s || s === IMAGE_PLACEHOLDER) return false
    return s.startsWith('/') || s.startsWith('http')
}

function isVideoSrc(src: string | null | undefined): src is string {
    if (!src) return false
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src.trim())
}

interface CaseStudiesProps {
    cases: CaseStudy[]
    locationName: string
    serviceName: string
}

export const CaseStudies = ({ cases, locationName, serviceName }: CaseStudiesProps) => {
    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-12">
                    <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Lokala case</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Exempel på uppdrag i {locationName}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Här är några av de projekt vi genomfört inom {serviceName.toLowerCase()} i området. Från mindre servicejobb till större installationer.
                    </p>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {cases.map((item, idx) => {
                        const hasImage = isRenderable(item.img)
                        const isVideo = isVideoSrc(item.img)
                        const isEven = idx % 2 === 0

                        return (
                            <article key={item.title} className="group relative">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                    {/* Content */}
                                    <div className={`flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-semibold text-brand-300 uppercase tracking-wider">
                                                {item.area}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-brand-400 transition-colors">
                                            {item.title}
                                        </h3>

                                        <div className="space-y-4 text-slate-300 leading-relaxed">
                                            <div className="pl-4 border-l-2 border-slate-700 hover:border-brand-500/50 transition-colors">
                                                <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Utmaning</span>
                                                <p>{item.challenge}</p>
                                            </div>
                                            <div className="pl-4 border-l-2 border-slate-700 hover:border-brand-500/50 transition-colors">
                                                <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Lösning</span>
                                                <p>{item.solution}</p>
                                            </div>
                                            <div className="pl-4 border-l-2 border-slate-700 hover:border-brand-500/50 transition-colors">
                                                <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Resultat</span>
                                                <p>{item.result}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-white/10 group-hover:border-brand-500/30 transition-all duration-500 shadow-2xl shadow-black/50">
                                            {hasImage ? (
                                                isVideo ? (
                                                    <video
                                                        src={item.img}
                                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        preload="metadata"
                                                        aria-label={`${item.title} i ${item.area}`}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={item.img}
                                                        alt={`${item.title} i ${item.area}`}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                    />
                                                )
                                            ) : (
                                                <div className="absolute inset-0 grid place-items-center">
                                                    <span className="text-xs uppercase tracking-wider text-slate-600">Bild saknas</span>
                                                </div>
                                            )}
                                            {/* Subtle overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-white/5 pointer-events-none" />
                                        </div>

                                        {/* Decorative Element */}
                                        <div className={`absolute -z-10 w-[120%] h-[120%] top-[-10%] ${isEven ? 'left-[-10%]' : 'right-[-10%]'} bg-brand-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
