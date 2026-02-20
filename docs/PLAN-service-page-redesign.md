# PLAN: Service Page Redesign (Electrician)

## Goal Summary
Redesign the Service/Location page (`/tjanster/[service]/[location]`) to solve "structure fatigue" and high information density. The goal is to make the page feel like a premium, professional local electrician business: authoritative, trustworthy, and easy to scan. The dark theme (`slate-950`) will be kept but refined for better contrast and readability.

---

## 1. Analysis of Current Issues
- **Structure Fatigue:** The page relies heavily on repetitive "Text + Image" and "Grid of Cards" layouts.
- **Information Density:** Large blocks of text in the "Offerings" and "About" sections make it hard to scan quickly.
- **Visual Hierarchy:** Critical trust signals (certifications, guarantees) are buried in text or generic icons.
- **Call-to-Action (CTA):** Standard buttons, could be more compelling for emergency/service needs.

---

## 2. Design Concept: "The Professional Electrician"
- **Vibe:** Reliable, Safe, Certified, Efficient.
- **Key Elements:**
  - **Trust Badges:** Prominent "Auktoriserad Elinstallatör" (Authorized Electrician) badge.
  - **ROT-avdrag:** Clear indications of pricing after tax deduction.
  - **Scannability:** Use bullet points with checkmarks, bold key phrases, and icons instead of paragraphs.
  - **Visual Breaks:** Use distinct background shades (`slate-950` vs `slate-900` vs `brand-900/10`) to separate sections clearly.

---

## 3. Component Breakdown & Redesign

### A. Hero Section (First Impression)
- **Current:** Standard Title/Subtitle/Buttons.
- **New Design:**
  - **Title:** Stronger, location-focused (e.g., "Din Elektriker i [Ort]").
  - **Trust Signals:** Add "4.9/5 snittbetyg" and "Svar inom 1 timme" directly under the title.
  - **Badges:** Add "Elsäkerhetsverket" logo/icon visible immediately.
  - **Image:** Ensure high quality, perhaps with a slight overlay modification for better text contrast.

### B. USP / "Why Choose Us" (Quick Scan)
- **Current:** 4 grid icons.
- **New Design:** 
  - **Horizontal Bar:** A clean row of benefits (e.g., "Fasta priser", "Garanti", "Auktoriserad").
  - **Visuals:** Use larger, custom-feel icons or small illustrations.

### C. Services / Offerings (The "Meat")
- **Current:** Alternating Image/Text blocks (Zig-Zag).
- **New Design:**
  - **Card Grid:** Switch to a clean grid of cards for shorter services to save vertical space.
  - **Interactive Element:** Possibly a simple "Jag behöver hjälp med..." filter/toggle (e.g., "Installation", "Reparation", "Byte").
  - **Content:** Reduce descriptive text. Use a strictly limit of 2-3 sentences + a bullet list of "Vad som ingår".

### D. Pricing (Transparency)
- **Current:** 3 simple cards.
- **New Design:**
  - **"Från-pris" Table:** A cleaner table layout for common jobs (e.g., substance replacement, socket installation).
  - **ROT-toggle:** A toggle switch to show "Pris med ROT" vs "Ordinarie pris". 
  - **Disclaimer:** Clear "Fasta priser efter genomgång" text.

### E. Process (Trust)
- **Current:** Stack of text boxes.
- **New Design:**
  - **Step Visualizer:** A horizontal 1 -> 2 -> 3 timeline view on desktop (vertical on mobile).
  - **Icons:** Use numbers (1, 2, 3) inside circles connecting lines.

### F. Local SEO / Areas (Relevance)
- **Current:** Text block + list.
- **New Design:**
  - **Map Graphic:** (Optional) representation of the service area.
  - **List:** Keep the list but make it a compact multi-column grid.

### G. Sticky Mobile CTA
- **New Feature:** A sticky bottom bar on mobile with two buttons: "Ring [Nummer]" (Green, Important) and "Begär Offert" (Brand Color).

---

## 4. Implementation Steps

### Phase 1: Structure & Layout
1. [ ] **Refactor Hero:** Update `Hero` component to include trust badges and ratings.
2. [ ] **Refactor Services:** Change `Offerings` loop from Zig-Zag to a robust `ServiceCard` grid or optimized list.
3. [ ] **Refactor Pricing:** Implement the `PriceTable` with ROT-logic.
4. [ ] **Refactor Process:** Create a `TimelineSteps` component.

### Phase 2: Content & Visuals
5. [ ] **Typography:** Increase line-height slightly for readability. Use `text-slate-200` instead of `text-slate-300` for main content to increase contrast.
6. [ ] **Spacing:** Increase `gap` between sections to reduce layout fatigue.
7. [ ] **Icons:** Ensure all Lucide icons are consistently sized and colored (`brand-400`).

---

## 5. Verification
- **Mobile Check:** Ensure the new sticky flow works.
- **Readability:** Pass text through a simulator to ensure contrast ratios are accessible.
- **Vibe Check:** Does it look like a generic tech startup or a solid tradesman business? (Aim for the latter).
