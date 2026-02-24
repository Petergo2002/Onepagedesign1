# Workflow C: Snabb Mockup Persona

Anvand denna workflow for kall-samtal nar du vill visa en personlig demo snabbt.

## 1. Inputs

- `profile-id`
- `persona` (`elektriker`, `taklaggare`, `bygg`)
- `city` (slug, t.ex. `stockholm`)
- (valfritt) `city-name`
- (valfritt) `brand-name`

## 2. Kor persona-workflow

```bash
npm run workflow:mockup-persona -- --profile <profile-id> --persona <elektriker|taklaggare|bygg> --city <city-slug> --city-name "<City Name>" --brand-name "<Brand Name>"
```

Exempel:

```bash
npm run workflow:mockup-persona -- --profile default --persona bygg --city goteborg --city-name "Goteborg" --brand-name "Goteborg Byggpartner"
```

Detta uppdaterar profilens:

1. `site.ts`
2. `industry.ts`
3. `services.ts`
4. `testimonials.ts`
5. `locations/*.json`

## 2.1 Basprofiler for snabb demo

Anvand dessa tre profiler som standard:

1. `demo-bygg`
2. `demo-tak`
3. `demo-el`

Snabbstart:

```bash
APP_MODE=mockup TEMPLATE_PROFILE=demo-bygg npm run dev
APP_MODE=mockup TEMPLATE_PROFILE=demo-tak npm run dev
APP_MODE=mockup TEMPLATE_PROFILE=demo-el npm run dev
```

Nar du har ett bokat mote:

1. Valj narmaste basprofil.
2. Kor workflow C pa den profilen med kundens stad + brandnamn.
3. Justera bara copy, kontakt och hero.
4. Visa demon (1 tjanst + 1 omrade ar tillrackligt i mockup).

## 2.2 Branch-strategi

For att undvika kaos med 100+ prospects:

1. Ha fa, stabila mall-brancher (en per persona).
2. Skapa inte branch per prospect i tidigt saljlage.
3. Skapa separat branch for prospect forst nar caset blir seriost.

## 3. Vad du maste justera efter script

1. Ersatt placeholders med riktig copy for den kund du visar demo till.
2. Byt kontaktuppgifter till demo-korrekta uppgifter.
3. Verifiera att tjanstesidan speglar personan (inte gammal branschtext).

## 4. Validera och builda mockup

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run template:validate
APP_MODE=mockup TEMPLATE_PROFILE=<profile-id> npm run build
```

## 5. DoD for mockup-demo

Mockupen ar klar nar:

1. Hero, tjanster och lokalsida matchar vald persona.
2. Ingen uppenbar gammal branschcopy syns.
3. Sidan bygger i mockup mode utan fel.
