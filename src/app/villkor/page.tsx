import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Allmänna villkor',
  description: `Övergripande villkor för tjänster från ${siteConfig.brandName}.`,
  alternates: { canonical: '/villkor' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
      <NavBar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Allmänna villkor</h1>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Offert gäller enligt angiven giltighetstid och omfattning. Eventuella tilläggsarbeten behöver godkännas
              innan de utförs.
            </p>
            <p>
              Betalningsvillkor, leveranstider och garantier framgår i offert eller avtal för respektive uppdrag.
              Installationer utförs enligt gällande regler och branschkrav.
            </p>
            <p>
              Vid frågor om villkor eller avtal, kontakta oss på{' '}
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
