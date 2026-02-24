
'use client'

import { useState, useEffect } from 'react'
import { Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface StickyMobileCTAProps {
    phoneHref: string
}

export const StickyMobileCTA = ({ phoneHref }: StickyMobileCTAProps) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the hero section (approx 600px)
            const show = window.scrollY > 600
            if (show !== isVisible) {
                setIsVisible(show)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 z-50 md:hidden animate-in slide-in-from-bottom duration-300">
            <div className="grid grid-cols-2 gap-3">
                <a
                    href={phoneHref}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-900 font-bold shadow-lg active:scale-[0.98] transition-all"
                >
                    <Phone size={18} className="fill-slate-900" />
                    Ring oss
                </a>
                <Link
                    href="/#offert"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 active:scale-[0.98] transition-all"
                >
                    Få offert
                    <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    )
}
