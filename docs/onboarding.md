# Onboarding (Ny Kund)

Denna guide ar ditt exakta flode nar du far en ny kund.

## 1. Hur systemet fungerar

1. Ett repo innehaller all kod.
2. Varje kund far en egen `profile` i `profiles/<kund-id>/`.
3. Branch anvands som arbetsyta/version.
4. `TEMPLATE_PROFILE` bestammer vilken kunds data som visas.
5. `APP_MODE=mockup` for demo, `APP_MODE=production` for skarp leverans.

## 2. Snabb demo under event (5-10 min)

### 2.1 Valt baslage

1. Tak: `demo-template-tak` + `demo-tak`
2. Bygg: `demo-template-bygg` + `demo-bygg`
3. El: `demo-template-el` + `demo-el`

### 2.2 Starta demo

Exempel tak:

```bash
git checkout demo-template-tak
APP_MODE=mockup TEMPLATE_PROFILE=demo-tak npm run dev
```

### 2.3 Minimal personalisering innan visning

Andra endast:

1. `brandName`
2. `phoneDisplay`
3. `email`

Filer:

1. `profiles/<profil-id>/site.ts`
2. (vid behov) `profiles/<profil-id>/locations/*.json`

## 3. När prospect blir varm (egen kundprofil)

### 3.1 Skapa branch + profil

```bash
git checkout -b kund/<kund-id>
npm run template:new-profile -- --id <kund-id>
```

### 3.2 Sätt persona snabbt

```bash
npm run workflow:mockup-persona -- --profile <kund-id> --persona <taklaggare|bygg|elektriker> --city <city-slug> --city-name "<City Name>" --brand-name "<Brand Name>"
```

### 3.3 Kör och kontrollera

```bash
APP_MODE=mockup TEMPLATE_PROFILE=<kund-id> npm run dev
APP_MODE=mockup TEMPLATE_PROFILE=<kund-id> npm run template:validate
```

## 4. Från demo till produktion

### 4.1 Fyll riktig kunddata

1. Kontaktuppgifter
2. Unique copy
3. Riktiga bilder/video
4. FAQ/reviews/related services

### 4.2 Produktionskontroll

```bash
APP_MODE=production TEMPLATE_PROFILE=<kund-id> npm run template:validate
APP_MODE=production TEMPLATE_PROFILE=<kund-id> npm run build
```

## 5. Vercel + doman (per kund)

1. Ett Vercel project per kund.
2. Deploy från kundens branch.
3. Miljovariabler i Vercel:
   - `APP_MODE=production`
   - `TEMPLATE_PROFILE=<kund-id>`
4. Koppla kundens doman till samma Vercel project.

## 6. AI-prompt du kan copy-paste

```text
Jag har en ny kund.
Skapa allt i detta repo med dessa krav:

Kund-id: <kund-id>
Persona: <taklaggare|bygg|elektriker>
Stad: <city-slug>
City Name: <City Name>
Brand Name: <Brand Name>
Telefon: <phone>
Email: <email>

Gor detta:
1) skapa branch kund/<kund-id>
2) skapa profile <kund-id>
3) kor workflow:mockup-persona
4) uppdatera brand/contact i profile-filer
5) kor mockup validate
6) ge mig exakt kommando for att starta demo
```

## 7. Vanliga misstag

1. Fel `TEMPLATE_PROFILE` i terminalen.
2. Jobb pa fel branch.
3. Placeholder/copy kvar vid production build.
4. Ingen restart av dev-server efter stor profilandring.
