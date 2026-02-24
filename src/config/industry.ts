import { loadActiveProfile } from '@/lib/template/profile'
import type { IndustryCopy, IndustryFeatureCard, IndustryStat } from '@/lib/template/types'

export type { IndustryStat, IndustryFeatureCard, IndustryCopy }

export const industryCopy = loadActiveProfile().industry satisfies IndustryCopy
