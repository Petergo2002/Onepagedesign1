# Arkitektur och Refaktoreringsguide (Vibe Coder Edition)

Denna webbplats är byggd som en modern, snabb och SEO-optimerad template för hantverkare och serviceföretag. Vi har strukturerat koden så att det ska vara **extremt enkelt** att klona hela detta projekt och lansera för en ny nisch (t.ex. Bygg i Göteborg, Elektriker i Stockholm, Städ i Malmö).

All nisch- och kundspecifik data är utbruten från själva designen och routing-logiken.

Här är en komplett genomgång av var allt ligger och **vad du behöver ändra** nästa gång du ska skapa en ny sajt.

---

## 🏗 Kärnfiler för konfiguration (Det enda du behöver röra vid en ny nisch)

När du sätter upp denna mall för en ny kund eller bransch, finns det i princip **4 huvudfiler/mappar** du behöver uppdatera. Du behöver *inte* gå in i själva sid-komponenterna (`page.tsx`) och ändra texter manuellt.

### 1. `src/config/site.ts`
**Syfte:** Grundläggande företagsuppgifter och varumärke.
**Vad du ändrar här:**
- `brandName` (t.ex. "Svensk Bygg & Snickeri")
- `brandShort` (t.ex. "SBS")
- `domain` (t.ex. "svenskbygg.se")
- `phoneDisplay` & `phoneHref` (Telefonnummer)
- `email` (Kontakt-epost)

### 2. `src/config/industry.ts`
**Syfte:** "Själen" i hemsidans copy. All text på Om oss, Tjänstelistan, Hero-sektionen (startsidan), footern och SEO-metadata.
**Vad du ändrar här:**
- All generell text som ska passa den nya nischen.
- `hero` (Rubriker och brödtext på förstasidan)
- `about` (Siffror för erfarenhet, värdeord/features, vision)
- `contact` (Varför välja oss, platshållare i formuläret)
- `seo` (Titel-suffix och meta-beskrivningar)

### 3. `src/lib/services.ts`
**Syfte:** Definierar vilka tjänster (Pillars) företaget erbjuder. Denna fil driver **Navbaren (Dropdownen)** och **Tjänster-startsidan (`/tjanster`)**.
**Vad du ändrar här:**
- Byt ut objekten i `SERVICES`-arrayen.
- Ändra `slug` (t.ex. `"taklaggning"`), `title`, `shortDesc`, `longDesc` och `image`.

### 4. `src/lib/service-location-pages/data/` (Mappen för Programmatisk SEO)
**Syfte:** Data som driver de extremt konverterande och lokala landningssidorna (t.ex. `/tjanster/bygg-och-snickeri/goteborg`).
**Vad du ändrar här:**
- Skapa en ny `.json`-fil döpt enligt formatet `[service-slug]__[location-slug].json` (t.ex. `taklaggning__stockholm.json`).
- Denna fil innehåller det specifika innehållet för just den stadens rankning (omdömen, lokala processer, vanliga frågor).

---

## 🗺 Vår Routestruktur (App Router)

Hemsidan bygger på Next.js moderna App Router (`src/app/`). Så här är den uppbyggd:

### Huvudsidor (Statisk struktur)
- `/` (`src/app/page.tsx`) - **Startsidan:** Optimerad för konvertering, bygger på texter från `industry.ts`.
- `/om-oss` (`src/app/om-oss/page.tsx`) - **Om oss:** Förtroendebyggande sida.
- `/kontakt` (`src/app/kontakt/page.tsx`) - **Kontakt:** Konverteringsformulär och kontaktuppgifter från `site.ts`.
- `/villkor` & `/integritet` - Legala sidor.

### Service Hub & Spoke (Lokala SEO-strukturen)

1. **Service Hubben (Prydlig översikt)**
   - `/tjanster` (`src/app/tjanster/page.tsx`)
   - Ändamål: Visar upp de tjänster som definierats i `SERVICES` (`src/lib/services.ts`).

2. **Pillar Pages (Tjänstesida)**
   - `/tjanster/[service]` (`src/app/tjanster/[service]/page.tsx`)
   - Exempel: `/tjanster/bygg-och-snickeri`
   - Ändamål: Den djuplodande och premium-designade huvudsidan för en viss tjänst. Genereras via parametrarna i `services.ts`.

3. **Spoke Pages (Lokala landningssidor för Google)**
   - `/tjanster/[service]/[location]` (`src/app/tjanster/[service]/[location]/page.tsx`)
   - Exempel: `/tjanster/bygg-och-snickeri/goteborg`
   - Ändamål: Sidor avsedda att ranka lokalt. Innehållet hämtas helt och hållet från `.json`-filerna i `/lib/service-location-pages/data/`.

---

## 🚀 Checklista för Ny Branch / Kund

När du gör en ny gren eller startar upp detta för en ny kund:

1. [ ] **Uppdatera `site.ts`** med kontaktuppgifter.
2. [ ] **Uppdatera `industry.ts`** med copy för branschen.
3. [ ] **Byt ut bilderna**. Lägg in nya foton i projektet och uppdatera länkarna i `services.ts` och eventuellt `industry.ts`.
4. [ ] **Skapa nya tjänster** i `services.ts` (Glöm inte branschspecifika slugs, e.g. `badrumsrenovering`).
5. [ ] **Skapa en (eller flera) nya JSON-filer** i `src/lib/service-location-pages/data/` för de städer SEO-sidan ska handla om. Ta bort gamla JSON-filer som tillhörde den förra kunden.
6. [ ] Testa din navigation! Eftersom Dropdown-menyn dör den dynamiskt laddar in alla tjänster, bör den fungera magiskt utan att du behöver koda dropdownen igen.

*Följer du detta system har du bokstavligen en ny premiumhemsida rullande på under en timme!*
