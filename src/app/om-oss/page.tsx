import { Metadata } from 'next'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'
import About from '@/app/components/About'
import Testimonials from '@/app/components/Testimonials'
import ContactCTA from '@/app/components/ContactCTA'

export const metadata: Metadata = {
    title: 'Om Oss | Byggföretag i Göteborg',
    description: 'Läs mer om vårt bygg- och snickeriföretag i Göteborg. Vi brinner för att förverkliga våra kunders byggdrömmar med högsta yrkesstolthet.',
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
