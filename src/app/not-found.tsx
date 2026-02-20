import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-500/10 text-brand-400 mb-8 animate-pulse">
                    <span className="text-4xl font-bold">404</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ojdå! Sidan hittades inte
                </h1>

                <p className="text-slate-400 mb-10 text-lg">
                    Det verkar som att sidan du letar efter har flyttat eller inte finns längre.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
                    >
                        <Home size={18} />
                        Till startsidan
                    </Link>

                    <Link
                        href="/tjanster"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Se våra tjänster
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-slate-500 text-sm">
                        Behöver du hjälp? Kontakta oss på <a href={`mailto:${siteConfig.email}`} className="text-brand-400 hover:text-brand-300 transition-colors">{siteConfig.email}</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
