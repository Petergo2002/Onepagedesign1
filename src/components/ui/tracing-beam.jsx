'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentRef = useRef(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const update = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight)
    }
    update()
    // Update on resize and when content changes
    const ro = new ResizeObserver(update)
    if (contentRef.current) ro.observe(contentRef.current)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, Math.max(50, svgHeight - 200)]),
    { stiffness: 500, damping: 90 }
  )

  return (
    <motion.div ref={ref} className={cn('relative mx-auto h-full w-full max-w-4xl', className)}>
      <div className="absolute top-3 -left-12 sm:-left-16 md:-left-20 z-0 pointer-events-none">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: scrollYProgress.get() > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
          className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{ backgroundColor: scrollYProgress.get() > 0 ? 'white' : '#10b981', borderColor: scrollYProgress.get() > 0 ? 'white' : '#059669' }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#1BA758" stopOpacity="0" />
              <stop stopColor="#1BA758" />
              <stop offset="0.35" stopColor="#15834B" />
              <stop offset="1" stopColor="#15834B" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="relative z-10 pl-6 sm:pl-8 md:pl-0">{children}</div>
    </motion.div>
  )
}
