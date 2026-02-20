# Plan: Contact Page Redesign

**Goal**: Create a professional, trustworthy, and simple Contact page (`/kontakt`) that encourages users to get in touch.

## 1. Analysis & Strategy
The current contact page just wraps the old "landing page section" form. To make it "proffsigt" (professional), we need a dedicated layout that presents contact information clearly alongside the form.

**Design Philosophy**: "Keep it Simple".
- Clean typography.
- Clear distinction between "Get in touch" (Form) and "Direct contact" (Phone/Email).
- trustworthy visuals (Glassmorphism).

## 2. Proposed Layout

### A. Hero Section
- **Title**: "Kontakta Oss"
- **Subtitle**: "Vi hjälper dig med elinstallationer i hela Göteborg."
- **Visual**: Subtle background glow (consistent with site theme).

### B. Main Content (Two-Column Layout on Desktop)

**Left Column: Contact Information**
- **Phone**: Large, clickable number.
- **Email**: `lescentsweden@hotmail.com` (as requested earlier).
- **Hours/Availability**: "Svarar oftast inom 1 timme".
- **Service Area**: Brief mention of Göteborg & surrounding areas.
- **Trust Badge**: "Auktoriserat Elinstallationsföretag".

**Right Column: The Form**
- Reuse the logic from `Contact.tsx` but strip the section-specific padding/headings.
- **Fields**: Namn, Telefon, E-post, Meddelande.
- **Style**: Glassmorphism card, slightly wider/more breathable than the landing page version.

## 3. Implementation Steps

### Phase 1: Component Refactor
1.  **Extract Form Logic**: Create `src/components/contact/ContactForm.tsx` from existing `Contact.tsx`.
    -   Remove the "Begär offert" section headers from the component itself (let the parent page handle headers).
2.  **Create Info Component**: Create `src/components/contact/ContactInfo.tsx`.
    -   Display phone, email, and trust signals nicely.

### Phase 2: Page Assembly
3.  **Update `/kontakt/page.tsx`**:
    -   Implement the 2-column grid layout.
    -   Add the Hero text.

### Phase 3: Polish
4.  **SEO**: Add metadata (title, description).
5.  **Responsive Check**: Ensure stacking order looks good on mobile (Form first or Info first? Usually Info first on mobile for quick access, then form).

## 4. Verification
- [ ] Page allows sending a message (simulated).
- [ ] Phone number is clickable.
- [ ] Layout looks "clean" (not cluttered).
- [ ] No layout shift when switching from Home to Contact.
