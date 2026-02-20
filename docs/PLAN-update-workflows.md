# Plan: Update Workflows

**Goal**: Align `docs/workflows/*.md` with the recent architectural changes (Multi-Page Navigation, Dedicated Contact Page, New Service Page Components).

## 1. Analysis of Changes
The following recent changes impact our standardized workflows:
- **Navigation**: Moved from Anchor Links (`/#omoss`) to Multi-Page (`/kontakt`, `/tjanster`).
- **Contact**: Replaced Home Page Form with `ContactCTA` + Dedicated `/kontakt` page.
- **Service Pages**: Refactored to use `ServiceHero`, `ServiceGrid`, `PricingTable` (component-based).

## 2. Workflows to Update

### A. `docs/workflows/bransch-refactor-demo.md`
- **Current**: Mentions verifying "hero, tjänster, om oss, kontakt" as sections.
- **Update**:
    - Clarify that "Kontakt" is now a separate page.
    - Add checkpoint to verify `ContactCTA` on the start page.
    - Add checkpoint to verify the "Hybrid One-Pager" flow (Home -> Service -> Contact).

### B. `docs/workflows/new-customer-workflow.md`
- **Current**: Focuses on "Hub" and "Spoke" pages but might miss the new "Trust" components.
- **Update**:
    - **Steg 3 (Arkitektur)**: Explicitly mention the standard pages: Home, Contact, Service Hub, Service Location Pages.
    - **Steg 6 (QA)**: Add check for `/kontakt` form functionality and `ContactCTA` links.
    - **Steg 1 (Brief)**: Add specific question about "Rot-avdrag" settings (since we added a toggle for it).

## 3. Implementation Steps

1.  **Modify `bransch-refactor-demo.md`**:
    -   Update "Definition of Done".
    -   Update manual verify steps.
2.  **Modify `new-customer-workflow.md`**:
    -   Update "Steg 3" with new page structure.
    -   Update "Steg 6" with new component QA checks.

## 4. Verification
- [ ] Read through updated workflows to ensure they make sense for a *new* developer.
- [ ] Confirm no "dead" instructions (referring to deleted files like `Contact.tsx`).
