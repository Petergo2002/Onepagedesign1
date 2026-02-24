
'use client'

import Link from 'next/link'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { industryCopy } from '@/config/industry'
export default function ContactCTA() {
    return (
        <section className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-500/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Redo att starta ditt projekt?
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {industryCopy.contact.intro}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/kontakt"
                            className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 w-full sm:w-auto justify-center group"
                        >
                            <Mail size={20} />
                            Få en fri offert
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href={siteConfig.phoneHref}
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all w-full sm:w-auto justify-center"
                        >
                            <Phone size={20} />
                            {siteConfig.phoneDisplay}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
