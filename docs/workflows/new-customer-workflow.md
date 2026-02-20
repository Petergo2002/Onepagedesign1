# WORKFLOW: Ny Kund (Brand, Copy, Media, SEO)

## Syfte

Detta workflow används varje gång en ny kund kommer in.
Målet är att standardisera hela leveransen: från första möte till färdig publicerad sida med rätt SEO-grund.

Obs:
Om kundens bransch skiljer sig från aktuell mall, kör först `npm run workflow:industry-refactor -- ...` enligt `docs/workflows/bransch-refactor-demo.md`.

## Resultat

När workflowet är klart ska du ha:

- korrekt brandprofil i sidan
- tydlig scope för vilka tjänster och områden som ingår
- färdiga SEO-sidor för köpt `tjänst x område`
- QA-kontrollerad leverans redo för publicering

## Steg 0: Intake och avtalad scope

Checklista:

- [ ] Bekräfta vilka tjänster som ska vara fulla SEO-sidor
- [ ] Bekräfta vilka områden/städer som ingår
- [ ] Bekräfta vilka tjänster som endast ska nämnas kort på startsidan
- [ ] Räkna totalt antal sidor: `antal tjänster * antal områden`
- [ ] Bekräfta leveransordning: vilka sidor byggs först
- [ ] Bekräfta vad som inte ingår i denna leverans

Output:

- signerad scope-matris för produktion

## Steg 1: Kundbrief (frågor du alltid ställer)

Affär och mål:

- [ ] Vilken typ av leads vill ni ha mest av?
- [ ] Vilka tjänster har högst marginal?
- [ ] Vilka områden är viktigast kommande 3 månader?
- [ ] Vad är primär CTA: ring, formulär eller bokning?
- [ ] Ska "Rot-avdrag" vara aktiverat i prislistor? (vi har toggle för det)

Brand:

- [ ] Logotyp (SVG/PNG)
- [ ] Primär och sekundär färg (hex-koder)
- [ ] Typografi eller brand-riktlinjer
- [ ] Tonalitet: premium, trygg, snabb, prisfokuserad
- [ ] Exempel på copy de gillar/inte gillar

Lokalt SEO-underlag:

- [ ] Primär GBP-kategori (exakt text)
- [ ] Sekundära GBP-kategorier
- [ ] NAP: name, address, phone
- [ ] Tjänster i GBP
- [ ] SameAs-länkar: sociala profiler och kataloger

Innehåll:

- [ ] Kundcase med resultat
- [ ] Vanliga kundfrågor
- [ ] Lokala problem per område
- [ ] Bilder/video från riktiga jobb

## Steg 2: Materialinsamling

Checklista:

- [ ] Samla all media i en kundmapp
- [ ] Sortera media per tjänst och område
- [ ] Välj hero-bilder per sida
- [ ] Välj case-bilder per sida
- [ ] Skriv alt-text för viktiga bilder
- [ ] Säkerställ rättigheter för allt material

Rekommenderad mappstruktur:

```text
assets/<kund>/
assets/<kund>/brand/
assets/<kund>/media/
assets/<kund>/media/<tjanst>/
assets/<kund>/media/<tjanst>/<omrade>/
```

## Steg 3: Informationsarkitektur och sidplan

Checklista:

- [ ] Definiera hub-sidor: `/tjanster` (Grid) och `/tjanster/[service]` (ServiceHub)
- [ ] Definiera spoke-sidor: `/tjanster/[service]/[location]` (Huvudsaklig SEO-sida)
- [ ] Säkerställ att `/kontakt` finns och har rätt info
- [ ] Säkerställ internlänkar från hub till alla spokes
- [ ] Markera eventuella framtida sidor som inte byggs nu

Sidmatris:

| Tjänst | Område | URL | Innehållsstatus | Byggstatus |
|---|---|---|---|---|
| elinstallation | goteborg | /tjanster/elinstallation/goteborg | brief klar | planerad |

## Steg 4: Copywriting-process

Checklista:

- [ ] Skapa copybrief per sida
- [ ] Skriv unik hero för tjänst + område
- [ ] Skriv offerings med konkret kundnytta
- [ ] Skriv hyperlokala problem med verkliga signaler
- [ ] Lägg in minst ett lokalt case per sida
- [ ] Skriv lokal FAQ baserat på riktiga frågor
- [ ] Kvalitetssäkra tonalitet mot brand

Kvalitetskrav på copy:

- [ ] Ingen generisk mass-text
- [ ] Ingen enkel city-swap mellan sidor
- [ ] Tydlig lokal relevans i varje sida
- [ ] Tydlig CTA i varje sektion där det behövs

## Steg 5: Produktion i repot

Checklista:

- [ ] Skapa ny sida via generator
- [ ] Fyll JSON-data komplett för sidan
- [ ] Lägg in korrekt GBP-kategori och företagsdata
- [ ] Uppdatera mediafält till rätt bilder
- [ ] Verifiera internlänkar i tjänstehubb

Command:

```bash
npm run workflow:new-location -- --service <service-slug> --location <location-slug> --service-name "<Service Name>" --location-name "<Location Name>" --gbp-category "<Exakt GBP kategori>"
```

Filer att uppdatera per ny sida:

- `src/lib/service-location-pages/data/<service>__<location>.json`

## Steg 6: QA före leverans

Teknisk QA:

- [ ] `npm run lint` passerar
- [ ] `npm run build` passerar
- [ ] `npm run build` passerar
- [ ] Inga brutna länkar eller bilder
- [ ] `ContactCTA` fungerar på startsidan (länkar till /kontakt)
- [ ] Kontaktformuläret på `/kontakt` skickar (verifiera API/logg)

SEO QA:

- [ ] Title följer mönster: `[GBP kategori] [Stad]`
- [ ] Meta description är unik
- [ ] Schema innehåller korrekt `name`, `address`, `sameAs`
- [ ] Internlänkar finns från hub till lokalsidor
- [ ] Sidan känns lokal och unik

Copy QA:

- [ ] Inga gamla branschord kvar
- [ ] Samma tonalitet genom hela sidan
- [ ] CTA och kontaktuppgifter stämmer

## Steg 7: Kundgranskning och revision

Checklista:

- [ ] Skicka staging-länk eller skärmdumpflöde
- [ ] Samla feedback i en lista
- [ ] Gör endast scope-godkända ändringar
- [ ] Bekräfta slutgodkännande skriftligt

## Steg 8: Lansering och efterarbete

I repot:

- [ ] Publicera godkända sidor
- [ ] Kör snabb efter-lanseringskontroll

Utanför repot:

- [ ] Uppdatera GBP vid behov
- [ ] Säkerställ NAP-konsistens i viktiga profiler
- [ ] Skapa externa länkar/citations till nya sidor
- [ ] Sätt upp uppföljning i GSC och GA4
- [ ] Följ upp leads och ranking efter 2 till 6 veckor

## Definition of Done per ny kund

En leverans är klar när:

- [ ] alla avtalade `tjänst x område`-sidor är publicerade
- [ ] brand, copy och CTA är kundgodkända
- [ ] teknisk QA och SEO QA är godkänd
- [ ] uppföljningsplan för resultat är satt

## Snabb start varje ny kund

1. Öppna `docs/onboarding.md`
2. Fyll kundbriefen komplett
3. Skapa sidmatris för scope
4. Kör detta workflow steg för steg
