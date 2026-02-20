# Onboarding Per Ny Kund (SEO Service + Område)

Detta dokument används varje gång en ny kund onboardas i denna mall.
Målet är att vi alltid samlar rätt input från start och levererar SEO-sidor som kan ranka och generera leads.

## 1. Snabböversikt (Vad kunden köper)

Kunden köper normalt:

- `X` tjänster
- `Y` områden
- Totalt antal SEO-sidor = `X * Y`

Exempel:

- 2 tjänster + 3 områden = 6 lokala SEO-sidor

## 2. Obligatorisk Kundinformation (måste in innan arbete startar)

### A) Företagsbas

- Företagsnamn (exakt, som i Google Business Profile)
- Organisationsnamn för faktura
- Telefonnummer för CTA
- E-post för leads
- Domän
- Stad/region där företaget faktiskt verkar

### B) GBP / Local SEO-data

- Primär GBP-kategori (exakt text)
- Sekundära GBP-kategorier
- Exakt NAP:
  - Name
  - Address
  - Phone
- Länkar för `sameAs`:
  - Facebook
  - Instagram
  - LinkedIn
  - YouTube
  - Apple Maps/Bing/andra profiler (om finns)

### C) Kommersiell scope

- Vilka tjänster ska säljas just nu?
- Vilka områden/städer ska ingå i denna leverans?
- Vilka tjänster ska bara synas kort på startsidan (ej fulla SEO-sidor)?
- Prioriteringsordning (vilken tjänst/ort först)

### D) Lead och affär

- Primär CTA (Ring / Offertformulär / Boka möte)
- Mål per månad (antal leads)
- Budgettak och tidsram
- KPI:er som kunden bryr sig om (samtal, formulär, ranking, trafik)

## 3. Frågor att ställa i första kundmötet (exakta frågor)

1. "Vilka tjänster vill ni få fler förfrågningar på de kommande 3 månaderna?"
2. "Vilka områden är viktigast för er lönsamhet?"
3. "Vilken tjänst + område är högst prioriterad om vi börjar med en sida?"
4. "Hur ser ett bra lead ut för er (privatperson, BRF, företag)?"
5. "Vad är era vanligaste kundproblem per område?"
6. "Har ni lokala case/referenser vi kan använda per stad?"
7. "Vilket telefonnummer och vilken CTA ska vara primär på alla lokalsidor?"
8. "Är er GBP helt uppdaterad med rätt kategorier och tjänster idag?"

## 4. Leverabel-matris (fyll i per kund)

| Tjänst | Område | URL | Status |
|---|---|---|---|
| elinstallation | goteborg | /tjanster/elinstallation/goteborg | planerad |
| ... | ... | ... | ... |

Använd denna matris för att undvika scope-glidning.

## 5. Arbetsflöde i repot (per ny sida)

1. Skapa sida via generator:

```bash
npm run workflow:new-location -- --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>" --gbp-category "<Exakt GBP kategori>"
```

2. Uppdatera JSON:

- Fil: `src/lib/service-location-pages/data/<service>__<location>.json`
- Måste fyllas:
  - `gbpCategory`
  - `businessName`
  - `businessAddress`
  - `sameAs`
  - hela sidcopy (meta, hero, offerings, localProblems, case, FAQ, etc.)

3. Kvalitetskontroll:

```bash
npm run lint
npm run build
```

## 6. Innehållskrav per lokal sida (måste uppfyllas)

- Meta title med lokal intent (kategori + stad)
- Unik lokal hero-copy (inte find/replace)
- Minst 2 hyperlokala signaler i texten:
  - stadsdelar
  - lokalt klimat/byggtyp
  - vanliga lokala problem
- Minst ett lokalt case med utmaning/lösning/resultat
- Lokal FAQ som matchar verkliga frågor
- Relevanta interna länkar till tjänstehub och relaterade tjänster

## 7. Definition of Done per kundleverans

En kundleverans är klar när:

- Alla köpta `tjänst x område`-sidor är byggda
- NAP och GBP-kategori matchar kundens profil
- `npm run lint` och `npm run build` passerar
- Internlänkning finns från tjänstehub till alla lokalsidor
- Kunden har godkänt copy + CTA

## 8. Utanför repot (måste göras för SEO-effekt)

- Uppdatera GBP kategorier och tjänster
- Säkerställ NAP-konsistens över profiler/kataloger
- Publicera/uppdatera viktiga citations
- Skapa externa länkar till nya lokala URL:er
- Mät i GSC + GA4 + samtal/formulärspårning

## 9. Snabb brief-mall att skicka till kund

Kopiera och fyll i:

```text
Kundnamn:
Domän:
Primär GBP-kategori:
Sekundära GBP-kategorier:
Telefon (CTA):
Lead-mail:

Tjänster som ska säljas:
1)
2)
3)

Områden som ska ingå:
1)
2)
3)

Prioritet (först ut):

Lokala case/referenser vi får använda:

SameAs-länkar:
- Facebook:
- Instagram:
- LinkedIn:
- Övrigt:
```

## 10. Viktig princip

Bygg hellre färre men starka sidor än många tunna sidor.

Varje lokal sida ska kännas som en riktig landningssida för en verklig kund i just den staden.
