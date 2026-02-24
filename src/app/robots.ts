import { MetadataRoute } from 'next'
import { toAbsoluteUrl } from '@/config/site'
import { getAppMode } from '@/lib/template/profile'

export default function robots(): MetadataRoute.Robots {
  if (getAppMode() === 'mockup') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: toAbsoluteUrl('/sitemap.xml'),
    host: toAbsoluteUrl('/'),
  }
}
