# Hemsdia Template Platform

En template-first Next.js-plattform för snabb mockup och enkel promotion till produktion.

## Läs detta först

- Huvuddoc: [docs/README.md](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/README.md)
- Workflow A (tjänst + område): [docs/workflows/service-location.md](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/service-location.md)
- Workflow B (branschbyte): [docs/workflows/industry-switch.md](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/industry-switch.md)
- Workflow C (snabb mockup-persona): [docs/workflows/mockup-persona.md](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/mockup-persona.md)

## Snabbstart

```bash
APP_MODE=mockup TEMPLATE_PROFILE=default npm run dev
```

## Profilstruktur

```text
profiles/<profile-id>/
  site.ts
  industry.ts
  services.ts
  testimonials.ts
  locations/*.json
```

## Viktiga kommandon

```bash
npm run template:new-profile -- --id <profile-id>
npm run template:new-location -- --profile <profile-id> --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>"
npm run workflow:industry-refactor -- --profile <profile-id> ...
npm run workflow:mockup-persona -- --profile <profile-id> --persona <elektriker|taklaggare|bygg> --city <city-slug>
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run build
```
