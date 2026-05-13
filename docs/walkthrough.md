# Epics Moonshot — Session Walkthrough

> Phases 0–4 of the Moonshot Rebrand Plan.
> Branch: `moonshot`. Run: `pnpm dev` → http://localhost:3000

---

## What shipped this session

A Next.js 15 + React 19 + Tailwind 4 foundation with the first Moon scene
working in isolation. Five things to look at, in order.

### 1. `/` — Home (with Moons #1, #4, #2 wired in)
A single fixed R3F canvas hosts three scenes that swap based on a
measured-to-DOM scroll-range registry (`lib/three/sceneRanges.ts`):

  - **scroll 0.00 – 0.30** → Vitrine (Moon #1) plays through the hero
  - **scroll 0.41 – 0.58** → "On the record." extruded text (Moon #4)
    plays through the Manifesto section, behind the 60-word blockquote
  - **scroll 0.60 – 0.78** → Three Shelves corridor (Moon #2) plays
    through the Categories section, with the wheat-gold S-01 / cool-blue
    S-02 / prismatic S-03 dioramas visible between the category tiles

`HomeCanvas` (`components/three/HomeCanvas.tsx`) reads scroll progress
and mounts/unmounts scenes by range; the canvas wrapper opacity-fades
at each range boundary so swaps read as cuts, not pops. After the last
canvas scene (corridor) ends at 0.96, the canvas unmounts entirely and
releases the WebGL context.

Known polish item for Phase 11: the Category tile DOM cards partially
occlude the corridor in the middle viewport; making them taller/wider
hides the wheat-gold loaf trio behind the centre tile. Either thinning
the tiles into typographic labels (along the viewport edges) or moving
them ABOVE the corridor zone would let the 3D dominate. Confirms the new design tokens and motion primitives.
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

### 2b. `/playground/scene-02-corridor` — **Moon #2 in isolation**
The three-shelves corridor. Scroll the page top → bottom and the camera
flies along a Catmull-Rom curve through three illuminated diorama spaces.

- **Scroll 0%**: corridor entrance, S-01 (Gluten-Free) wheat-gold spotlight
  on a trio of stacked loaf blocks.
- **Scroll ~55%**: camera passes S-02 (Sugar-Free) — cool blue light on a
  crystalline icosahedron sugar cube with transmission.
- **Scroll ~95%**: camera approaches S-03 (Crystal · PKU) — prismatic
  refractive cone with chromatic aberration.

Camera position uses 85% of the curve; lookAt uses (positionT + 0.15) so
the camera always looks forward of itself, and at scroll-end the look
lands on the final anchor. Corridor reads as a single shared space — no
canvas swaps.

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

| Item | Phase | Status |
|---|---|---|
| Moon #1 wired into the home page | Phase 3 | ✅ done |
| Moon #2: three-shelf corridor | Phase 4 | ✅ done (in playground) |
| Moon #2 wired into the home page (Categories section) | Phase 5 | next |
| Moon #4: extruded manifesto text | Phase 5 | |
| Moon #3: specimen-slide product cards | Phase 6 | |
| PDP with rotating 3D product hero | Phase 7 | |
| Moon #5: stamp room | Phase 8 | |
| Arabic RTL mirror with mirrored 3D | Phase 10 | |
| Lighthouse pass + a11y audit + production fonts | Phase 11 | |

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

Promote Moon #2 (corridor) into the home page Categories section: extend
`HomeCanvas` from a single Vitrine mount to a scene dispatcher that swaps
based on `useScrollDirector.scene` (`vitrine` → `corridor`). Scroll
0.18..0.35 owns the corridor; same canvas, no remount.

Then Moon #4 (extruded "On the record." manifesto text) for the next
scroll band 0.35..0.50.
