---
name: USGAR Hotels Cusco — Inca-Colonial Fusion
colors:
  surface: '#F7F3FA'
  surface-dim: '#EDE7F3'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F5EFFB'
  surface-container: '#ECDFF5'
  surface-container-high: '#E2CEEE'
  surface-container-highest: '#D7BEE7'
  on-surface: '#333333'
  on-surface-variant: '#57534E'
  inverse-surface: '#1C1917'
  inverse-on-surface: '#FAFAF9'
  outline: '#A980BD'
  outline-variant: '#D4BFDE'
  surface-tint: '#4A3056'
  primary: '#4A3056'
  on-primary: '#FFFFFF'
  primary-container: '#E9DFEE'
  on-primary-container: '#351C42'
  inverse-primary: '#D4BFDE'
  secondary: '#EACA1C'
  on-secondary: '#333333'
  secondary-container: '#FBF4D2'
  on-secondary-container: '#B09815'
  tertiary: '#065952'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#CEF0ED'
  on-tertiary-container: '#04403B'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#410002'
  background: '#F7F3FA'
  on-background: '#333333'
  surface-variant: '#E9DFEE'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-base:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button-text:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.03em
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin: 24px
---

## Brand & Style

USGAR Hotels is a boutique retreat in the historic San Pedro neighborhood of Cusco, Peru. The design identity is **"Inca-Colonial Fusion"** — a premium blend of Inca stone masonry's geometric precision with the ornate arches, golden accents, and courtyards of Spanish colonial architecture. This is complemented by **Soft Glassmorphism**, where translucent panels float above atmospheric backgrounds, creating an editorial luxury feel that is modern yet deeply rooted in heritage.

The emotional response: mystical calm, discovery, warm hospitality. Every surface should feel hand-crafted and intentional, never clinical or generic. The UI is transactional (hotel booking) but wrapped in an immersive, museum-quality presentation.

### Two Aesthetic Background Colors
- **Light Mode Background: `#F7F3FA`** — A luminous lavender-mist. Warmer than pure white, with a subtle purple undertone that echoes the brand's primary morado and creates a cohesive, luxurious canvas.
- **Dark Mode Background: `#1A1226`** — A deep plum-midnight. Richer than standard dark grays, with an aubergine-purple undertone that maintains brand continuity and feels distinctly premium rather than generic dark mode.

## Colors

The palette follows the official USGAR Hotels brand guidelines (BRAND.md §3, "Opción 3"):

### Primary (Morados)
- **Morado Oscuro `#4A3056`** — Primary CTAs, headings, navbar active states, brand-defining elements.
- **Morado Medio `#9360AC`** — Hover states, active elements, interactive highlights.
- **Morado Suave `#A980BD`** — Decorative borders, secondary icons.
- **Morado Pastel `#D4BFDE`** — Dark mode secondary text, card backgrounds.
- **Morado Ultra Claro `#E9DFEE`** — Light mode section backgrounds, alternating content blocks.

### Secondary (Dorados/Amarillos)
- **Dorado Oscuro `#B09815`** — Price highlights, star ratings, premium badges.
- **Amarillo Base `#EACA1C`** — Secondary CTA buttons, "Book Now" highlights.
- **Amarillo Suave `#F2DF77`** — Promotion banners, notification backgrounds.
- **Crema Fondo `#FBF4D2`** — Testimonial card backgrounds, quote blocks.

### Tertiary (Verdes/Turquesas)
- **Verde Pino `#065952`** — Success states, direct booking buttons, availability indicators.
- **Turquesa `#0CB2A3`** — Links, interactive details, service icons.
- **Verde Menta `#6DD1C8`** — Service grid icons, amenity indicators.
- **Verde Ultra Claro `#CEF0ED`** — Service card backgrounds.

## Typography
- **Playfair Display** (serif) — Headlines and display text. The "Voice of Heritage". Editorial, classical structure that conveys history and elegance.
- **Montserrat** (sans-serif) — Body copy, buttons, forms, navigation. The "Voice of Utility". Clean geometric clarity for all functional text.

## Layout & Spacing
- 12-column fluid grid. Max content width 1280px.
- Generous whitespace between sections (48px+) for luxury breathing room.
- 4px base unit spacing system.

## Elevation & Depth
- **Glass Panels:** `backdrop-filter: blur(20px)`, white at 70-80% opacity (light) or `#2B1D33` at 80% (dark), with `0.5px` border using `#D4BFDE` at 15% opacity.
- **Golden Glow:** Hovered elements emit soft `#EACA1C` shadow at 20% opacity instead of black drop shadows.
- **Inca Motif:** Subtle geometric patterns (Chakana cross) at 3-5% opacity as watermark on section backgrounds.

## Key UI Features
- **Hero:** Full-viewport with video background revealed through an arched colonial window mask (CSS clip-path). Serif headline centered.
- **Booking Widget:** Glassmorphic horizontal bar floating at the bottom of the hero.
- **Room Cards:** Borderless, soft-shadow, golden price accent, hover zoom on image.
- **Services Grid:** Turquoise icons in glass panels with hover gradient reveal.
- **Navbar:** Transparent over hero → glassmorphic with thin golden bottom border on scroll.