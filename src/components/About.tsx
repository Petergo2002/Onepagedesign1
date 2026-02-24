'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Users, Award, Lightbulb } from 'lucide-react'
import { industryCopy } from '@/config/industry'

const ICON_BY_KEY = {
    zap: Zap,
    users: Users,
    award: Award,
}

export default function About() {
    return (
        <section id="omoss" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900/80 z-10" />
                <video
                    src="/video/videohero1.mp4"
                    className="h-full w-full object-cover mix-blend-overlay opacity-15"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                />
            </div>

            <div className="container px-4 mx-auto relative z-20">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 mb-4">
                        {industryCopy.about.badge}
                    </span>
                    <motion.h2
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {industryCopy.about.titleLead}
                        <span className="block text-brand-400">{industryCopy.about.titleAccent}</span>
                    </motion.h2>

                    <motion.p
                        className="text-xl text-white/80 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {industryCopy.about.description}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
                    {industryCopy.about.cards.map((card, index) => {
                        const Icon = ICON_BY_KEY[card.icon] ?? Zap

                        return (
                            <motion.div
                                key={card.title}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                                <p className="text-white/70">{card.description}</p>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    className="mt-20 bg-gradient-to-r from-brand-500/10 to-brand-500/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-400/10 blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2.5 rounded-lg bg-brand-400/20 text-brand-300">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold">{industryCopy.about.visionTitle}</h3>
                        </div>
                        <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl">
                            {industryCopy.about.visionText}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            {industryCopy.about.stats.map((stat) => (
                                <div key={stat.label} className="bg-white/5 px-4 py-2 rounded-full text-sm">
                                    <span className="text-brand-300 font-medium">{stat.value}</span> {stat.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
