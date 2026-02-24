import { loadActiveProfile } from '@/lib/template/profile'
import type { Testimonial } from '@/lib/template/types'

export const testimonials: Testimonial[] = loadActiveProfile().testimonials
