'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { DesktopNav } from '@/components/nav/DesktopNav'
import { MobileNav } from '@/components/nav/MobileNav'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
          scrolled ? 'bg-black/90 backdrop-blur-2xl border-white/5 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center group-hover:bg-white/10 transition-all duration-500">
                <span className="text-white font-bold text-lg">{siteConfig.brandShort}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-lg leading-none group-hover:text-brand-100 transition-colors">
                  {siteConfig.brandName}
                </span>
              </div>
            </Link>


            <DesktopNav />

            <button
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
              onClick={() => setOpen(true)}
              aria-label="Öppna meny"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileNav isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
