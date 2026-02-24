
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import type { Offering } from '@/lib/service-location-pages/types'

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

interface ServiceGridProps {
    offerings: Offering[]
    serviceName: string
    locationName: string
}

export const ServiceGrid = ({ offerings, serviceName, locationName }: ServiceGridProps) => {
    return (
        <section className="py-20 bg-slate-950 relative z-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">
                        Tjänster i {locationName}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Det här ingår i våra {serviceName.toLowerCase()}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                        Vi anpassar alltid lösningen efter dina behov. Här är våra vanligaste tjänster inom området – alltid utförda med högsta säkerhetsklass.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {offerings.map((offering, offeringIndex) => {
                        const hasImage = isRenderable(offering.img)
                        const isVideo = isVideoSrc(offering.img)

                        return (
                            <article
                                key={`${offering.title}-${offeringIndex}`}
                                className="group flex flex-col rounded-2xl bg-slate-900 border border-white/10 overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                                    {hasImage && isVideo ? (
                                        <video
                                            src={offering.img}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            aria-label={offering.title}
                                        />
                                    ) : hasImage ? (
                                        <Image
                                            src={offering.img}
                                            alt={offering.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 grid place-items-center text-slate-600">
                                            <span className="text-xs uppercase tracking-wider">Bild saknas</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Content Area */}
                                <div className="flex flex-col flex-1 p-6 md:p-8">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                                        {offering.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                        {offering.desc}
                                    </p>

                                    {/* Highlights */}
                                    <div className="pt-6 border-t border-white/5 mt-auto">
                                        <ul className="space-y-3">
                                            {offering.highlights.slice(0, 3).map((point, pointIndex) => (
                                                <li key={`${offering.title}-${point}-${pointIndex}`} className="flex items-start gap-3 text-sm text-slate-300">
                                                    <CheckCircle2 size={16} className="text-brand-400 mt-0.5 shrink-0" />
                                                    <span className="leading-snug">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
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
