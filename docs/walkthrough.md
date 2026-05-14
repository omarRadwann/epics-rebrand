# Epics Moonshot — Walkthrough

> Phases 0–11 of the Moonshot Rebrand Plan.
> Branch: `moonshot`. Run: `pnpm dev` → http://localhost:3000

---

## TL;DR

A Next.js 15 + React 19 + Tailwind 4 site for Epics with all five Moon
scenes shipped, wired through a single shared R3F canvas and a measured
scroll-range dispatcher. The static export passes (`pnpm build` →
67 pages, 155 kB initial JS on `/`), the typecheck is clean, and the
GitHub Actions workflow gates on typecheck before deploy.

Routes worth opening, in order:

1. `/` — the home page with four canvas scenes wired in
2. `/shop` — 30 specimen-slide product cards (Moon #3)
3. `/products/euro` — PDP with rotating 3D product hero
4. `/recipes` + `/recipes/chocolate-muffin-recipe` — the method book
5. `/pku` — Crystal sub-brand
6. `/about` — five movements
7. `/ar` — Arabic RTL mirror
8. `/playground/scene-01-vitrine` — Moon #1 in isolation
9. `/playground/scene-02-corridor` — Moon #2 in isolation
10. `/playground/scene-05-stamps` — Moon #5 in isolation

---

## Home page — scroll timeline

A single fixed R3F canvas (`components/three/HomeCanvas.tsx`)
mounts/unmounts scenes by scroll-range. `lib/three/sceneRanges.ts`
is the single source of truth for which scene owns which scroll band,
calibrated against the measured DOM (`scrollH 5013, viewport 900` at
1440px desktop):

| Scroll band | Scene | DOM section behind it |
|---|---|---|
| 0.00 – 0.30 | **Vitrine** (Moon #1) | Hero |
| 0.30 – 0.41 | — | Marquee + Stats (opaque ink, intentional) |
| 0.41 – 0.58 | **Manifesto Extruded Text** (Moon #4) | Manifesto blockquote (transparent over the 3D text) |
| 0.58 – 0.60 | — | Marquee 2 |
| 0.60 – 0.78 | **Three Shelves Corridor** (Moon #2) | Categories — thin typographic ShelfLabels over the 3D scene |
| 0.78 – 0.86 | — | Popular rail (specimen-DOM, no canvas) |
| 0.86 – 0.97 | **Stamp Room** (Moon #5) | Certifications — transparent section with paper-text over the dark 3D stamp room |
| 0.97 – 1.00 | — | Journal teaser + Footer |

The canvas opacity-fades at each scene's fadeIn/fadeOut boundaries so
swaps read as cuts, not pops. Past 0.99 the canvas unmounts entirely.

---

## The five Moon scenes

### Moon #1 — Specimen Vitrine (`components/three/scenes/Vitrine.tsx`)
A real CC0 GLB loaf (`scenes/Loaf.tsx` — Quaternius, ~29 KB, 412 tris,
normalised on load) sits on a dark stone plinth inside a hairline
`lineSegments` display frame — a museum-case skeleton, not a glass
slab. Cheap transmission glass read as a muddy plastic box and buried
the specimen, so it was cut. Lit by a deliberate 3-light studio rig
(warm key / cool fill / warm rim) plus a baker's-lamp point accent;
`ContactShadows` grounds the assembly. A contained field of wheat-grain
instances (`particles/WheatGrains.tsx` — ~500 desktop-high, behind the
loaf) drifts and condenses into the EPICS wordmark on scroll.
Postprocessing: bloom, film grain, vignette — gated by `usePerfTier`.
(DoF was dropped: it blurred the specimen the scene exists to show.)

### Moon #2 — Three Shelves Corridor (`components/three/scenes/Corridor.tsx`)
Catmull-Rom curve flies the camera through three illuminated dioramas,
each on its own dark plinth under a per-shelf 3-light rig:
S-01 the real GLB loaf under a wheat-gold key, S-02 a faceted
icosahedron sugar crystal (glossy `meshPhysicalMaterial`, full
clearcoat, flat shading — no transmission), S-03 a faceted prismatic
cone (clearcoat + iridescence, flat shading). Cheap transmission was
cut here for the same reason as the vitrine. Camera position uses 85%
of the curve length; lookAt uses positionT + 0.15 and drops ~0.5 in Y
so each centrepiece lands framed rather than clipped at the bottom.

### Moon #3 — Specimen Slides (`components/ui/SpecimenSlide.tsx`)
Glass-microscope-slide product cards on `/shop`. On hover the card
lifts (springed y/scale), tilts toward the cursor (max 6deg), and the
product name picks up a chromatic-aberration pass (red/blue offset
layers in mix-blend-screen) plus a film-grain overlay. Lot numbers
scramble on enter-viewport. Numbered "slide tab" hairlines on
top/bottom expand on hover. Pomegranate accents for Crystal PKU.

### Moon #4 — On The Record (`components/three/scenes/ManifestoText.tsx`)
3D extruded "On the record." headline via drei `<Text3D>` (three's
`FontLoader` / typeface JSON under the hood). Sized down and offset
lower-left so it reads as a quiet 3D echo of the small DOM heading
instead of fighting the blockquote in the right column. Rotates
edge-on → face-on → edge-on across local progress, with a subtle
breathing scale at peak readability. Custom GLSL caustic shader on a
16×9 plane behind it (stacked value-noise + smoothstep vignette,
tinted to brand paper), authored as a TS template-string module — no
glsl loader required for Next.js Webpack. Known rough edge: the
typeface JSON is still loaded from the threejs.org CDN — a self-hosted
brand typeface is a separate task.

### Moon #5 — Stamp Room (`components/three/scenes/StampRoom.tsx`)
Three embossed PBR seals (ISO 22000, ISO 9001, Halal) in a dark room
under a single warm spotlight, with a cool fill + warm rim lifting
them off the dark. Each seal is a camera-facing struck disc with a
raised `torusGeometry` gold rim proud of the face and a drei `<Text>`
label on the face. Idle slow rotation gives way to face-on framing at
each seal's centre-scroll moment. Caption typesetting below each in
mono.

---

## How the build is wired

```
┌─────────────────────────────────────────────────────────────┐
│ app/layout.tsx                                              │
│  ├── next/font/google: Newsreader (display) + Tajawal (ar)  │
│  ├── geist/font: Sans + Mono                                │
│  ├── <LenisProvider>  ─── Lenis RAF → useScrollDirector     │
│  │     └── children (page content)                          │
│  ├── <GrainOverlay>  ─── 128×128 canvas, 24fps noise        │
│  └── <Cursor>  ─── 8px dot + 36px ring, FM springs          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │ Page route (e.g. /)                       │
        │  ├── <Nav />                              │
        │  ├── <HomeCanvas>  (dispatcher)           │
        │  │    └── <CanvasRoot>                    │
        │  │         └── active scene per range     │
        │  └── <main className="relative">          │
        └───────────────────────────────────────────┘
```

`lib/hooks/useScrollDirector.ts` is a Zustand store. Lenis writes to
it once per scroll event. R3F `useFrame` reads from it without
subscribing (no per-frame re-render).

`lib/three/perfBudget.ts` classifies the device on first canvas mount
(desktop-high / desktop-low / mobile / reduced) and feeds particle
counts + postprocessing toggles to every scene. On reduced-motion the
canvas switches to `frameloop="demand"` and the grain overlay hides.

`lib/three/sceneRanges.ts` declares the scroll-range registry that
HomeCanvas reads. Each scene accepts an optional `range` prop;
playground pages pass `{ start: 0, end: 1 }` so the full document
scroll drives the isolated scene, while on home the scene resolves
its range from `SCENE_RANGES`.

---

## Verification

| Gate | Status |
|---|---|
| `pnpm typecheck` | ✅ clean (`tsc --noEmit` zero errors) |
| `pnpm build` | ✅ 67 static pages, 155 kB initial JS on `/` |
| Vitrine condenses to EPICS wordmark on scroll | ✅ verified visually at scroll 1.0 of playground |
| Corridor: S-01 / S-02 / S-03 land at scroll 0.0 / 0.55 / 0.95 | ✅ verified in playground |
| Manifesto extruded text rotates face-on at scroll 0.5 of its range | ✅ verified at home scroll 0.48 |
| Stamp Room seals visible on home Certs section | ✅ verified at home scroll 0.90 |
| Arabic /ar mirror reads RTL with native voice | ✅ verified |
| PDP loads with category-specific 3D hero | ✅ verified `/products/euro` |
| `prefers-reduced-motion` kills grain + Lenis + animation | ✅ wired in providers + CSS |

CI workflow now runs `pnpm typecheck` (hard fail) and `pnpm lint`
(soft fail) before the production build step, before the GH Pages
deploy.

---

## Known issues / Phase 12 polish

1. **Headless-preview FPS measurement is unreliable** — Chrome
   headless throttles RAF when the tab isn't focused. Real fps test
   needs a foreground browser + DevTools Perf panel.
2. **Section heights are hardcoded into SCENE_RANGES** — works at
   1440x900, may drift on other viewports. Replace with
   IntersectionObserver-driven ranges that adapt to viewport +
   content edits.
3. **3D mirroring for /ar** — Arabic homepage currently has no
   canvas. To wire Moons in, mirror-flip camera handedness (or use
   `scene.scale.x = -1` on the canvas root) and negate FM `x` values
   in the scene's useFrame.
4. **Manifesto typeface on CDN** — `ManifestoText.tsx` still loads the
   `optimer` typeface JSON from threejs.org. Self-host it under
   `public/fonts/` (or swap to a brand typeface JSON) so the scene has
   no external runtime dependency.
5. **Production fonts still on hold** — PP Editorial New (paid) and
   29LT Bukra (paid). Both swaps are single-file changes in
   `app/layout.tsx` once licenses land. Newsreader + Tajawal are the
   current fallbacks and read well.
6. **Lighthouse pass** needs to happen in a real browser (the headless
   preview's network metrics aren't representative). Initial JS is
   154 kB, well under the 350 kB brief target — Lighthouse score
   should land in the 90s on desktop without further work.

---

## File map

```
app/
  globals.css                            ← Tailwind 4 @theme tokens
  layout.tsx                             ← fonts, providers, grain, cursor
  page.tsx                               ← home (Moons #1, #2, #4, #5 wired in)
  not-found.tsx                          ← brand-correct 404
  shop/page.tsx                          ← 30 specimens via SpecimenSlide
  pku/page.tsx                           ← Crystal sub-brand
  journal/page.tsx                       ← editorial index
  about/page.tsx                         ← five movements
  recipes/page.tsx                       ← method book index (24 recipes)
  recipes/[slug]/page.tsx                ← recipe magazine spread
  products/[slug]/page.tsx               ← PDP with 3D product hero
  products/[slug]/ProductHeroCanvas.tsx  ← client wrapper for the 3D
  ar/layout.tsx                          ← lang=ar, dir=rtl wrapper
  ar/page.tsx                            ← Arabic homepage (native voice)
  playground/scene-01-vitrine/page.tsx   ← Moon #1 in isolation
  playground/scene-02-corridor/page.tsx  ← Moon #2 in isolation
  playground/scene-05-stamps/page.tsx    ← Moon #5 in isolation

components/
  layout/
    LenisProvider.tsx, GrainOverlay.tsx, Cursor.tsx, Nav.tsx, Footer.tsx
  motion/
    Reveal, SplitText, Magnetic, Marquee, Tilt, Scramble, CountUp,
    PageTransition
  ui/
    Strikethrough.tsx, SpecimenHeader.tsx, SpecimenSlide.tsx
  three/
    HomeCanvas.tsx                       ← scene dispatcher
    CanvasRoot.tsx                       ← single fixed canvas
    scenes/
      Vitrine.tsx, Loaf.tsx              ← Moon #1
      Corridor.tsx                       ← Moon #2
      ManifestoText.tsx                  ← Moon #4
      StampRoom.tsx                      ← Moon #5
      ProductHero.tsx                    ← PDP 3D hero
    particles/
      WheatGrains.tsx                    ← ~500 instances + EPICS condensation

lib/
  motion/eases.ts                        ← entrance/exit curves + springs
  three/perfBudget.ts                    ← tier detection + profile
  three/sceneRanges.ts                   ← scroll-range registry
  hooks/
    useScrollDirector.ts                 ← Zustand store
    usePerfTier.ts
  catalog.ts, recipes.ts, journal.ts, asset.ts  ← content (verbatim from main)
```

---

## Next

Phase 12 polish list above. The major-feature work is done — every
Moon scene is built, the home composition reads, and the static
export is clean. What's left is performance trace + visual finishing
+ a11y audit + production fonts.
