import { MetadataRoute } from 'next'
import { toAbsoluteUrl } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Block API and future admin routes
        },
        sitemap: toAbsoluteUrl('/sitemap.xml'),
        host: toAbsoluteUrl('/'),
    }
}
