import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Home, Phone } from 'lucide-react'

interface ServiceHeroProps {
  title: string
  subtitle: string
  location: string
  service: string
  serviceSlug: string
  imageSrc?: string | null
  phoneHref: string
  phoneLabel: string
}

function isVideoSrc(src: string | null | undefined): src is string {
  if (!src) return false
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src.trim())
}

export const ServiceHero = ({ title, subtitle, location, service, serviceSlug, imageSrc, phoneHref, phoneLabel }: ServiceHeroProps) => {
  const hasVideo = isVideoSrc(imageSrc)
  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-slate-950">
        {imageSrc && hasVideo ? (
          <video
            src={imageSrc}
            className="h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : imageSrc ? (
          <Image src={imageSrc} alt={title} fill className="object-cover opacity-60" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(27,167,88,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(27,167,88,0.15),transparent_45%)]" />
        )}
        <div className="absolute inset-0 bg-slate-950/80 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/90 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 hidden sm:block">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                  <Home size={14} />
                  Hem
                </Link>
              </li>
              <li className="opacity-50">/</li>
              <li>
                <Link href="/tjanster" className="hover:text-white transition-colors">
                  Tjänster
                </Link>
              </li>
              <li className="opacity-50">/</li>
              <li>
                <Link href={`/tjanster/${serviceSlug}`} className="hover:text-white transition-colors">
                  {service}
                </Link>
              </li>
              <li className="opacity-50">/</li>
              <li className="text-brand-400">{location}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-500/20 text-brand-400 mb-6 text-sm font-semibold tracking-wide backdrop-blur-sm border border-brand-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Lokal service i {location}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white tracking-tight">{title}</h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl font-light">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/#offert"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg transition-all shadow-lg shadow-brand-500/25"
            >
              Få offertförslag
              <ArrowRight size={20} />
            </Link>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-brand-400 text-brand-400 font-semibold text-lg hover:bg-brand-400 hover:text-white transition-colors shadow-lg shadow-brand-500/10"
            >
              <Phone size={20} />
              {phoneLabel}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-slate-300 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-400" />
              <span>För företag & privatpersoner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-400" />
              <span>Inga dolda avgifter</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-400" />
              <span>Snabba inställelsetider</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
