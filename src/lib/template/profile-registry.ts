import type { ServiceCatalogItem, IndustryCopy, SiteConfig, Testimonial } from './types'

import defaultSite from '../../../profiles/default/site'
import defaultIndustry from '../../../profiles/default/industry'
import defaultServices from '../../../profiles/default/services'
import defaultTestimonials from '../../../profiles/default/testimonials'

import productionReadySite from '../../../profiles/production-ready/site'
import productionReadyIndustry from '../../../profiles/production-ready/industry'
import productionReadyServices from '../../../profiles/production-ready/services'
import productionReadyTestimonials from '../../../profiles/production-ready/testimonials'

import demoTakSite from '../../../profiles/demo-tak/site'
import demoTakIndustry from '../../../profiles/demo-tak/industry'
import demoTakServices from '../../../profiles/demo-tak/services'
import demoTakTestimonials from '../../../profiles/demo-tak/testimonials'
import demoElSite from '../../../profiles/demo-el/site'
import demoElIndustry from '../../../profiles/demo-el/industry'
import demoElServices from '../../../profiles/demo-el/services'
import demoElTestimonials from '../../../profiles/demo-el/testimonials'
import demoByggSite from '../../../profiles/demo-bygg/site'
import demoByggIndustry from '../../../profiles/demo-bygg/industry'
import demoByggServices from '../../../profiles/demo-bygg/services'
import demoByggTestimonials from '../../../profiles/demo-bygg/testimonials'
// @profile-imports

export interface StaticProfileRecord {
  site: SiteConfig
  industry: IndustryCopy
  services: ServiceCatalogItem[]
  testimonials: Testimonial[]
}

export const STATIC_PROFILE_REGISTRY: Record<string, StaticProfileRecord> = {
  default: {
    site: defaultSite as SiteConfig,
    industry: defaultIndustry as IndustryCopy,
    services: defaultServices as ServiceCatalogItem[],
    testimonials: defaultTestimonials as Testimonial[],
  },
  'production-ready': {
    site: productionReadySite as SiteConfig,
    industry: productionReadyIndustry as IndustryCopy,
    services: productionReadyServices as ServiceCatalogItem[],
    testimonials: productionReadyTestimonials as Testimonial[],
  },
  'demo-tak': {
    site: demoTakSite as SiteConfig,
    industry: demoTakIndustry as IndustryCopy,
    services: demoTakServices as ServiceCatalogItem[],
    testimonials: demoTakTestimonials as Testimonial[],
  },
  'demo-el': {
    site: demoElSite as SiteConfig,
    industry: demoElIndustry as IndustryCopy,
    services: demoElServices as ServiceCatalogItem[],
    testimonials: demoElTestimonials as Testimonial[],
  },
  'demo-bygg': {
    site: demoByggSite as SiteConfig,
    industry: demoByggIndustry as IndustryCopy,
    services: demoByggServices as ServiceCatalogItem[],
    testimonials: demoByggTestimonials as Testimonial[],
  },
  // @profile-entries
}
