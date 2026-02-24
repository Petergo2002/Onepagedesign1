import { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ContactCTA from '@/components/ContactCTA'
import { siteConfig } from '@/config/site'
import { industryCopy } from '@/config/industry'

export const metadata: Metadata = {
  title: `Om oss | ${siteConfig.brandName}`,
  description: `Läs mer om ${siteConfig.brandName} och hur vi arbetar med ${industryCopy.pluralLabel}.`,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-500/30">
      <NavBar />

      <main className="pt-20">
        <About />
        <Testimonials />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  )
}
