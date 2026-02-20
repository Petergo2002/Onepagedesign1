
import { Metadata } from 'next'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'


export const metadata: Metadata = {
    title: 'Kontakta Oss | Byggföretag i Göteborg',
    description: 'Kontakta oss för prisförslag, rådgivning eller för att boka ett hembesök.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-brand-500/30">
            <NavBar />

            <main className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10">
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400 mb-6">
                            Kontakta oss
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                            Vi hjälper dig med allt inom el. Fyll i formuläret för en fri offert eller ring oss direkt för akuta ärenden.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left Column: Contact Info */}
                        <ContactInfo />

                        {/* Right Column: Form */}
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
