
import { AlertCircle } from 'lucide-react'
import type { LocalProblem } from '@/lib/service-location-pages/types'

interface LocalProblemsProps {
    problems: LocalProblem[]
    locationName: string
    serviceName: string
}

export const LocalProblems = ({ problems, locationName, serviceName }: LocalProblemsProps) => {
    return (
        <section className="py-20 bg-slate-900 border-b border-white/5 relative z-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-12">
                    <span className="text-brand-400 font-medium tracking-wider uppercase text-sm block mb-3">Lokala behov</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Vanliga problem vi löser i {locationName}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Varje område har sina utmaningar. Här är de vanligaste anledningarna till att kunder kontaktar oss för {serviceName.toLowerCase()}.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {problems.map((problem) => (
                        <article
                            key={problem.title}
                            className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-brand-500/30 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                <AlertCircle size={20} className="text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {problem.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
