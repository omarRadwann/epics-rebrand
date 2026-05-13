# Epics Moonshot — Session 1 Walkthrough

> Phase 0 → 1 → 2 of the Moonshot Rebrand Plan.
> Branch: `moonshot`. Run: `pnpm dev` → http://localhost:3000

---

## What shipped this session

A Next.js 15 + React 19 + Tailwind 4 foundation with the first Moon scene
working in isolation. Five things to look at, in order.

### 1. `/` — Home (DOM-only)
The full editorial structure of the new site, but with no 3D yet — pure DOM
on cream paper. Confirms the new design tokens and motion primitives.
Watch for:
- **Hero** — `<SplitText>` reveal on "Bread that doesn't apologise." with
  the EPICS · N°26 · SPECIMEN PANTRY lot ribbon above.
- **Certifications marquee** — ink-black strip under the hero, ISO/Halal
  text scrolling.
- **Stats band** — `<CountUp>` animates 0 → 30, 2010 → 2018, 0 → 24h.
- **Manifesto** — `<SplitText>` on "On the record." + the 60-word anchor
  blockquote in italic Newsreader.
- **Three Shelves tiles** — typographic, with `<Strikethrough>` monograms,
  category counts pulled from `lib/catalog.ts` (gluten-free 20 / sugar-free 6
  / PKU 4).
- **Popular rail** — `<Tilt>` cards with `<Scramble>` lot numbers, six SKUs
  drawn from the real catalogue.
- **Certifications block** — typographic, not a logo strip (per brand-book).
- **Journal teaser** — four entries with brand-correct lot codes.
- **Footer** — real Epics contact info, ISO numbers, halal cert.
- The **custom cursor** (8px dot + 36px ring) follows the pointer with a
  spring lag; ring grows + tints saffron on interactive elements.
- The **animated film grain** is painted onto a 128×128 canvas and stretched
  across the viewport at 4% opacity (multiply blend).
- `prefers-reduced-motion`: kills the grain, freezes FM transitions, and
  swaps Lenis smooth scroll for native scroll.

### 2. `/playground/scene-01-vitrine` — **Moon #1 in isolation**
The hero shot. Scroll the page top → bottom and watch the wheat-grain
particles condense into the EPICS wordmark.

- **Scroll 0%**: vitrine centred, 8000 wheat grains drifting around it,
  cursor pulls them aside locally.
- **Scroll ~50%**: particles begin migrating toward target positions; the
  vitrine starts to rotate + sink.
- **Scroll 100%**: wordmark fully resolved above the receding vitrine.

The scene lives in one fixed R3F canvas (`.canvas-root` in `globals.css`):
`position: fixed; inset: 0; z-index: 0; pointer-events: none`. DOM scrolls
over it.

### 3. `/shop` — All 30 specimens
Static catalogue, no 3D yet. Tilt cards with scramble lot numbers. Mostly
proves the catalogue migrated cleanly.

### 4. `/pku` — Crystal sub-brand
Pomegranate (`--color-stamp #7A2E1F`) replaces saffron throughout. Four
specimens. Confirms the sub-brand styling pipe.

### 5. `/journal`, `/about`, `/not-found`
Brand-voice editorial stubs to fill the Nav's link surface.

---

## How the build is wired

```
┌─────────────────────────────────────────────────────────────┐
│ app/layout.tsx                                              │
│  ├── next/font/google: Newsreader (display) + Tajawal (ar)  │
│  ├── geist/font: Sans + Mono                                │
│  ├── <LenisProvider>  ─── Lenis RAF → useScrollDirector     │
│  │     └── children (page content)                          │
│  ├── <GrainOverlay>  ─── 128×128 canvas, 24fps noise         │
│  └── <Cursor>  ─── 8px dot + 36px ring, FM springs          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │ Page route (e.g. /playground/scene-01-vitrine) │
        │  ├── <Nav />                                     │
        │  ├── <CanvasRoot>  (dynamic, ssr: false)         │
        │  │     └── <Vitrine /> ─── reads scroll director │
        │  └── <main className="relative">  ← stacks above │
        └─────────────────────────────────────────────────┘
```

`lib/hooks/useScrollDirector.ts` is a Zustand store. Lenis writes to it
once per scroll event. R3F's `useFrame` reads from it without subscribing
(no per-frame re-render).

`lib/three/perfBudget.ts` classifies the device on first canvas mount
(desktop-high / desktop-low / mobile / reduced) and feeds particle counts +
postprocessing toggles to every scene. On reduced-motion, the canvas
switches to `frameloop="demand"` so it stops drawing frames.

---

## File map (new things this session)

```
app/
  globals.css                          ← Tailwind 4 @theme tokens
  layout.tsx                           ← fonts, providers, grain, cursor
  page.tsx                             ← home (DOM only)
  not-found.tsx                        ← brand-correct 404
  shop/page.tsx                        ← all SKUs
  pku/page.tsx                         ← Crystal sub-brand
  journal/page.tsx                     ← editorial stubs
  about/page.tsx                       ← five movements
  playground/scene-01-vitrine/page.tsx ← Moon #1 in isolation

components/
  layout/
    LenisProvider.tsx
    GrainOverlay.tsx
    Cursor.tsx
    Nav.tsx
    Footer.tsx
  motion/
    Reveal.tsx
    SplitText.tsx
    Magnetic.tsx
    Marquee.tsx
    Tilt.tsx
    Scramble.tsx
    CountUp.tsx
    PageTransition.tsx
  ui/
    Strikethrough.tsx                  ← ported from old site (the brand monogram)
    SpecimenHeader.tsx
  three/
    CanvasRoot.tsx                     ← single fixed canvas
    scenes/
      Vitrine.tsx                      ← Moon #1
      Loaf.tsx                         ← procedural geometry + fake-SSS material
    particles/
      WheatGrains.tsx                  ← 8000 instances + scroll-driven EPICS condensation

lib/
  motion/eases.ts                      ← entrance/exit curves + springs
  three/perfBudget.ts                  ← tier detection + profile
  hooks/
    useScrollDirector.ts               ← Zustand store
    usePerfTier.ts
  catalog.ts                           ← migrated verbatim (30 SKUs)
  recipes.ts, journal.ts, asset.ts     ← migrated verbatim
```

---

## What's NOT here (and where it goes)

| Item | Phase |
|---|---|
| Moon #1 wired into the home page | Phase 3 |
| Moon #2: three-shelf corridor | Phase 4 |
| Moon #4: extruded manifesto text | Phase 5 |
| Moon #3: specimen-slide product cards | Phase 6 |
| PDP with rotating 3D product hero | Phase 7 |
| Moon #5: stamp room | Phase 8 |
| Arabic RTL mirror with mirrored 3D | Phase 10 |
| Lighthouse pass + a11y audit + production fonts | Phase 11 |

PP Editorial New (paid) is on hold — Newsreader is the fallback, swap is
a single change in `app/layout.tsx` when the license lands.

29LT Bukra (Arabic, paid) is on hold — Tajawal is the fallback.

---

## Known issues to revisit

1. **Headless-preview FPS measurement** unreliable — RAF is throttled by
   Chrome's headless renderer when the tab isn't focused. Real fps test
   must happen in a foreground browser.
2. **The wordmark composition** at scroll-end works visually but the
   letter samples are sparse — could use 2× the points for a denser
   read. Easy refinement.
3. **MeshTransmissionMaterial** with `samples: 8, resolution: 256` is the
   most expensive part of the scene. Worth a perf trace in a real browser
   before Phase 3.

---

## Next session

Wire Moon #1 into the actual home page (Phase 3): canvas-root spans the
hero section, scroll progress 0 → 0.18 drives the same condensation, then
the marquee + manifesto-intro DOM scrolls into view above it.

After that, `/playground/scene-02-corridor` (Moon #2) — same canvas, new
scene: cinematic camera fly-through three illuminated shelves.
