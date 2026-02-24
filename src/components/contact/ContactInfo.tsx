'use client'

import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const ContactInfo = () => {
  return (
    <div className="space-y-8 lg:pr-12">
      <div className="space-y-6">
        <p className="text-slate-400 leading-relaxed text-lg mb-8">{siteConfig.contactPage.infoDescription}</p>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-200">
          <ShieldCheck className="h-6 w-6 text-brand-400 flex-shrink-0" />
          <span className="font-medium text-sm">{siteConfig.contactPage.certificationLabel}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Ring oss direkt</h3>
            <a href={siteConfig.phoneHref} className="text-2xl font-bold text-white hover:text-brand-400 transition-colors block">
              {siteConfig.phoneDisplay}
            </a>
            <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {siteConfig.contactPage.responseHint}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Mejla oss</h3>
            <a href={`mailto:${siteConfig.email}`} className="text-xl font-bold text-white hover:text-brand-400 transition-colors block break-all">
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{siteConfig.contactPage.areaLabel}</h3>
            <p className="text-lg font-medium text-white">{siteConfig.contactPage.areaCoverage}</p>
            <p className="text-sm text-slate-500 mt-1">{siteConfig.contactPage.areaSubtext}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Öppettider</h3>
            <p className="text-lg font-medium text-white">{siteConfig.contactPage.openingHours}</p>
            <p className="text-sm text-slate-500 mt-1">{siteConfig.contactPage.openingHoursNote}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
