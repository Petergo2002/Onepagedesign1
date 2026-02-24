# Workflow B: Byt Bransch

Använd denna workflow när en profil ska byta bransch/erbjudande.

## 1. Inputs

- `profile-id`
- `industry` (slug)
- `industry-singular`
- `industry-plural`
- `service` (slug)
- `service-name`
- `location` (slug)
- `location-name`
- `brand-name`
- `brand-short`
- `domain`
- `email`
- `phone-display`
- `phone-href`
- `gbp-category`
- `schema-type`

## 2. Kör branschrefactor

```bash
npm run workflow:industry-refactor -- --profile <profile-id> --industry <industry-slug> --industry-singular "<singular>" --industry-plural "<plural>" --service <service-slug> --service-name "<Service Name>" --location <location-slug> --location-name "<Location Name>" --brand-name "<Brand Name>" --brand-short "<BS>" --domain "<domain.se>" --email "<mail@domain.se>" --phone-display "<phone>" --phone-href "tel:+46..." --gbp-category "<GBP Category>" --schema-type "LocalBusiness" --clean-existing-pages true
```

Detta uppdaterar profilens:

1. `site.ts`
2. `industry.ts`
3. `services.ts`
4. `testimonials.ts`
5. `locations/*.json`

## 3. Manuella eftersteg

1. Byt placeholders till riktig copy/bilder.
2. Kontrollera att inga gamla branschord finns kvar.
3. Säkerställ att kontaktuppgifter och domän är korrekt.

## 4. Validera och builda

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run build
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=production TEMPLATE_PROFILE=<profile-id> npm run build
```

## 5. DoD för branschbyte

Branschbytet är klart när:

1. All profilcopy är ny och konsekvent.
2. Inga placeholders finns kvar i production mode.
3. Validering + build passerar i production mode.
