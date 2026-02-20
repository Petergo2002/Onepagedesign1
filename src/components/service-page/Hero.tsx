
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Home,
    MapPin,
    Phone,
    ShieldCheck,
    Star,
} from 'lucide-react'

interface ServiceHeroProps {
    title: string
    subtitle: string
    location: string
    service: string
    imageSrc?: string | null
    phoneHref: string
    phoneLabel: string
    responseText: string
}

export const ServiceHero = ({
    title,
    subtitle,
    location,
    service,
    imageSrc,
    phoneHref,
    phoneLabel,
    responseText,
}: ServiceHeroProps) => {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 lg:pb-48 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.2),transparent_45%),linear-gradient(180deg,rgba(2,6,23,1)_0%,rgba(15,23,42,1)_100%)]" />
                )}
                {/* Enhanced Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="mb-8 hidden sm:block">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                            <li>
                                <Link href="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                    <Home size={14} />
                                    Hem
                                </Link>
                            </li>
                            <li className="opacity-50">/</li>
                            <li><Link href="/tjanster" className="hover:text-white transition-colors">Tjänster</Link></li>
                            <li className="opacity-50">/</li>
                            <li><Link href={`/tjanster/${service.toLowerCase()}`} className="hover:text-white transition-colors">{service}</Link></li>
                            <li className="opacity-50">/</li>
                            <li className="text-brand-300 font-medium">{location}</li>
                        </ol>
                    </nav>

                    {/* Trust Badge / Tag */}
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-400/20 bg-brand-500/10 text-brand-200 mb-8 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                        <MapPin size={14} />
                        Lokalt byggföretag i {location}
                        <span className="w-1 h-1 rounded-full bg-brand-400" />
                        <span className="text-green-400 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Tillgängliga nu
                        </span>
                    </div>

                    {/* Main Title Area */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                        {title}
                    </h1>

                    {/* Trust Indicators Row */}
                    <div className="flex flex-wrap gap-4 mb-8 text-sm font-medium text-slate-300">
                        <div className="flex items-center gap-1.5 bg-slate-900/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                            <Star className="text-yellow-400 fill-yellow-400" size={16} />
                            <span className="text-white">4.9/5</span>
                            <span className="text-slate-400">(200+ omdömen)</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-900/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                            <ShieldCheck className="text-green-400" size={16} />
                            <span className="text-white">Auktoriserad</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-900/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                            <Clock3 className="text-blue-400" size={16} />
                            <span className="text-white">Svar inom 1h</span>
                        </div>
                    </div>

                    <p className="text-lg md:text-2xl text-slate-300 leading-relaxed mb-10 max-w-2xl font-light">
                        {subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link
                            href="/#offert"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-brand-500/25"
                        >
                            Begär kostnadsfri offert
                            <ArrowRight size={20} />
                        </Link>
                        <a
                            href={phoneHref}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-lg border border-white/10 transition-colors backdrop-blur-sm"
                        >
                            <Phone size={20} className="text-brand-400" />
                            {phoneLabel}
                        </a>
                    </div>

                    {/* Trust Footer in Hero */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 text-white/80">
                            <MapPin className="h-5 w-5 text-brand-400" />
                            <span>Lokalt byggföretag i {location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-brand-400" />
                            <span>Trygghetsgaranti</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-brand-400" />
                            <span>Alla behörigheter</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
