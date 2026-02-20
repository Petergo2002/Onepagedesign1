
import { CheckCircle2 } from 'lucide-react'
import type { ProcessStep } from '@/lib/service-location-pages/types'

interface ProcessStepsProps {
    steps: ProcessStep[]
}

export const ProcessSteps = ({ steps }: ProcessStepsProps) => {
    return (
        <section className="py-20 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mb-16">
                    <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Arbetsprocess</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Så jobbar vi</h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                        Tydlighet och trygghet genom hela projektet. Från första kontakt till färdig installation.
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Connector Line */}
                    <div className="hidden lg:block absolute top-[24px] left-0 w-full h-0.5 bg-slate-800" />

                    <div className="grid lg:grid-cols-4 gap-10">
                        {steps.map((step, idx) => (
                            <div key={step.title} className="relative group">
                                {/* Step Indicator */}
                                <div className="flex items-center gap-4 mb-6 relative">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-400 font-bold text-lg group-hover:border-brand-500 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all duration-300 relative z-10">
                                        {idx + 1}
                                    </div>
                                    <span className="lg:hidden text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                                        {step.title}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="pl-4 lg:pl-2 border-l-2 border-slate-800 lg:border-l-0 lg:pt-4 group-hover:border-brand-500/30 transition-colors duration-300">
                                    <h3 className="hidden lg:block text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
