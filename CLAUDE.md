# CLAUDE.md -- GelbIt - אתרי פרימיום

## What This Is
Generated website for GelbIt - אתרי פרימיום (tech). Built by the Gelbit pipeline.

## Tech Stack (LOCKED)
- React 19 + Vite 8
- Tailwind CSS 4 (CSS-first config -- NO `tailwind.config.js`, use `@theme` in CSS)
- Framer Motion 12 -- import from `"motion/react"` (NOT `"framer-motion"`)
- Lucide React -- icons (import from `"lucide-react"`)
- react-router-dom 7 -- client-side routing
- react-helmet-async 3 -- meta tags and SEO

## Data Source
ALL text content MUST come from `src/data/business.json`. NEVER invent testimonials, stats, phone numbers, addresses, business hours, or any factual content. If data is missing from the manifest, leave a placeholder comment `{/* TODO: missing from manifest */}` -- NEVER fabricate.

## Zero Hallucination Policy
This is the #1 quality rule. Every piece of factual content on this site must trace back to the client manifest or verified public sources. Violations include:
- Inventing a phone number
- Making up a testimonial or review
- Creating fake statistics ("20 years of experience", "1000+ happy clients")
- Adding an address not in the manifest
- Fabricating business hours

If caught, the content MUST be removed or replaced with real manifest data.

## RTL Rules
This is a Hebrew RTL site. The root `<html>` element has `dir="rtl"` and `lang="he"`.

Use ONLY logical Tailwind properties:
- `ms-*` / `me-*` (NOT `ml-*` / `mr-*`)
- `ps-*` / `pe-*` (NOT `pl-*` / `pr-*`)
- `text-start` / `text-end` (NOT `text-left` / `text-right`)
- `start-*` / `end-*` (NOT `left-*` / `right-*`)
- `border-s-*` / `border-e-*` (NOT `border-l-*` / `border-r-*`)
- `rounded-s-*` / `rounded-e-*` (NOT `rounded-l-*` / `rounded-r-*`)

## Forbidden Patterns
1. **No px units** for font-size or container dimensions -- use `rem`, `%`, `vw`
2. **No div buttons** -- use `<button>` for actions, `<a>` for navigation
3. **No horizontal scroll** -- all content must fit viewport
4. **No broken links** -- external links need `target="_blank" rel="noopener noreferrer"`
5. **No fake data** -- see Zero Hallucination Policy above
6. **No absolute spacing** -- use Tailwind spacing scale

## Component Patterns
- Functional components only (no class components)
- Props interface defined above each component
- Destructure props in function signature
- Framer Motion entrance animations with `whileInView` and `viewport={{ once: true }}`
- Respect `prefers-reduced-motion` with `useReducedMotion()` hook
- All images need Hebrew `alt` text

## File Structure
```
src/
  components/
    layout/       -- Header, Footer, Navigation
    sections/     -- Hero, About, Services, Contact, etc.
    ui/           -- Button, Card, Badge, etc.
    shared/       -- Accessibility widget, WhatsApp FAB, Loading screen
  pages/          -- Route page components
  data/           -- Business data JSON
  hooks/          -- Custom React hooks
  lib/            -- Utilities
  styles/         -- Global CSS (Tailwind)
  App.tsx         -- Root component with router
  main.tsx        -- Entry point
```

## Footer
Every page MUST include the footer credit: "Created by GelbiWebsites"

## Accessibility (IS 5568 / WCAG 2.1 AA)
- Full 8-function accessibility widget
- ARIA labels in Hebrew
- Focus indicators on all interactive elements
- 4.5:1 minimum contrast ratio
- 44px minimum touch targets
- No hover-only interactions

## SEO
- JSON-LD LocalBusiness Schema
- Unique `<title>` and `<meta name="description">` per page
- Open Graph tags for social sharing
- `sitemap.xml` in public directory
