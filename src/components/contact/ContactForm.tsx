
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'

import { industryCopy } from '@/config/industry'

interface FormValues {
    name: string
    phone: string
    email: string
    message: string
}

interface FormErrors {
    name?: string
    phone?: string
    email?: string
    message?: string
}

const initial: FormValues = { name: '', phone: '', email: '', message: '' }

export const ContactForm = () => {
    const [values, setValues] = useState<FormValues>(initial)
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const validate = (v: FormValues): FormErrors => {
        const e: FormErrors = {}
        if (!v.name.trim()) e.name = 'Ange ditt namn.'
        if (!v.phone.trim()) e.phone = 'Ange telefonnummer.'
        if (!v.email.trim()) e.email = 'Ange e-post.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Ogiltig e-postadress.'
        if (!v.message.trim()) e.message = 'Skriv ett meddelande.'
        return e
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setValues((s) => ({ ...s, [name]: value }))
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target
        const e2 = validate(values)
        setErrors((s) => ({ ...s, [name as keyof FormErrors]: e2[name as keyof FormErrors] }))
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const e2 = validate(values)
        setErrors(e2)
        if (Object.keys(e2).length) return
        setSubmitting(true)

        // Simulerad förfrågan
        await new Promise((r) => setTimeout(r, 1200))

        setSubmitting(false)
        setSubmitted(true)
    }

    const reset = () => {
        setValues(initial)
        setErrors({})
        setSubmitted(false)
    }

    return (
        <AnimatePresence mode="wait">
            {!submitted ? (
                <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={onSubmit}
                    className="glass rounded-2xl p-6 md:p-8 space-y-5 shadow-soft border border-white/10 bg-slate-900/50"
                >
                    <h3 className="text-xl font-bold mb-2">Skicka ett meddelande</h3>

                    <div>
                        <label className="block text-sm mb-2 text-white/80 font-medium">Namn</label>
                        <input
                            name="name"
                            value={values.name}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={`w-full bg-white/5 border ${errors.name ? 'border-rose-400/60' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors placeholder:text-slate-500`}
                            placeholder="För- och efternamn"
                        />
                        {errors.name && <p className="mt-1 text-sm text-rose-300">{errors.name}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm mb-2 text-white/80 font-medium">Telefon</label>
                            <input
                                name="phone"
                                value={values.phone}
                                onChange={onChange}
                                onBlur={onBlur}
                                className={`w-full bg-white/5 border ${errors.phone ? 'border-rose-400/60' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors placeholder:text-slate-500`}
                                placeholder="070-123 45 67"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-rose-300">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-2 text-white/80 font-medium">E-post</label>
                            <input
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={onChange}
                                onBlur={onBlur}
                                className={`w-full bg-white/5 border ${errors.email ? 'border-rose-400/60' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors placeholder:text-slate-500`}
                                placeholder="namn@exempel.se"
                            />
                            {errors.email && <p className="mt-1 text-sm text-rose-300">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-white/80 font-medium">Meddelande</label>
                        <textarea
                            name="message"
                            rows={5}
                            value={values.message}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={`w-full bg-white/5 border ${errors.message ? 'border-rose-400/60' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors placeholder:text-slate-500`}
                            placeholder={industryCopy.contact.messagePlaceholder}
                        />
                        {errors.message && <p className="mt-1 text-sm text-rose-300">{errors.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 active:scale-[0.98]"
                        >
                            <Send className="h-4 w-4" />
                            {submitting ? 'Skickar...' : 'Skicka förfrågan'}
                        </button>
                        <span className="text-white/40 text-xs hidden sm:inline-block">{industryCopy.contact.responsePromise}</span>
                    </div>
                </motion.form>
            ) : (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-8 shadow-soft border border-emerald-500/20 bg-emerald-950/20"
                >
                    <div className="flex flex-col items-center text-center gap-4 py-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Tack för din förfrågan!</h3>
                            <p className="text-slate-300 max-w-sm mx-auto">
                                Vi har mottagit ditt meddelande och återkommer till <strong>{values.email}</strong> så snart vi kan.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-3">
                            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors" onClick={reset}>
                                Skicka ett nytt meddelande
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
