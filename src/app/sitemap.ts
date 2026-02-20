import { MetadataRoute } from 'next'
import { getAllServiceLocationPages } from '@/lib/service-location-pages/repository'
import { SERVICES } from '@/lib/services'
import { toAbsoluteUrl } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date().toISOString()

    // 1. Static routes (Hub pages)
    const staticRoutes = [
        '',
        '/tjanster',
        '/om-oss',
        '/kontakt',
        '/integritet',
        '/villkor',
    ].map((route) => ({
        url: toAbsoluteUrl(route),
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Service Hub pages (e.g. /tjanster/elinstallation)
    const serviceRoutes = SERVICES.map((service) => ({
        url: toAbsoluteUrl(`/tjanster/${service.slug}`),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // 3. Dynamic Service Location pages (The "Spokes")
    // e.g. /tjanster/elinstallation/goteborg
    const locationPages = await getAllServiceLocationPages()

    const locationRoutes = locationPages.map((page) => ({
        url: toAbsoluteUrl(`/tjanster/${page.serviceSlug}/${page.locationSlug}`),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority for local SEO landing pages
    }))

    return [...staticRoutes, ...serviceRoutes, ...locationRoutes]
}
