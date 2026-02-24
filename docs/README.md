# Huvuddokumentation (Source of Truth)

Detta är den enda huvuddocen du behöver följa för repot.

## Målet med repot

Repot är en template-plattform där du:

1. bygger snabb mockup för kund,
2. promota:r mockup till produktionsprofil,
3. levererar utan hårdkodning i UI.

All kunddata ska ligga i `profiles/<profile-id>/`.

## Aktiva workflows

1. [Workflow A: Lägg till tjänst + område](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/service-location.md)
2. [Workflow B: Byt bransch](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/industry-switch.md)
3. [Workflow C: Snabb mockup persona](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/workflows/mockup-persona.md)

## Demo-doc (separat)

1. [Demo hemsida](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/demo-hemsida.md)
2. [Onboarding](/Users/petergorgees/Dev/hemsdia-mall-bygg/docs/onboarding.md)

## Rekommenderad demo-setup

For kall-samtal och manga prospects:

1. Hall ett repo.
2. Hall tre basprofiler:
   - `demo-bygg`
   - `demo-tak`
   - `demo-el`
3. Hall tre mall-brancher:
   - `demo-template-bygg`
   - `demo-template-tak`
   - `demo-template-el`

Regel:

1. `profile` = kunddata/mockupdata
2. `branch` = arbetsyta/version

## Snabbkommandon

Skapa profil:

```bash
npm run template:new-profile -- --id <profile-id>
```

Lägg till tjänst + område:

```bash
npm run template:new-location -- --profile <profile-id> --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>"
```

Byt bransch i profil:

```bash
npm run workflow:industry-refactor -- --profile <profile-id> --industry <industry-slug> --industry-singular "<singular>" --industry-plural "<plural>" --service <service-slug> --service-name "<Service Name>" --location <location-slug> --location-name "<Location Name>" --brand-name "<Brand Name>" --brand-short "<BS>" --domain "<domain.se>" --email "<mail@domain.se>" --phone-display "<phone>" --phone-href "tel:+46..." --gbp-category "<GBP Category>" --schema-type "LocalBusiness"
```

Snabb persona-mockup:

```bash
npm run workflow:mockup-persona -- --profile <profile-id> --persona <elektriker|taklaggare|bygg> --city <city-slug> --city-name "<City Name>" --brand-name "<Brand Name>"
```

Validera:

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run template:validate
```

Bygg:

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run build
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run build
```

## Definition of Done

En leverans är klar när:

1. Inga placeholders finns i production profile.
2. `template:validate` passerar i production mode.
3. `build` passerar i production mode.
4. Lokalsidor har unik copy och fungerande CTA.
