'use client'
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { industryCopy } from '@/config/industry';

interface Area {
    id: number;
    name: string;
    image: string;
}

/** Regions across Sweden where we operate. */
const areas: Area[] = [
    {
        id: 1,
        name: 'Stockholm',
        image: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Göteborg',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Malmö',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Uppsala',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Linköping',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Övriga Sverige',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop'
    }
];

export default function AreasWeServe() {
    return (
        <section id="omraden" className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute -top-1/2 left-1/2 w-[1200px] h-[1200px] bg-glow -translate-x-1/2" />
            </div>

            <div className="container px-4 mx-auto relative">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 mb-4">
                        VÅRA OMRÅDEN
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Vi utför {industryCopy.pluralLabel} i
                        </span>
                        <span className="block text-brand-400">hela Sverige</span>
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Oavsett var du befinner dig i landet kan vi hjälpa dig med professionella tjänster, snabbt och tryggt.
                    </p>
                </motion.div>

                {/* Areas grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            className="relative h-[420px] rounded-2xl overflow-hidden bg-slate-800"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-slate-800">
                                    <Image
                                        src={area.image}
                                        alt={`${industryCopy.singularLabel} i ${area.name}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        quality={80}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500 text-white mb-4 shadow-lg shadow-brand-500/20">
                                        <MapPin size={22} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{area.name}</h3>
                                    <p className="text-brand-300 font-medium">Område</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-xl text-white/80 mb-6">Behöver du hjälp utanför dessa områden?</p>
                    <Link
                        href="/#offert"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium text-lg transition-colors shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
                    >
                        Kontakta oss för mer information
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
