# Workflow A: Lägg till Tjänst + Område

Använd denna workflow för nya lokala SEO-sidor i en profil.

## 1. Inputs

- `profile-id`
- `service-slug`
- `service-name`
- `location-slug`
- `location-name`
- (valfritt) `gbp-category`

## 2. Skapa/uppdatera profil

Om profilen inte finns:

```bash
npm run template:new-profile -- --id <profile-id>
```

## 3. Skapa ny lokalsida

```bash
npm run template:new-location -- --profile <profile-id> --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>" --gbp-category "<GBP Category>"
```

Fil som skapas:

- `profiles/<profile-id>/locations/<service-slug>__<location-slug>.json`

## 4. Fyll all data i JSON

Måste vara ifyllt och unikt:

1. metadata (`metaTitle`, `metaDesc`)
2. hero (`heroTitle`, `heroSubtitle`, `heroImg`)
3. `features`
4. `offerings`
5. `localProblems`
6. `process`
7. `caseStudies`
8. `priceExamples`
9. `areas`
10. `reviews`
11. `faq`
12. `relatedServices`

## 5. Validera och builda

Mockup:

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run build
```

Production:

```bash
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run build
```

## 6. DoD för sidan

Sidan är klar när:

1. Inga placeholders finns kvar i production mode.
2. `faq`, `reviews` och `relatedServices` är ifyllda.
3. Metadata och copy är lokal och unik.
4. Build passerar i production mode.
