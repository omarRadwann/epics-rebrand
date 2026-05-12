# Epics Group — Brand Book

> Specimen Pantry · MMXXVI · Issue 01
>
> *A new hire should be able to onboard from this document in one hour.*

---

## 0. Table of Contents

1. [The Manifesto](#1-the-manifesto)
2. [Brand Architecture](#2-brand-architecture)
3. [Logo & Wordmark](#3-logo--wordmark)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [The Specimen Language](#6-the-specimen-language)
7. [Photography & Illustration](#7-photography--illustration)
8. [Voice & Tone](#8-voice--tone)
9. [25 Headline Specimens](#9-25-headline-specimens)
10. [Do / Don't Pairs](#10-do--dont-pairs)
11. [Crystal by Epics — Endorsed Sub-Brand Rules](#11-crystal-by-epics--endorsed-sub-brand-rules)
12. [Arabic & RTL](#12-arabic--rtl)
13. [Anti-Patterns — Rejected on Sight](#13-anti-patterns--rejected-on-sight)
14. [Files & Where Things Live](#14-files--where-things-live)

---

## 1. The Manifesto

**Read this before changing anything.** Every visual, verbal, and editorial decision answers to it.

> We bake food for bodies that don't negotiate. Wheat-free, sugar-free, PKU-safe — engineered in 6th of October, certified to ISO 22000 and ISO 9001, catalogued like a museum specimen. Every loaf carries a lot number. Every recipe carries a real measure. We don't romanticise our limits; we publish them. Welcome to the pantry of people who read the label.

— *Epics, First Printed MMXXVI · 6th of October City*

### One-line territory

*A pantry catalogued like a museum: warm cream paper, ink-black serifs, saffron accents, every loaf numbered like a specimen — clinical precision rebuilt as appetite.*

### Three things this brand is

1. **Specific.** Real lot numbers. Real measures. Real certifications.
2. **Warm.** Cream paper, literary serif, hand-set type. Never sterile.
3. **Egyptian.** Made in 6th of October. Arabic at lead-grade, never default Noto.

### Three things this brand is not

1. **Faux-rustic.** No kraft paper. No chalk fonts. No farmhouse signage.
2. **Pharmaceutical.** No lab coats. No clinical white. No medical-iconography cliché.
3. **Apologetic.** Free-from food is not a deficit. We don't ask permission for it.

---

## 2. Brand Architecture

### Master brand

**Epics.** The wordmark and master mark. Always dominant on packaging and digital.

### Line endorsement (descriptors, not sub-brands)

- `Epics · Gluten-Free`
- `Epics · Sugar-Free`

Lines are descriptors — they identify a shelf, not a separate identity.

### Endorsed sub-brand: Crystal by Epics — PKU

`Crystal` is an endorsed sub-brand reserved for the PKU specialist range. It has its own visual gravity (pomegranate accent in place of saffron) but always carries the *by Epics* endorsement and never appears without it.

**Correct lockups:**
- `Crystal by Epics`
- `Crystal · by Epics · PKU`
- `Epics · Crystal · PKU` *(when listed alongside other lines)*

**Incorrect lockups:**
- `Crystal` (alone, no endorsement)
- `Crystal Foods`
- `Crystal Epics` *(no "by")*

See [§11](#11-crystal-by-epics--endorsed-sub-brand-rules) for full rules.

---

## 3. Logo & Wordmark

The wordmark is the master mark. There is no graphic logo — only the typographic wordmark *Epics* set in **Untitled Serif** (production) / Newsreader (open fallback) at the appropriate scale.

### Clear space

Minimum clear space around the wordmark = the height of the "p" character on all four sides.

### Minimum sizes

- Digital: 24px height
- Print: 8mm height
- Packaging: 12mm height

### Sizing relative to "Crystal"

When Crystal appears in a lockup with Epics, **Epics is always larger** by at least 25% of cap height. Crystal is set in the same family at the same baseline.

### Don'ts

- Don't stretch, italicise, outline, drop-shadow, or recolor the wordmark.
- Don't lock it up with any other graphic mark.
- Don't use as a pattern, watermark, or repeating background.

---

## 4. Color System

Six tokens, two modes (light/dark). All available as CSS custom properties in `app/globals.css` and as Tailwind utilities in `tailwind.config.ts`.

| Token | Light | Dark | Role | Tailwind class |
|---|---|---|---|---|
| `cream-paper` | `#F5EFE2` | `#1A1817` | Primary surface — warm white, lightly toothed | `bg-cream-paper` |
| `ink-black` | `#1A1817` | `#F5EFE2` | Display + headline | `text-ink-black` |
| `saffron` | `#D4801B` | `#C97719` | Sole saturated accent — buttons, callouts | `bg-saffron`, `text-saffron` |
| `pomegranate` | `#8E2A2A` | `#7E2424` | PKU / Crystal-by-Epics range only — gravity color | `bg-pomegranate`, `text-pomegranate` |
| `linen-mid` | `#DCD2BD` | `#3A3631` | Quiet ground / table fills / specimen tile backgrounds | `bg-linen-mid` |
| `charcoal-sub` | `#4A4641` | `#B6B0A6` | Body text, secondary nav | `text-charcoal-sub` |

### Rules

- **Saffron is the sole saturated accent** for the master brand. Buttons, links on hover, decorative numerals.
- **Pomegranate is the gravity color, reserved for PKU and Crystal-by-Epics.** It does not appear on master-brand pages.
- **Cream-paper and ink-black are the only "background" pair.** Never put text on linen-mid for body copy — use cream-paper or ink-black.
- **Dark mode inverts cream-paper ↔ ink-black** and slightly desaturates saffron/pomegranate. Defined via CSS custom properties at the `:root` and `[data-theme="dark"]` selectors.

### Forbidden

- ❌ Generic "healthy = green" semantics. We do not use green at all on consumer-facing surfaces.
- ❌ Pastel anything.
- ❌ Gradients across the brand color tokens.

---

## 5. Typography

### Production fonts (licensed, self-host under `/public/fonts/`)

| Slot | Family | Foundry | License |
|---|---|---|---|
| Latin display | **Untitled Serif** | Klim Type Foundry | Web + commercial |
| Latin text | **Söhne** | Klim Type Foundry | Web + commercial |
| Latin mono | **GT America Mono** | Grilli Type | Web + commercial |
| Arabic display | **29LT Bukra Bold** | 29LT | Web + commercial |
| Arabic text | **29LT Bukra Regular** | 29LT | Web + commercial |

### Open-source fallbacks (loaded via `next/font/google` in `app/layout.tsx`)

| Slot | Fallback family | Why |
|---|---|---|
| Latin display | Newsreader | Closest free analog to Untitled Serif — high-contrast literary serif |
| Latin text | Inter | Universally available, neutral, technical |
| Latin mono | JetBrains Mono | Closest free analog to GT America Mono |
| Arabic display + text | Tajawal | Closest free analog to 29LT Bukra — modern geometric Arabic |

### Type scale

| Style | Size / Line | Tracking | Use |
|---|---|---|---|
| Display | 72 / 76 px | -2% | Hero headlines |
| H1 | 48 / 53 px | -1.5% | Section heads, product names on PDP |
| H2 | 32 / 37 px | -1% | Sub-section heads, card titles |
| Subhead | 20 / 26 px | 0 | Lead paragraphs |
| Body | 16 / 25 px | 0 | Default body |
| Small | 13 / 20 px | +0.5% | Captions, secondary nav |
| Spec | 12 / 17 px | +8%, UPPERCASE | Nutrition spec, ingredient table headers |
| Lot | 11 / 15 px | +12%, UPPERCASE | Lot numbers, batch codes, specimen IDs |

### Rules

- **Latin display is serif. Always.** Body is sans. Mono is for spec/lot only.
- **No mid-weight serif** — display is Regular, body is Regular, captions are Regular. Hierarchy is by size, not weight.
- **Italic exists** and is used deliberately for emphasis ("our limits.") — not for accent words generally.
- **Tracking is negative on display, positive on mono.** This is the visual signature.

---

## 6. The Specimen Language

The brand reads as a catalogue. Every product, every recipe, every certification, every section gets an identifier in mono.

### Numbering conventions

| Prefix | Use | Example |
|---|---|---|
| `Loaf NN` | Baked goods SKU | Loaf 03 — European Baking Mix |
| `Bake NN` | Sweet bake SKU | Bake 07 — Brownies Mix |
| `Mill NN` | Flour / starch SKU | Mill 02 — Soft (All-Purpose Flour) |
| `P-NN` | Pantry staple | P-04 — Cocoa Powder |
| `Cereal NN` | Cereal SKU | Cereal 06 — Choco Pops |
| `Dairy NN` | Dairy product | Dairy 11 — Whipping Cream · Sugar-Free |
| `PKU NN` | Crystal range | PKU 21 — Low-Protein Flat Bread Mix |
| `S-NN` | Free-from strikethrough monogram | S-01 (wheat), S-02 (sugar), S-03 (protein) |
| `R-NN` | Recipe | R-01 — The European Loaf |
| `C-NN` | Category section | C-01 (Gluten-Free), C-02 (Sugar-Free), C-03 (Crystal · PKU) |
| `X-NN` | Certification | X-01-A (ISO 22000), X-01-B (ISO 9001), X-01-C (Halal) |
| `J-NNN` | Journal article | J-001 |
| `F-NN` | Footer section / footnote | F-01 (Colophon) |
| `M-NN` | Manifesto block | M-01 |
| `LOT YY-NNNN` | Production lot | LOT 22-1138 |

### The Specimen Header (component)

The header that lives at the top of every product page and recipe page:

```
UNIT  LOAF 03 ·  NAME  EUROPEAN BAKING MIX ·  WEIGHT  500G ·  FREE FROM  S-01 ·  LOT  22-1138 ·  ISO  22000
```

Set in mono, +12% tracking, UPPERCASE, hairline-ruled above and below.

See `app/_components/SpecimenHeader.tsx`.

### Free-from strikethrough monograms

The brand's signature visual device. Drawn as hairline SVG, ink-black on cream. Three variants:

- **S-01 — Wheat · Struck** — gluten-free
- **S-02 — Sugar · Struck** — sugar-free
- **S-03 — Protein · Struck** — PKU-safe

Implemented in `app/_components/Strikethrough.tsx`. Never recolor to green-for-healthy. Never fill them.

---

## 7. Photography & Illustration

### Photography brief (80 words — this is the brief, exactly)

Products are photographed on warm cream plinths (linen-textured stoneware or unfinished MDF, no props) under a single side-light at roughly 30° elevation, producing one clean shadow with a soft umbra. Color grading favors warm-neutral whites and the saffron-accented packaging; no cool tones, no gradient backgrounds. Surface texture is visible — flour dust, crumb, oat. Editorial illustration (when used) is hairline-weight line art, ink-black on cream, drawn at one consistent stroke weight. No 3D renders. No stock.

### Specific don'ts

- ❌ Wooden cutting boards.
- ❌ Marble surfaces.
- ❌ Hands "in the moment" — flour dust mid-throw, dough mid-stretch.
- ❌ Smiling families. Children. Lifestyle.
- ❌ Backlit dramatic moodboards.
- ❌ Top-down flat-lays as the only angle.

### Illustration

Used sparingly. Always hairline (0.5–0.75 stroke), ink-black on cream, no fills. Reference: the wheat / sugar / protein monograms in `Strikethrough.tsx` set the tonal ceiling.

---

## 8. Voice & Tone

### Default register

- Direct. Specific. Confident without volume.
- Numbers first when possible. (*"22 minutes. Then rest 10."*)
- Prefer a short declarative sentence to a long descriptive one.
- Footnotes are real footnotes — small mono, numbered, never decorative.

### What we say a lot

- "We publish…"
- "Engineered in 6th of October."
- "Certified to ISO 22000."
- "Lot NN-NNNN."
- "Per piece, not per 100g."
- "We don't apologise."

### What we never say

- ❌ "Healthy" (the word is meaningless; show the numbers).
- ❌ "Natural" / "wholesome" / "lovingly crafted" (decorative, not informative).
- ❌ "Family" / "family-owned" / "family recipe" (faux-rustic).
- ❌ "Premium" / "artisanal" / "handcrafted" (defensive marketing language).
- ❌ "Your little PKU warrior" or any patronising treatment of medically managed audiences.

### Tonal shifts

| Surface | Default tone | Why |
|---|---|---|
| Homepage / Categories / Recipes | Confident, slightly dry | Master brand voice |
| Crystal / PKU explainer | Precise, plain, never cute | The audience is anxious parents — gravity over personality |
| Recipe method | Imperative, terse, real-measure | Methods are instructions, not stories |
| Footer / certifications | Documentary, archival | These are facts of record |

### Bilingual voice

The Arabic voice is the same brand voice, written natively — not translated from English. It's Egyptian Modern Standard with editorial confidence. It uses italic accents the way the English does and ends pull quotes with the same dry restraint.

---

## 9. 25 Headline Specimens

Use these as the bar for any new headline written for the brand. If your headline is softer, less specific, or more decorative than these — try again.

1. *Bread that doesn't apologise.*
2. *Loaf 03 — European Baking Mix. Wheat-free. Engineered in 6th of October.*
3. *We publish our recipes the way pharmacists publish dosages.*
4. *Sugar-free, milk-free, certified to ISO 22000. We'll show you the lot number.*
5. *Crystal by Epics. PKU-safe food, made for the families who measure protein in milligrams.*
6. *Made for bodies that don't negotiate.*
7. *Every label is a footnote. Every footnote is true.*
8. *Cocoa. Powder. Code: P-04.*
9. *Pancakes are not a medical decision. They are now.*
10. *We don't romanticise our limits. We publish them.*
11. *On the record.*
12. *Three shelves. Each serves a different body. Each body deserves the same gravity.*
13. *Selling fastest, by lot.*
14. *Low-protein food, measured in milligrams.*
15. *We don't hide the third shelf.*
16. *The lot number is the warranty.*
17. *Why we list phenylalanine in milligrams.*
18. *Not in this lot.* *(for 404)*
19. *Your pantry.* *(for cart)*
20. *Bread that scores. Brownies that fudge. Cereal that doesn't require an explanation.*
21. *22 minutes. Then rest 10. We are serious about this.*
22. *We answer the phone Saturday to Wednesday, 9 to 4.*
23. *If your loaf doesn't turn out the way you expected, photograph the crumb, send it to us.*
24. *Crystal is the line we exist for.*
25. *Made in 6 October. Audited annually. We will show you the binder.*

---

## 10. Do / Don't Pairs

| ❌ Don't | ✅ Do | Why |
|---|---|---|
| "Premium gluten-free products for a healthier you" | "Bread that doesn't apologise. Made in 6th of October City, certified to ISO 22000." | The first is decorative. The second is informative + specific. |
| Stock photo of smiling family in kitchen | Single product, side-lit, on cream plinth | Smiling-family photography is the universal signature of brands without an opinion |
| Three identical line-icon "feature" cards | Three category tiles with typographic treatment, real counts, real summaries | Line-icon trios are AI-design-tool default. Avoid. |
| `<span>Gluten-Free</span>` slapped onto a card | Designed strikethrough monogram (S-01) with hairline rule | The badge is a brand mark, not a sticker |
| "Get Started →" CTA on hero | "BROWSE THE PANTRY →" set in mono +8% tracking | Specific verb, brand-voice. Never generic CTAs. |
| Logo strip "Trusted by Carrefour, Spinneys, Gourmet" | Typographic certification specimens — ISO 22000, ISO 9001, Halal | We are a B2C brand, not B2B. Logo strips are theatre. |
| Pastel pink for sugar-free, pastel green for gluten-free | Saffron accent everywhere, pomegranate only for Crystal/PKU | Color carries meaning, not decoration |
| Arabic typeset in default Noto | Arabic in 29LT Bukra (production) / Tajawal (fallback) | Arabic at lead-grade is the whole point |
| `Crystal Foods` as standalone brand on a Crystal product page | `Crystal by Epics — PKU` lockup, always endorsed | Crystal does not exist without the endorsement |
| "Oops! Page not found." 404 | A struck-through 404 specimen card with "Not in this lot." | 404s are an opportunity to demonstrate brand discipline |

---

## 11. Crystal by Epics — Endorsed Sub-Brand Rules

### When to use Crystal

Only for SKUs in the PKU specialist range. Currently:
- Crystal · Low-Protein Flat Bread Mix
- Crystal · Low-Protein Pasta
- *(four more in development)*

### Visual differentiators

- **Color**: Pomegranate (`#8E2A2A`) replaces saffron as the accent on Crystal pages and packaging
- **Surface**: Cream-paper with a `8% pomegranate` tint (`rgb(var(--pomegranate)/0.08)`)
- **Type**: Crystal wordmark is set in `italic` Untitled Serif at 1× the Epics master mark size

### Lockup grammar (correct)

- `Crystal by Epics`
- `Crystal by Epics — PKU`
- `Epics · Crystal · PKU` *(when in a list of lines)*

### Lockup grammar (incorrect)

- `Crystal` (no endorsement)
- `Crystal Foods`
- `Crystal Epics` (missing "by")
- `Crystal™` (no trademark glyph; the lockup is the mark)

### Page treatment

The PKU explainer microsite (`/pku`) is the only place Crystal owns the entire page. Elsewhere, Crystal appears as an endorsed callout — never displacing the master brand.

### Voice on Crystal surfaces

Gravity over personality. Numbers per piece. No "PKU warrior" language. No cuteness.

---

## 12. Arabic & RTL

### Implementation

- Arabic routes live under `/ar/*` (see `app/ar/page.tsx`, `app/ar/layout.tsx`).
- Layout wrapper sets `lang="ar" dir="rtl"`.
- Arabic typography is loaded via `next/font/google` as Tajawal (fallback); production self-hosts 29LT Bukra.
- Latin tokens (Lot numbers, ISO codes, SPECIMEN button labels) stay LTR inside `[direction:ltr]` spans within RTL pages — alphanumeric specimen codes always read left-to-right.

### Arabic voice

The Arabic site is **not a translation** — it is an Egyptian-Modern-Standard original written to the same brand voice. Hire a copywriter, not a translator.

### Arabic typography rules

- Display: 29LT Bukra Bold at 1.3 line-height (Arabic letters are taller relatively; line-height must increase accordingly)
- Body: 29LT Bukra Regular at 1.7 line-height
- No italic forced into Arabic (use semantic emphasis differently — color or weight)
- Numerals: Hindu-Arabic *or* Eastern Arabic depending on context; pick one per page and stick with it

---

## 13. Anti-Patterns — Rejected on Sight

Carry these from the original brief. If a draft contains any of these, send it back.

1. ❌ Centered hero with a gradient blob and a "Get Started" button
2. ❌ Three identical feature cards with line-icons and one-line descriptions
3. ❌ "Trusted by" logo strip on a B2C site
4. ❌ Stock photos of smiling families in kitchens
5. ❌ Faux-handwritten "fresh & natural" fonts
6. ❌ Generic green = healthy, red = bad color logic
7. ❌ Every section full-width with the same padding
8. ❌ Pastel everything
9. ❌ Glassmorphism, neumorphism, or any 2021 holdover
10. ❌ Arabic typeset as an afterthought in a default Noto
11. ❌ Product cards that look like Shopify defaults

---

## 14. Files & Where Things Live

```
epics-rebrand/
├── BRAND-BOOK.md                       # This document
├── README.md                           # Repo overview + quick start
├── app/
│   ├── layout.tsx                      # Root layout, font variables, metadata
│   ├── globals.css                     # Tokens, base styles, specimen-* classes
│   ├── page.tsx                        # English homepage (LTR)
│   ├── not-found.tsx                   # 404 — "Not in this lot."
│   ├── about/page.tsx                  # About / Our Vision — five movements
│   ├── pku/page.tsx                    # Crystal by Epics PKU explainer microsite
│   ├── gluten-free/page.tsx            # Category landing — gluten-free shelf
│   ├── cart/page.tsx                   # Cart + checkout — minimal, no dark patterns
│   ├── products/[slug]/page.tsx        # Product detail (dynamic — every SKU)
│   ├── recipes/[slug]/page.tsx         # Recipe page — editorial magazine spread
│   ├── ar/page.tsx                     # Arabic RTL homepage mirror
│   ├── ar/layout.tsx                   # Arabic layout — dir="rtl"
│   └── _components/
│       ├── Nav.tsx                     # Top nav (bilingual aware)
│       ├── Footer.tsx                  # Footer with real Epics contact info
│       ├── Strikethrough.tsx           # S-01 / S-02 / S-03 monograms (SVG)
│       ├── SpecimenHeader.tsx          # Typographic specimen banner
│       └── ProductCard.tsx             # Reusable product specimen card
├── lib/
│   └── catalog.ts                      # Product catalog (replace with live data later)
├── tokens/
│   ├── colors.json                     # Design tokens (color, w3c format)
│   └── typography.json                 # Design tokens (type, w3c format)
├── tailwind.config.ts                  # Palette + font tokens as Tailwind theme
├── postcss.config.mjs
├── next.config.mjs
└── public/
    └── fonts/                          # Self-host licensed fonts here in production
```

### Figma file

- **`Epics Group — Rebrand v1`** — https://www.figma.com/design/CED4EMrr6msHnGb19lgFzX
- Foundations page contains the cover band, the 60-word manifesto, and the 6-token color swatch grid built as real Figma variables (Light + Dark modes)
- *Note: build was rate-limited by the Figma Starter plan partway through Foundations. The production code in this repo is the canonical implementation of the system. The Figma file documents the tokens; this repo carries them through to 9 screens × 2 viewports (LTR + RTL).*

---

## 15. Operating Notes

### When adding a new product

1. Add to `lib/catalog.ts` with a real `loafNumber`, `lot`, `weight`, `priceEgp`, `freeFrom`, and `nutrition.per100g`.
2. The dynamic route `app/products/[slug]/page.tsx` will pick it up automatically.
3. If it's a PKU SKU, set `category: "pku"` and `subBrand: "crystal"` — the styling adapts automatically.
4. Update the `recipes` array if a new method is published alongside the product.

### When adding a new recipe

1. Add to the `recipes` array in `lib/catalog.ts` with a stable `code` (R-NN).
2. Add the `detail` entry to `app/recipes/[slug]/page.tsx` with `ingredients`, `method`, `why`, `byline`, `date`.
3. Methods should publish real timings. The brand voice forbids vague language.

### When extending Crystal

1. Add the SKU with `subBrand: "crystal"` to `lib/catalog.ts`.
2. Update the PKU explainer (`app/pku/page.tsx`) range section.
3. PHE values must be reviewed by the metabolic dietitian on file before going live. Mark with `// REVIEWED BY: <name>, <date>` in code.

---

*— Epics, Issue 01 · MMXXVI · 6th of October City*
