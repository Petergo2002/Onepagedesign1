import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { ServiceLocationPageData } from './types'

const dataDir = path.join(process.cwd(), 'src/lib/service-location-pages/data')
const shouldCache = process.env.NODE_ENV === 'production'

let cachedPages: ServiceLocationPageData[] | null = null

async function loadAllPages(): Promise<ServiceLocationPageData[]> {
    if (shouldCache && cachedPages) {
        return cachedPages
    }

    const files = (await readdir(dataDir)).filter((file) => file.endsWith('.json'))

    const pages = await Promise.all(
        files.map(async (file) => {
            const fullPath = path.join(dataDir, file)
            const content = await readFile(fullPath, 'utf-8')
            const parsed = JSON.parse(content) as ServiceLocationPageData

            if (!parsed.serviceSlug || !parsed.locationSlug) {
                throw new Error(`Invalid page data in ${file}: missing serviceSlug or locationSlug`)
            }

            return parsed
        })
    )

    if (shouldCache) {
        cachedPages = pages
    }

    return pages
}

export async function getAllServiceLocationPages() {
    return loadAllPages()
}

export async function getServiceLocationPage(service: string, location: string) {
    const pages = await loadAllPages()
    return pages.find((page) => page.serviceSlug === service && page.locationSlug === location) ?? null
}

export async function getLocationsForService(service: string) {
    const pages = await loadAllPages()
    return pages
        .filter((page) => page.serviceSlug === service)
        .sort((a, b) => a.locationName.localeCompare(b.locationName, 'sv'))
}

export async function getServiceLocationStaticParams() {
    const pages = await loadAllPages()
    return pages.map((page) => ({
        service: page.serviceSlug,
        location: page.locationSlug,
    }))
}
