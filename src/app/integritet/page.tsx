import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description: `Information om hur ${siteConfig.brandName} hanterar personuppgifter.`,
  alternates: { canonical: '/integritet' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
      <NavBar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Integritetspolicy</h1>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Vi behandlar personuppgifter för att kunna besvara förfrågningar, lämna offerter och fullfölja avtal.
              Uppgifter sparas endast så länge de behövs för detta syfte eller enligt lagkrav.
            </p>
            <p>
              Exempel på uppgifter vi kan behandla är namn, telefonnummer, e-postadress och information om ditt
              uppdrag. Uppgifterna delas inte med obehöriga tredje parter.
            </p>
            <p>
              Vill du få information om vilka uppgifter vi har om dig, eller begära rättelse/radering, kontakta oss på{' '}
              <a className="text-brand-300 hover:text-brand-200" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
