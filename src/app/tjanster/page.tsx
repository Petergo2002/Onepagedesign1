import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SERVICES } from '@/lib/services'
import { industryCopy } from '@/config/industry'

export default function ServicesLandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <NavBar />

            <main className="pt-24 pb-16">
                <section className="relative py-16 md:py-20 px-4">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950" />

                    <div className="container mx-auto max-w-6xl">
                        <Breadcrumbs />

                        <div className="max-w-3xl mt-6 mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 mb-5">
                                <Zap size={16} />
                                Våra tjänster
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                                {industryCopy.servicesLanding.title}
                            </h1>
                            <p className="text-white/70 text-lg">
                                {industryCopy.servicesLanding.description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {SERVICES.map((service) => (
                                <article
                                    key={service.slug}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-brand-500/50 transition-colors"
                                >
                                    <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
                                    <p className="text-white/65 text-sm leading-relaxed mb-6">{service.shortDesc}</p>
                                    <Link
                                        href={`/tjanster/${service.slug}`}
                                        className="inline-flex items-center gap-2 text-brand-300 hover:text-white transition-colors"
                                    >
                                        Läs mer
                                        <ArrowRight size={16} />
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
