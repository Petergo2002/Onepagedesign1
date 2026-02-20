'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs() {
    const pathname = usePathname()

    // Don't show on home page
    if (pathname === '/') return null

    // Split path into segments and filter out empty strings
    const segments = pathname.split('/').filter(Boolean)

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/50">
                <li>
                    <Link href="/" className="hover:text-brand-300 transition-colors flex items-center gap-1">
                        <Home size={14} />
                        Hem
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    // Build the href for this segment
                    const href = `/${segments.slice(0, index + 1).join('/')}`

                    // Format the segment name: replace hyphens with spaces, capitalize first letter
                    // e.g. "ny-produktion-i-goteborg" -> "Ny Produktion I Goteborg"
                    const label = segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, c => c.toUpperCase())

                    // Is this the last segment?
                    const isLast = index === segments.length - 1

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <ChevronRight size={14} className="opacity-50" />
                            {isLast ? (
                                <span className="text-white/90 font-medium" aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <Link href={href} className="hover:text-brand-300 transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
