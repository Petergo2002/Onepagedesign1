import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import AreasWeServe from '@/components/AreasWeServe'
import Testimonials from '@/components/Testimonials'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main>
        <Hero />
        <Services />
        <About />
        <AreasWeServe />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}

