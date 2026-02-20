# MASTER WORKFLOW: Tjanst + Omrade Page (AI-Ready)

This is the core workflow file for creating pages like:

- `/tjanster/[service]/[location]/`
- Example: `/tjanster/elinstallation/goteborg/`

Use this file as the source of truth for any AI agent.

## 1. Goal

Create one high-quality local onepage for:

1. A specific service
2. A specific location
3. With unique local value (not doorway-style duplicate text)

## 2. Project Technical Map

Render file:

- `src/app/tjanster/[service]/[location]/page.tsx`

Data source (one JSON per page):

- `src/lib/service-location-pages/data/<service>__<location>.json`

Data loading:

- `src/lib/service-location-pages/repository.ts`

Data types:

- `src/lib/service-location-pages/types.ts`

Generator command:

- `npm run workflow:new-location -- --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>"`

## 3. Inputs Required From User

Before starting, the AI must have:

1. `service-slug` (example: `elinstallation`)
2. `service-name` (example: `Elinstallation`)
3. `location-slug` (example: `stockholm`)
4. `location-name` (example: `Stockholm`)
5. Phone and CTA preference if different from template
6. Any local proof data (areas, cases, FAQ facts)

## 4. Exact Execution Steps

1. Generate data scaffold:

```bash
npm run workflow:new-location -- --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>"
```

2. Open generated JSON file:

- `src/lib/service-location-pages/data/<service-slug>__<location-slug>.json`

3. Rewrite all local content in that file (do not keep generic placeholder copy):

1. metadata
2. hero
3. offerings
4. localProblems
5. process
6. caseStudies
7. priceExamples
8. areas
9. reviews
10. faq
11. relatedServices

4. Ensure the page follows required section order (already rendered by template):

1. Hero + breadcrumb + CTA
2. Trust cards
3. Service content zigzag
4. Local problems
5. Process
6. Local case studies
7. Price examples
8. Service areas
9. Reviews
10. FAQ
11. Related services
12. Final CTA

5. Run quality checks:

```bash
npm run lint
npm run build
```

## 5. JSON Contract (Must Exist)

The page JSON must include:

1. `serviceSlug`
2. `serviceName`
3. `locationSlug`
4. `locationName`
5. `pageTitle`
6. `metaTitle`
7. `metaDesc`
8. `heroTitle`
9. `heroSubtitle`
10. `heroImg`
11. `phoneHref`
12. `phoneLabel`
13. `responseText`
14. `features` (`title`, `desc`, `icon`)
15. `offerings` (`title`, `desc`, `details`, `highlights[]`, `img`)
16. `localProblems` (`title`, `desc`)
17. `process` (`title`, `desc`)
18. `caseStudies` (`title`, `area`, `challenge`, `solution`, `result`, `img`)
19. `priceExamples` (`title`, `price`, `desc`)
20. `areas` (`string[]`)
21. `reviews` (`name`, `role`, `text`, `rating`)
22. `faq` (`q`, `a`)
23. `relatedServices` (`title`, `slug`, `desc`)

## 6. SEO and Quality Rules

Must do:

1. Unique `metaTitle` and `metaDesc`
2. Unique local case studies per location
3. Unique local FAQ per location
4. Real local areas list per location
5. Useful, human-first copy
6. Keep schema output intact in page template (`BreadcrumbList`, `Electrician`, `Service`, `FAQPage`)

Must not do:

1. Copy same city page and only replace city name
2. Publish thin pages without local proof
3. Break internal links to `/tjanster`, `/tjanster/[service]`, and `/#offert`

## 7. Definition Of Done

A page is done only when:

1. JSON is fully rewritten and locally unique
2. `npm run lint` passes
3. `npm run build` passes
4. Images load on desktop and mobile
5. Copy reads naturally for the target city

## 8. Copy-Paste Prompt For Another AI

Use this exact prompt:

```text
Follow docs/local-seo-tjanst-omrade.md exactly.
Create or update page data for:
- service-slug: <service-slug>
- service-name: <Service Name>
- location-slug: <location-slug>
- location-name: <Location Name>

Steps you must execute:
1) Run the scaffold command from the workflow file.
2) Rewrite the generated JSON with unique local content.
3) Keep required section structure and SEO rules.
4) Run npm run lint and npm run build.
5) Return what was changed and file paths.
```
