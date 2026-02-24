'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { testimonials } from '@/config/testimonials'

interface Testimonial {
  text: string
  name: string
  role: string
  avatar: string
}

const variants = {
  enter: { opacity: 0, y: 20, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
}

export default function Testimonials() {
  const [index, setIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  useEffect(() => {
    if (!isHovered) {
      const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000)
      return () => clearInterval(t)
    }
  }, [isHovered])

  const goTo = (i: number) => setIndex((i + testimonials.length) % testimonials.length)
  const t = testimonials[index] as Testimonial

  return (
    <section id="omdomen" className="section bg-gradient-to-b from-slate-900/30 to-transparent">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            VÅRA NÖJDA KUNDER
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Det säger våra kunder</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Hos oss sätter vi alltid kunden i fokus. Läs vad våra kunder har att säga om sitt samarbete med oss.
          </p>
        </div>

        <div
          className="mt-12 max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/5 to-transparent rounded-3xl -z-10 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-400/5 rounded-full -z-10" />

            <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl shadow-brand-500/5 relative overflow-hidden">
              <Quote className="absolute top-8 right-8 h-24 w-24 text-brand-500/5 -z-0" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <div className="flex justify-center mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" fillRule="evenodd" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-xl md:text-2xl leading-relaxed text-center font-medium">&quot;{t.text}&quot;</blockquote>

                  <div className="mt-8 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-brand-400/30 mb-3 relative">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{t.name}</div>
                      <div className="text-brand-300 text-sm">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => goTo(index - 1)} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Föregående omdöme">
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Visa omdöme ${i + 1}`}
                      className={`h-2 w-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand-400' : 'bg-white/20 hover:bg-white/40 w-2'}`}
                    />
                  ))}
                </div>

                <button onClick={() => goTo(index + 1)} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Nästa omdöme">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/60 text-sm">
              Vill du dela din upplevelse?{' '}
              <Link href="/#offert" className="text-brand-300 hover:text-white transition-colors">
                Kontakta oss
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
