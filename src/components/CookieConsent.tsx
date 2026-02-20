'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Show with a small delay for smoother UX
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)
        // Here you would typically trigger GA initialization
        // initGoogleAnalytics()
    }

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-900/95 backdrop-blur border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                    <p className="text-white font-medium mb-1">Vi värnar om din integritet</p>
                    <p className="text-sm text-slate-400">
                        Vi använder cookies för att ge dig en bättre upplevelse och föra statistik.
                        Läs mer i vår <Link href="/integritet" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">integritetspolicy</Link>.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                    >
                        Endast nödvändiga
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors shadow-lg shadow-brand-500/20"
                    >
                        Godkänn alla
                    </button>
                </div>
            </div>
        </div>
    )
}
