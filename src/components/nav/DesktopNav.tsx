
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'
import { SERVICES } from '@/lib/services'
import { siteConfig } from '@/config/site'

interface NavLink {
    href: string
    label: string
}



const secondaryLinks: NavLink[] = [
    { href: '/om-oss', label: 'Om oss' },
    { href: '/kontakt', label: 'Kontakt' },
]

export const DesktopNav = () => {
    const [showServices, setShowServices] = useState(false)

    return (
        <div className="hidden md:flex items-center gap-6">
            {/* Hem Link */}
            <Link
                href="/"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
                Hem
            </Link>

            {/* Separator */}
            <div className="w-px h-4 bg-white/10" />

            {/* Services Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
            >
                <button
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                    onClick={() => setShowServices(!showServices)}
                    aria-expanded={showServices}
                >
                    Tjänster
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${showServices ? 'rotate-180' : ''}`}
                    />
                </button>

                <AnimatePresence>
                    {showServices && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-64 pt-2"
                        >
                            <div className="bg-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden p-2 ring-1 ring-white/5">
                                <Link
                                    href="/tjanster"
                                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 rounded-xl transition-colors mb-1"
                                >
                                    <span>Alla tjänster</span>
                                    <span className="text-brand-400 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
                                </Link>
                                <div className="h-px bg-white/5 mx-2 my-1" />
                                <div className="max-h-[60vh] overflow-y-auto px-1 py-1">
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/tjanster/${service.slug}`}
                                            className="group block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-brand-500/10 rounded-xl transition-all"
                                        >
                                            <div className="font-medium mb-0.5">{service.title}</div>
                                            <div className="text-xs text-slate-500 line-clamp-1">{service.shortDesc}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Secondary Links */}
            {secondaryLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                    {link.label}
                </Link>
            ))}

            {/* Contact Details (Right aligned usually, but here part of the flow) */}
            <div className="ml-4 flex items-center gap-4">
                <a
                    href={siteConfig.phoneHref}
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-300 transition-colors"
                >
                    <Phone size={16} className="text-brand-400" />
                    <span>{siteConfig.phoneDisplay}</span>
                </a>
            </div>
        </div>
    )
}
