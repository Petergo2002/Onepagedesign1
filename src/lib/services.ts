import { loadActiveProfile } from '@/lib/template/profile'
import type {
  ServiceCatalogItem,
  ServiceContent,
  ServiceFaqItem,
  ServiceFeature,
  ServiceProcessStep,
  ServiceSlug,
} from '@/lib/template/types'

export type { ServiceSlug, ServiceFeature, ServiceProcessStep, ServiceFaqItem, ServiceContent, ServiceCatalogItem }

export const SERVICES: ServiceCatalogItem[] = loadActiveProfile().services

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<string, ServiceCatalogItem>
