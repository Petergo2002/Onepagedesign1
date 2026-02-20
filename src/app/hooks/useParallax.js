"use client"
import { useScroll, useTransform } from 'framer-motion'

export default function useParallax(offset = 100) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, offset])
  return { y }
}
