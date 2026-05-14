# Epics Group — Moonshot Rebrand

A complete bespoke rebrand of [Epics Group](https://epics-group.com), an Egyptian manufacturer of gluten-free, sugar-free, and PKU-safe baked goods headquartered at Plot 330, 6th Industrial Zone, 6 October City, Giza.

**Territory:** *The Specimen Pantry* — apothecary, but appetizing. Warm cream paper, ink-black serif headlines, saffron accents, every product catalogued as a numbered specimen with a real lot number.

**This branch (`moonshot`):** fuses the editorial brand with **cinematic 3D, scroll choreography, and physics-grade micro-interactions**. Five "Moon" scenes built on Three.js + React-Three-Fiber + Framer Motion + Lenis. Branch off the editorial baseline kept on `main` (deployed at GitHub Pages).

---

## Stack (moonshot branch)

- **Next.js 15** (App Router, static export) · **React 19** · **TypeScript** (strict)
- **Tailwind v4** (CSS-first `@theme` config) · Geist Sans + Mono · Newsreader (display)
- **Three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing**
- **Framer Motion 12** for all 2D motion · **GSAP** reserved for scroll-locked timelines FM can't express
- **Lenis** smooth scroll → **Zustand** scroll-director store → R3F `useFrame` (no per-frame React re-render)
- **`next/font`** for Google Fonts; production fonts (PP Editorial New, 29LT Bukra) on hold until licenses land

---

## Quick start

```bash
pnpm install
pnpm dev
# → http://localhost:3000                                English home
# → http://localhost:3000/playground/scene-01-vitrine    Moon #1 in isolation
```

Production build (static export → `./out/`):

```bash
pnpm build
```

Useful gates:

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint
```

---

## Five Moon scenes

| # | Scene | Status | Route |
|---|---|---|---|
| 1 | The Specimen Vitrine — rotating museum vitrine, a real specimen loaf in a hairline display case, wheat-grain particles condensing into the EPICS wordmark on scroll | ✅ Phase 2 | `/playground/scene-01-vitrine` |
| 2 | Three Shelves — camera flies through corridor (wheat-gold / cool blue / prismatic) | Phase 4 | `/playground/scene-02-corridor` |
| 3 | Specimen Slides — glass microscope-slide product cards with tilt + chromatic aberration | Phase 6 | `/shop` |
| 4 | On The Record — 3D extruded manifesto text + caustic GLSL backdrop | Phase 5 | `/` (mid-scroll) |
| 5 | The Stamp Room — PBR wax seals / metallic stamps with anisotropic reflection | Phase 8 | `/` (late scroll) |

Performance budget per scene: **60fps @ 1440p on M1 Air**, Lighthouse ≥ 90 desktop / ≥ 80 mobile, initial JS ≤ 350kb gzipped on `/`. Mobile drops particle counts 60%, disables postprocessing. `prefers-reduced-motion` freezes scenes on the hero frame.

See [`docs/walkthrough.md`](./docs/walkthrough.md) for a scroll-by-scroll tour of what's currently shipped.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — manifesto, three-shelves intro, popular rail, certifications, journal teaser. **Currently DOM-only; Phase 3 wires Moon #1 behind the hero.** |
| `/shop` | Full catalogue (30 SKUs from `lib/catalog.ts`) |
| `/pku` | Crystal by Epics PKU explainer — pomegranate accent, 4 specimens |
| `/journal` | Editorial article index |
| `/about` | Five movements founding story |
| `/playground/scene-01-vitrine` | Moon #1 in isolation — scroll to condense particles into EPICS |
| `/not-found` | "Not in this lot." |
| `/ar` | (planned Phase 10) Arabic RTL mirror |

---

## Architecture

```
app/
  layout.tsx         ← fonts + LenisProvider + GrainOverlay + Cursor
  globals.css        ← Tailwind v4 @theme tokens, custom-cursor rules,
                       reduced-motion gate, canvas-root positioning
  page.tsx           ← Home (DOM-only this phase)
  playground/scene-01-vitrine/page.tsx ← Moon #1

components/
  layout/            ← Nav, Footer, LenisProvider, GrainOverlay, Cursor
  motion/            ← Reveal, SplitText, Magnetic, Marquee, Tilt,
                       Scramble, CountUp, PageTransition
  ui/                ← Strikethrough (S-01/S-02/S-03 monograms), SpecimenHeader
  three/
    CanvasRoot.tsx   ← single fixed R3F canvas
    scenes/          ← Vitrine, Loaf (+ Corridor, ManifestoText, StampRoom)
    particles/       ← WheatGrains (+ SugarCrystals)
    materials/       ← (Crust, Caustics, WaxSeal — Phase 5–8)

lib/
  catalog.ts         ← 30 real SKUs (verbatim from epics-group.com)
  recipes.ts, journal.ts
  asset.ts           ← basePath helper for GH Pages
  motion/eases.ts    ← entrance/exit curves + springs (single source of truth)
  three/perfBudget.ts ← tier detection (desktop-high/-low/mobile/reduced)
  hooks/
    useScrollDirector.ts  ← Zustand store, written by Lenis, read by R3F
    usePerfTier.ts

tokens/
  colors.json, typography.json   ← W3C design tokens (sync to globals.css)

docs/
  walkthrough.md     ← session-by-session shipped surface
```

The DOM scrolls; R3F scenes react via `useScrollDirector`. The R3F canvas is `position: fixed; inset: 0; z-index: 0; pointer-events: none` — pure background under the page content.

---

## Decisions locked

- **Project location**: `moonshot` branch of this repo. `main` stays deployable on GitHub Pages as a fallback.
- **Display font**: Newsreader (free, Google Fonts) until PP Editorial New license arrives.
- **UI font**: Geist Sans + Geist Mono (free, Vercel).
- **Arabic font**: Tajawal until 29LT Bukra license arrives.
- **Hosting**: GitHub Pages static export. R3F runs client-only via `dynamic(…, { ssr: false })` so static export holds.
- **Color tokens**: `--paper #F2EFE7`, `--ink #161512`, `--saffron #E07A1B`, `--stamp #7A2E1F` (Crystal) — per Moonshot Brief §4, replacing the `main` branch palette.

---

## Brand fundamentals

Read [`BRAND-BOOK.md`](./BRAND-BOOK.md) end-to-end before changing anything visual. It covers manifesto, brand architecture, Crystal sub-brand rules, color system, type system, specimen language (lot codes, monograms), photography + voice, do/don't pairs, RTL rules, and the 11 anti-patterns rejected on sight.

The plan that produced this branch lives at `C:\Users\acer\.claude\plans\hello-please-analyze-epics-rebrand-hazy-manatee.md`.

---

## Production fonts (licensed, on hold)

The repo ships open-source fallbacks (Newsreader / Geist / Tajawal). Production will swap to:
- **PP Editorial New** — Pangram Pangram (display, variable italic axis)
- **29LT Bukra** — 29LT (Arabic display + text)

Drop `.woff2` files into `public/fonts/` and switch `next/font/google` calls to `next/font/local` in `app/layout.tsx` — single-file change.

---

## Anti-patterns rejected on sight

1. Centered hero with a gradient blob and a "Get Started" button
2. Three identical feature cards with line-icons and one-line descriptions
3. "Trusted by" logo strip on a B2C site
4. Stock photos of smiling families in kitchens
5. Faux-handwritten "fresh & natural" fonts
6. Generic green = healthy, red = bad color logic
7. Every section full-width with the same padding
8. Pastel everything
9. Glassmorphism, neumorphism, or any 2021 holdover
10. Arabic typeset as an afterthought in a default Noto
11. Product cards that look like Shopify defaults
