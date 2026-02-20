# Plan: Navbar Redesign

> **Goal:** Redesign the navigation bar to be cleaner, more professional ("premium VVS/Electrician vibe"), and improve usability on both desktop and mobile.

## User Constraints & Preferences
- **Theme:** Must match existing "dark mode" / premium aesthetic.
- **Specific Feature:** Visual separator/line between "Hem" and "Tjänster" to indicate structure.
- **Mobile:** Cleaner, better design.
- **Approach:** "Simple plan" but executed well.

## User Review Required
> [!IMPORTANT]
> **Decision Point: Mobile Menu Style**
> Current implementation expands *down*. For a "cleaner" feel, I propose a **Side Drawer (Sheet)** that slides in from the right. This allows for more content without cluttering the screen.
> *Default Plan:* Implement Side Drawer.

## Proposed Changes

### 1. Visual Overhaul (Desktop)
- **Glassmorphism:** Enhanced backdrop blur and subtle borders (`border-white/10`).
- **Layout:**
    - **Left:** Logo (Brand).
    - **Center:** Navigation Links.
    - **Right:** Contact / CTA (Phone & Quote).
- **The "Separator":**
    - Add a vertical divider `div className="w-px h-5 bg-white/10 mx-4"` between the "Hem" link and the "Tjänster" dropdown.
    - This visually separates "Home" (Root) from the "Service Offerings".
- **Typography:** Lighter font weights (`text-slate-300`), highlighting active states with `text-white` or Brand Color.

### 2. Service Dropdown (Desktop)
- **Current:** Simple list.
- **New:** "Mega Menu" style or improved dropdown.
    - Two columns if many services, or just cleaner styling with icons.
    - Subtle animation on enter/exit.

### 3. Mobile Experience (Refactor)
- **Component:** Extract `MobileMenu` to `src/app/components/nav/MobileMenu.tsx` (or keep inside if small, but better to extract).
- **Interaction:**
    - Hamburger menu triggers a **Slide-in Drawer**.
    - "Services" section explicitly grouped.
    - Large, thumb-friendly touch targets.
    - CTAs ("Ring oss", "Offert") placed at the bottom or top for easy access.

## Task Breakdown

### Phase 1: Structure & Desktop
- [ ] Create `NavSeparator` component or style.
- [ ] Refactor Desktop Layout (Flexbox gap adjustments).
- [ ] Implement "Service" dropdown with improved visuals.
- [ ] Add vertical line between "Hem" and "Tjänster".

### Phase 2: Mobile Redesign
- [ ] Build `MobileNav` component (Slide-over).
- [ ] Implement smooth framer-motion animations.
- [ ] styling for list items (cleaner, less text density).

### Phase 3: Polish
- [ ] Verify "Glass" effect on scroll.
- [ ] Check active states (highlight current page).
- [ ] Ensure responsiveness across breakpoints.

## Verification Plan

### Automated Tests
- None currently (visual change).

### Manual Verification
1. **Desktop:**
    - Hover over "Tjänster" -> Dropdown appears smoothly.
    - Check the vertical line between "Hem" and "Tjänster".
    - Scroll down -> Navbar becomes "glassy" / darker.
2. **Mobile:**
    - Click Hamburger -> Menu slides in.
    - Click a link -> Menu closes and navigates.
    - Check touch targets size (min 44px).
