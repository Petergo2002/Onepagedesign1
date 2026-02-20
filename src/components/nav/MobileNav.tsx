
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, ArrowRight, ChevronRight, Mail } from 'lucide-react'
import { SERVICES } from '@/lib/services'
import { siteConfig } from '@/config/site'

interface MobileNavProps {
    isOpen: boolean
    onClose: () => void
}


const mainLinks = [
    { href: '/', label: 'Hem' },
    { href: '/om-oss', label: 'Om oss' },
    { href: '/kontakt', label: 'Kontakt' },
]

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-900 border-l border-white/10 z-50 md:hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <span className="text-lg font-bold text-white tracking-tight">Meny</span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Main Links */}
                            <nav className="flex flex-col space-y-2">
                                {mainLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className="text-lg font-medium text-slate-300 hover:text-white transition-colors py-2 block border-b border-white/5"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Services Section */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-widest pl-1">
                                    Våra Tjänster
                                </h3>
                                <div className="grid gap-2">
                                    <Link
                                        href="/tjanster"
                                        onClick={onClose}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <span className="text-sm font-medium text-white">Alla tjänster</span>
                                        <ArrowRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                                    </Link>
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/tjanster/${service.slug}`}
                                            onClick={onClose}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                        >
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                                {service.title}
                                            </span>
                                            <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / CTA Actions */}
                        <div className="p-6 border-t border-white/10 bg-slate-950/50 space-y-3">
                            <Link
                                href="/kontakt"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all shadow-lg active:scale-[0.98]"
                            >
                                <Mail size={18} />
                                Kontakta oss
                            </Link>

                            <a
                                href={siteConfig.phoneHref}
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/5 active:scale-[0.98]"
                            >
                                <Phone size={18} />
                                Ring oss
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
