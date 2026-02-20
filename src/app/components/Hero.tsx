'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { industryCopy } from '@/config/industry'

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduceMotion(mediaQuery.matches)

        const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches)
        mediaQuery.addEventListener('change', onChange)
        return () => mediaQuery.removeEventListener('change', onChange)
    }, [])

    useEffect(() => {
        const v = videoRef.current
        if (!v || reduceMotion) return

        const onLoaded = () => {
            try {
                // Skip initial black frame and try to play
                if (v.currentTime < 0.1) v.currentTime = 0.1
                const p = v.play()
                if (p && typeof p.then === 'function') {
                    p.catch(() => {/* ignore */ })
                }
            } catch { }
        }

        v.addEventListener('loadedmetadata', onLoaded)
        return () => v.removeEventListener('loadedmetadata', onLoaded)
    }, [reduceMotion])

    return (
        <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden">
            {/* Video background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover pointer-events-none"
                    autoPlay={!reduceMotion}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src="/video/159678-819389843_tiny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {/* Stronger overlays for better readability */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-950/80" />
            <div
                className="absolute inset-0 pointer-events-none opacity-20 z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-20 container h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] flex items-center pt-24 md:pt-32 px-4 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full text-center md:text-left"
                >
                    <motion.h1
                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {industryCopy.hero.titleLead}
                        </span>
                        <span className="block text-brand-400 mt-2">{industryCopy.hero.titleAccent}</span>
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto md:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {industryCopy.hero.description}
                    </motion.p>

                    <motion.div
                        className="mt-10 sm:mt-12 flex flex-wrap justify-center md:justify-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            href="/#tjanster"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium text-base sm:text-lg transition-colors shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
                        >
                            Våra tjänster
                        </Link>
                        <Link
                            href="/#offert"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base sm:text-lg backdrop-blur-sm transition-colors"
                        >
                            Begär offert
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="mt-12 sm:mt-16 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {[
                            { number: "2 000+", label: "uppdrag" },
                            { number: "15+", label: "års erfarenhet" },
                            { number: "100%", label: "nöjda kunder" },
                            { number: "5-års", label: "garanti" }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors group flex-1 min-w-[120px] max-w-[160px]"
                            >
                                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-brand-500 group-hover:from-brand-200 group-hover:to-brand-400 transition-colors">
                                    {stat.number}
                                </div>
                                <div className="text-xs sm:text-sm text-white/70 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

        </section>
    )
}
