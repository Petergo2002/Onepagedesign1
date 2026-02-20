export type ServiceSlug = string

export interface ServiceCatalogItem {
  slug: ServiceSlug
  title: string
  subtitle: string
  shortDesc: string
  longDesc: string
  image: string
}

export const SERVICES: ServiceCatalogItem[] = [
  {
    "slug": "bygg-och-snickeri",
    "title": "Bygg & Snickeri",
    "subtitle": "Kvalitativt bygg- och snickeriföretag",
    "shortDesc": "Vi utför alla typer av renoveringar och tillbyggnader med hög kvalitet och tydliga priser.",
    "longDesc": "Svensk Bygg & Snickeri erbjuder trygg och professionell bygghjälp av alla slag. Vi tar hand om hela byggprocessen från start till mål för ett felfritt resultat.",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
  }
]

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<string, ServiceCatalogItem>
