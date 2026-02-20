# WORKFLOW: Bransch-Refactor (Demo-Only)

## Syfte

Byt hela mallen från en bransch till en annan med ett kommando, så att du kan:

1. visa en korrekt demo för ny bransch
2. undvika gamla branschrester i copy/data
3. spara utfallet som separat mall för nya kunder i samma bransch

## Viktig förtydligande

I detta dokument betyder "branch" alltid **bransch**, inte git-branch.

## Kommando (obligatoriskt)

```bash
npm run workflow:industry-refactor -- \
  --industry taklaggare \
  --industry-singular "takläggare" \
  --industry-plural "takarbeten" \
  --service taklaggning \
  --service-name "Takläggning" \
  --location stockholm \
  --location-name "Stockholm" \
  --brand-name "TakPartner Stockholm" \
  --brand-short "TP" \
  --domain "takpartner.se" \
  --email "offert@takpartner.se" \
  --phone-display "08-123 45 67" \
  --phone-href "tel:+4681234567" \
  --gbp-category "Takläggare" \
  --schema-type "RoofingContractor" \
  --clean-existing-pages true
```

## Vad kommandot gör

1. Uppdaterar brand-konfig:
`src/config/site.ts`
2. Uppdaterar central branschcopy:
`src/config/industry.ts`
3. Byter tjänstekatalog till ny demo-tjänst:
`src/lib/services.ts`
4. Skapar ny lokal demosida:
`src/lib/service-location-pages/data/<service>__<location>.json`
5. Sätter alla bildfält till `"[BYT BILD]"` för att tvinga bildbyte
6. Skapar workflow-checklista:
`docs/workflows/<industry>-<service>-<location>.md`
7. (default) Städar gamla lokalsidor när `--clean-existing-pages true`

Obs:
Detta workflow uppdaterar inte befintliga djupa bloggartiklar automatiskt. Om de inte passar nya branschen, avpublicera eller skriv om dem.

## Direkt efter körning

1. Byt alla `"[BYT BILD]"` till riktiga, relevanta bilder.
2. Ersätt all `"[ANPASSA TEXT]"` med unik copy.
3. Kontrollera att inga gamla branschord finns kvar i ny sida.
4. Kör:
```bash
npm run lint
npm run build
```

## Definition of Done

1. Ny bransch syns konsekvent i hero, tjänster, kontakt och footer.
2. Navigeringen fungerar (Hem, Tjänster-dropdown, Kontakt).
3. `ContactCTA` ("Redo att starta...") syns på startsidan.
2. Inga gamla branschord kvar i demo-sidans data.
3. Alla bilder är utbytta och laddar.
4. `npm run lint` passerar.
5. `npm run build` passerar.

## Rekommenderat arbetssätt för försäljning

1. Klona repot.
2. Kör kommandot ovan för önskad bransch.
3. Gör manuell copy/bild-finish enligt checklistan.
4. Spara detta som separat branschmall.
5. Repetera för nästa bransch.
