
'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import type { PriceExample } from '@/lib/service-location-pages/types'

interface PricingTableProps {
    priceExamples: PriceExample[]
    locationName: string
}

export const PricingTable = ({ priceExamples, locationName }: PricingTableProps) => {
    const [showRotPrice, setShowRotPrice] = useState(false)

    // Helper to estimate ROT price (30% off total as a rough visual guide, restricted to labor but applying generally for demo)
    const calculateRot = (priceStr: string) => {
        const num = parseInt(priceStr.replace(/\D/g, ''))
        if (isNaN(num)) return priceStr
        // Schablon: Assume 100% is labor for simplicity in this demo demo or just apply 30% discount
        const rotPrice = Math.round(num * 0.7)
        return `${rotPrice.toLocaleString('sv-SE')} kr`
    }

    return (
        <section className="py-20 bg-slate-900 border-y border-white/5 relative z-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-12">
                    <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Prisexempel</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Vanliga kostnadsnivåer i {locationName}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Här är riktpriser för vanliga uppdrag. Exakt pris sätts alltid efter genomgång av dina förutsättningar.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mb-8 bg-slate-950/50 p-4 rounded-xl border border-white/5 inline-flex">
                    <span className={`text-sm font-medium transition-colors ${!showRotPrice ? 'text-white' : 'text-slate-500'}`}>Ordinarie pris</span>

                    <button
                        onClick={() => setShowRotPrice(!showRotPrice)}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${showRotPrice ? 'bg-brand-500' : 'bg-slate-700'}`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${showRotPrice ? 'translate-x-7' : 'translate-x-0'}`}
                        />
                    </button>

                    <span className={`text-sm font-medium transition-colors ${showRotPrice ? 'text-white' : 'text-slate-500'}`}>
                        Med ROT-avdrag*
                    </span>
                </div>

                {/* Table Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {priceExamples.map((item) => (
                        <div key={item.title} className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-brand-500/30 transition-colors relative overflow-hidden group">
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{item.desc}</p>

                            <div className="flex items-baseline gap-2 mt-auto">
                                <span className={`text-3xl font-bold transition-all duration-500 ${showRotPrice ? 'text-brand-400' : 'text-white'}`}>
                                    {showRotPrice ? calculateRot(item.price) : item.price}
                                </span>
                                {showRotPrice && (
                                    <span className="text-xs text-slate-500 line-through decoration-slate-500/50">
                                        {item.price}
                                    </span>
                                )}
                            </div>
                            {showRotPrice && (
                                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-brand-500 bg-brand-500/10 px-2 py-1 rounded-sm">
                                    Efter ROT
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-start gap-3 text-sm text-slate-500 bg-slate-950/30 p-4 rounded-lg border border-white/5">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p>
                        *Priser med ROT-avdrag är en uppskattning baserad på 30% avdrag. Det faktiska avdraget gäller endast arbetskostnaden och förutsätter att du har rotavdrag kvar att nyttja. Vi hjälper dig med ansökan.
                    </p>
                </div>
            </div>
        </section>
    )
}
