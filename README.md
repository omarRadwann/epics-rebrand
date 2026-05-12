# Epics Group — Rebrand

A complete bespoke rebrand of [Epics Group](https://epics-group.com), an Egyptian manufacturer of gluten-free, sugar-free, and PKU-safe baked goods headquartered at Plot 330, 6th Industrial Zone, 6 October City, Giza.

**Territory:** *The Specimen Pantry* — apothecary, but appetizing. Warm cream paper, ink-black serif headlines, saffron accents, every product catalogued as a numbered specimen with a real lot number.

**Brand architecture:**
- Master brand: **Epics** (typographic wordmark, no graphic logo)
- Line descriptors: *Epics · Gluten-Free*, *Epics · Sugar-Free*
- Endorsed sub-brand: **Crystal by Epics — PKU** (pomegranate gravity color)

---

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind v3 · `next/font` for Google Fonts as open-source brand fallbacks · Edge-rendered Open Graph + favicon via `next/og`.

---

## Quick start

```bash
pnpm install
pnpm dev
# → http://localhost:3000      English
# → http://localhost:3000/ar   Arabic (RTL)
```

Production build:

```bash
pnpm build && pnpm start
```

---

## Deploy

### One-click → Vercel (recommended)

This repo is configured for Vercel out of the box (`vercel.json` sets `framework: nextjs`, `buildCommand: pnpm build`, `installCommand: pnpm install --frozen-lockfile`).

```bash
# from inside the epics-rebrand directory
pnpm dlx vercel        # first-time link
pnpm dlx vercel --prod # deploy to production
```

Or push to a GitHub repo and connect it to Vercel via [vercel.com/new](https://vercel.com/new) — auto-detects Next.js, no config needed.

### Static export (any host)

```bash
# Add to next.config.mjs:
#   output: "export"
pnpm build
# → ./out/  is a static site ready for any CDN
```

Suitable for Netlify, Cloudflare Pages, S3 + CloudFront, or any static host.

---

## Repository layout

```
epics-rebrand/
├── BRAND-BOOK.md                # Onboarding doc — read first
├── README.md                    # This file
├── vercel.json                  # Vercel deploy config
├── app/
│   ├── layout.tsx               # Root layout — fonts, CartProvider, skip-link
│   ├── globals.css              # Tokens, base styles, specimen-* utilities
│   ├── page.tsx                 # English homepage (LTR)
│   ├── not-found.tsx            # 404 — "Not in this lot."
│   ├── icon.tsx                 # Favicon (edge-rendered serif "E")
│   ├── opengraph-image.tsx      # Default OG image (1200×630, edge-rendered)
│   ├── about/page.tsx           # About / Our Vision — five movements
│   ├── pku/page.tsx             # Crystal by Epics PKU explainer microsite
│   ├── gluten-free/page.tsx     # Category landing — gluten-free
│   ├── sugar-free/page.tsx      # Category landing — sugar-free
│   ├── cart/
│   │   ├── page.tsx             # Cart server wrapper
│   │   └── _CartView.tsx        # Client cart view (reads CartProvider)
│   ├── products/[slug]/page.tsx # Product detail (dynamic — every SKU)
│   ├── recipes/[slug]/page.tsx  # Recipe page — editorial magazine spread
│   ├── ar/
│   │   ├── layout.tsx           # Arabic locale wrapper (dir=rtl)
│   │   └── page.tsx             # Arabic RTL homepage mirror
│   └── _components/
│       ├── Nav.tsx              # Top nav with active state (usePathname)
│       ├── Footer.tsx           # Real Epics contact info, bilingual
│       ├── Strikethrough.tsx    # S-01 / S-02 / S-03 monograms (SVG)
│       ├── SpecimenHeader.tsx   # Typographic specimen banner
│       ├── ProductCard.tsx      # Reusable specimen card
│       ├── ProductIllustration.tsx # Hairline-art package illustration
│       ├── CartProvider.tsx     # Client cart Context + localStorage
│       ├── CartCount.tsx        # Live nav cart counter
│       └── AddToCartButton.tsx  # PDP add button with feedback flash
├── lib/
│   └── catalog.ts               # Product + recipe catalog (12 SKUs, 3 recipes)
├── tokens/
│   ├── colors.json              # Design tokens (color, W3C format)
│   └── typography.json          # Design tokens (type, W3C format)
├── tailwind.config.ts           # Tokens → Tailwind theme
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── public/
    └── fonts/                   # Self-host licensed Untitled Serif / Söhne /
                                 # GT America Mono / 29LT Bukra here in production
```

---

## What's built

| Route | Purpose |
|---|---|
| `/` | Homepage — asymmetric hero, manifesto, category gateway, popular rail, certifications, recipe feature, journal teaser |
| `/gluten-free` | Category — editorial intro, hero pair, 4-up grid |
| `/sugar-free` | Category — sugar-free shelf with S-02 monogram |
| `/products/[slug]` | PDP (12 SKUs prerendered) — specimen header, hairline package illustration, designed ingredients/nutrition tables, Add to Cart with persistence |
| `/recipes/[slug]` | Recipe — magazine spread, numbered steps, real timings (3 recipes) |
| `/about` | "5 movements" founding story, ISO/manufacturing/sourcing facts, Crystal pull-out |
| `/pku` | Crystal by Epics PKU explainer — pomegranate gravity color, plain-language PKU primer |
| `/cart` | Interactive cart with localStorage persistence, no dark patterns |
| `/not-found` | 404 — struck-through specimen card "Not in this lot." |
| `/ar` | Arabic RTL homepage mirror (native Egyptian voice, not translated) |

Plus auto-generated:
- `/icon` — favicon (edge-rendered)
- `/opengraph-image` — social card (1200×630, edge-rendered)

---

## Brand fundamentals

Read [`BRAND-BOOK.md`](./BRAND-BOOK.md) end-to-end before changing anything visual. It covers:

- The 60-word anchoring manifesto
- Brand architecture + Crystal sub-brand rules
- The 6-token color system (light + dark)
- The type system (production fonts + open-source fallbacks)
- The specimen language (numbering conventions, lot codes, free-from monograms)
- Photography & illustration brief (80 words, explicit do/don'ts)
- Voice & tone with 25 sample headlines
- 10 do/don't pairs
- Arabic & RTL typography rules
- The 11 anti-patterns to reject on sight

---

## Demo notes

1. **Open / and resize** between desktop (1440) and mobile (390) — the asymmetric hero re-stacks cleanly.
2. **Click into /pku** — the gravity color shift (saffron → pomegranate) is the central brand demonstration. PKU is the moat.
3. **Toggle to /ar** — RTL parity is genuine. Arabic typography, layout direction, and a native Egyptian voice (not translated).
4. **Click into /products/european-baking-mix** — the specimen header at the top, the hairline-art package illustration, the designed ingredients table. Hit "ADD TO CART" — the button flashes saffron, the nav counter increments, and the value persists across reloads.
5. **Visit /cart** — Pre-seeded with 3 items so the demo doesn't start empty. Adjust quantities, remove, or "EMPTY THE SLIP."
6. **Type any URL that doesn't exist** — `/404` itself, or `/products/foo` — to see the "Not in this lot." treatment.

---

## Production fonts (licensed)

The repo ships open-source fallbacks (Newsreader / Inter / JetBrains Mono / Tajawal) loaded via `next/font/google`. Production swaps to the licensed brand fonts under `public/fonts/`:

- **Untitled Serif** — Klim Type Foundry
- **Söhne** — Klim Type Foundry
- **GT America Mono** — Grilli Type
- **29LT Bukra** — 29LT

Add `@font-face` declarations to `app/globals.css` pointing at `/fonts/*.woff2` once the licenses are in place.

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
