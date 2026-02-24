import { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: siteConfig.contactPage.metadataTitle,
  description: siteConfig.contactPage.metadataDescription,
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-500/30">
      <NavBar />

      <main className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400 mb-6">
              {siteConfig.contactPage.headingTitle}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">{siteConfig.contactPage.headingDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ContactInfo />

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-brand-500/20 to-transparent rounded-3xl blur-xl opacity-50" />
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
