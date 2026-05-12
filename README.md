# Epics Group — Rebrand

A complete rebrand of [Epics Group](https://epics-group.com), an Egyptian manufacturer of gluten-free, sugar-free, and PKU-safe baked goods, headquartered at Plot 330, 6th Industrial Zone, 6 October City, Giza.

**Territory:** *The Specimen Pantry* — apothecary, but appetizing.
**Master brand:** Epics. **Endorsed sub-brand:** `Crystal by Epics — PKU`.
**Figma file:** https://www.figma.com/design/CED4EMrr6msHnGb19lgFzX

## What's in this repo

```
epics-rebrand/
├── BRAND-BOOK.md             # Onboarding document — read this first
├── app/                      # Next.js 14 (App Router) homepage
│   ├── page.tsx              #   English LTR
│   ├── ar/page.tsx           #   Arabic RTL mirror
│   ├── globals.css
│   └── layout.tsx
├── public/
│   └── fonts/                # Self-hosted Untitled Serif, Söhne, GT America Mono, 29LT Bukra
├── tailwind.config.ts        # Palette + font tokens as Tailwind theme
├── tokens/
│   ├── colors.json           # Design tokens — color
│   └── typography.json       # Design tokens — type
└── README.md
```

## Quick start

```bash
pnpm install
pnpm dev
# → http://localhost:3000     English
# → http://localhost:3000/ar  Arabic (RTL)
```

## Brand fundamentals

Read [`BRAND-BOOK.md`](./BRAND-BOOK.md) end to end before changing anything visual.

## Anti-patterns (rejected on sight)

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
