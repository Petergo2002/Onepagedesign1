import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SERVICES } from '@/lib/services'
import { industryCopy } from '@/config/industry'

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-white/10 bg-gradient-to-t from-black to-transparent">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-1">
            <Link href="/#hero" className="flex items-center gap-2 font-extrabold tracking-tight">
              <div className="h-8 w-8 rounded-md bg-brand-600 grid place-items-center shadow-soft">
                <span className="text-white text-sm">{siteConfig.brandShort}</span>
              </div>
              <span className="text-white/90">{siteConfig.brandName}</span>
            </Link>
            <p className="mt-4 text-white/70 text-sm max-w-xs">{industryCopy.footer.description}</p>
          </div>

          <div>
            <div className="text-white/80 font-semibold mb-4">Navigation</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/#tjanster" className="hover:text-brand-300 transition-colors">
                  Tjänster
                </Link>
              </li>
              <li>
                <Link href="/#omoss" className="hover:text-brand-300 transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/#omdomen" className="hover:text-brand-300 transition-colors">
                  Omdömen
                </Link>
              </li>
              <li>
                <Link href="/#offert" className="hover:text-brand-300 transition-colors">
                  Begär offert
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/80 font-semibold mb-4">Kontakt</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="flex gap-2 items-center hover:text-white transition-colors">
                <Phone size={16} className="text-brand-400 flex-shrink-0" />
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex gap-2 items-center hover:text-white transition-colors">
                <Mail size={16} className="text-brand-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex gap-2 items-center">
                <MapPin size={16} className="text-brand-400 flex-shrink-0" />
                {siteConfig.serviceAreaSummary}
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/80 font-semibold mb-4">Tjänster</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/tjanster/${service.slug}`} className="hover:text-brand-300 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-white mb-2">{industryCopy.footer.ctaTitle}</div>
            <p className="text-white/70 text-sm mb-4">{industryCopy.footer.ctaText}</p>
            <Link
              href="/#offert"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-colors w-full"
            >
              Begär offert
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t border-white/10 text-sm text-white/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {siteConfig.legalCompanyName}. Alla rättigheter reserverade.
        </div>
        <div className="space-x-4">
          <Link href="/integritet" className="hover:text-white">
            Integritet
          </Link>
          <Link href="/cookies" className="hover:text-white">
            Cookies
          </Link>
          <Link href="/villkor" className="hover:text-white">
            Villkor
          </Link>
        </div>
      </div>
    </footer>
  )
}
