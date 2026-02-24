import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Cookiepolicy',
  description: `Information om cookies på ${siteConfig.brandName}s webbplats.`,
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
      <NavBar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookiepolicy</h1>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Vi använder cookies för att webbplatsen ska fungera tekniskt, för att förbättra användarupplevelsen och
              för att kunna analysera trafik.
            </p>
            <p>
              Du kan när som helst rensa eller blockera cookies i din webbläsare. Observera att vissa funktioner kan
              påverkas om cookies inaktiveras.
            </p>
            <p>
              Om vi använder analys- eller marknadsföringscookies inhämtas samtycke enligt gällande regler innan dessa
              aktiveras.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
