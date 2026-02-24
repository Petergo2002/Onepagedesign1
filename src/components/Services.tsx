'use client'
import { motion } from 'framer-motion'
import {
    Zap,
    Wrench,
    Lightbulb,
    BatteryCharging,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    Hammer,
    Sun,
    Home,
    LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { industryCopy } from '@/config/industry'

const ICON_BY_SLUG: Record<string, LucideIcon> = {
    elinstallation: Zap,
    laddbox: BatteryCharging,
    solceller: BarChart3,
    'smarta-hem': Lightbulb,
    felsokning: Wrench,
    taklaggning: Hammer,
    bygg: Home,
    fasad: Sun,
}

function isRenderableImageSrc(src: string | null | undefined): src is string {
    if (!src) return false
    const trimmedSrc = src.trim()
    if (!trimmedSrc || trimmedSrc === '[BYT BILD]') return false
    return trimmedSrc.startsWith('/') || trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')
}

function getServiceIcon(slug: string, title: string): LucideIcon {
    const normalizedSlug = slug.toLowerCase()
    const normalizedTitle = title.toLowerCase()
    const haystack = `${normalizedSlug} ${normalizedTitle}`

    if (ICON_BY_SLUG[normalizedSlug]) {
        return ICON_BY_SLUG[normalizedSlug]
    }

    if (haystack.includes('tak')) return Hammer
    if (haystack.includes('sol')) return Sun
    if (haystack.includes('ladd')) return BatteryCharging
    if (haystack.includes('smart')) return Lightbulb
    if (haystack.includes('fels') || haystack.includes('service')) return Wrench
    if (haystack.includes('bygg') || haystack.includes('renover')) return Home
    if (haystack.includes('install')) return Zap

    return ShieldCheck
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function Services() {
    return (
        <section id="tjanster" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900/80" />
                <div className="absolute inset-0 bg-[url('/demo-images/bygg-hero.svg')] bg-cover bg-center mix-blend-overlay opacity-5" />
            </div>

            <div className="container px-4 mx-auto relative">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 mb-4">
                        {industryCopy.services.badge}
                    </span>
                    <motion.h2
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {industryCopy.services.titleLead}
                        <span className="block text-brand-400">{industryCopy.services.titleAccent}</span>
                    </motion.h2>

                    <motion.p
                        className="text-xl text-white/80 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {industryCopy.services.description}
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    {SERVICES.map((service, idx) => {
                        const Icon = getServiceIcon(service.slug, service.title)
                        const hasServiceImage = isRenderableImageSrc(service.image)
                        return (
                            <motion.article
                                key={service.slug}
                                variants={item}
                                whileHover={{ y: -8 }}
                                className="group relative overflow-hidden rounded-2xl h-[420px] shadow-2xl/10 border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    {hasServiceImage ? (
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            quality={80}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.2),transparent_45%),linear-gradient(180deg,rgba(2,6,23,1)_0%,rgba(15,23,42,1)_100%)]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div>
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500 text-white mb-4 shadow-lg shadow-brand-500/20">
                                            <Icon size={22} className="opacity-90" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                                        <p className="text-sm text-white/75 mb-2">{service.shortDesc}</p>

                                        <div className="mt-2">
                                            <Link
                                                href={`/tjanster/${service.slug}`}
                                                className="inline-flex items-center gap-2 text-brand-300 hover:text-white font-medium group transition-colors"
                                            >
                                                <span className="text-sm uppercase tracking-wider">Läs mer</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        )
                    })}
                </motion.div>

                <div className="mt-16 text-center">
                    <motion.a
                        href="/#offert"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium text-lg transition-colors shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Begär kostnadsfri offert
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
