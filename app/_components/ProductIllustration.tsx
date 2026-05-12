import type { Product } from "@/lib/catalog";

/**
 * Hairline-weight line art of each product's packaging. Drawn in ink-black at
 * 0.6 stroke weight, on cream paper. Follows the brand's illustration brief:
 *
 *   "Editorial illustration (when used) is hairline-weight line art, ink-black
 *    on cream, drawn at one consistent stroke weight. No 3D renders. No stock."
 *
 * Four package archetypes — bag, cylinder, box, tub — cover the catalogue.
 * Each illustration carries the EPICS wordmark, the product name, the weight,
 * and a small free-from monogram. PKU products carry the Crystal endorsement.
 */

type Variant = "hero" | "card" | "thumb";

export function ProductIllustration({
  product,
  variant = "card",
}: {
  product: Product;
  variant?: Variant;
}) {
  const archetype = packageArchetype(product);
  const isCrystal = product.subBrand === "crystal";
  const stroke = isCrystal ? "rgb(var(--pomegranate))" : "rgb(var(--ink-black))";
  const textColor = isCrystal ? "rgb(var(--pomegranate))" : "rgb(var(--ink-black))";
  const sw = variant === "hero" ? 0.6 : 0.75;

  return (
    <svg
      viewBox="0 0 200 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${product.name} — package illustration`}
      className="w-full h-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {archetype === "bag" && <BagOutline />}
        {archetype === "cylinder" && <CylinderOutline />}
        {archetype === "box" && <BoxOutline />}
        {archetype === "tub" && <TubOutline />}
      </g>

      {/* Label content overlaid on the package face */}
      <g>
        {/* Crystal endorsement (top-left band) */}
        {isCrystal && (
          <text
            x="100"
            y="78"
            textAnchor="middle"
            fill={textColor}
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: "5.5px",
              letterSpacing: "0.18em",
            }}
          >
            CRYSTAL BY EPICS
          </text>
        )}

        {/* EPICS wordmark */}
        <text
          x="100"
          y={isCrystal ? "108" : "104"}
          textAnchor="middle"
          fill={textColor}
          style={{
            fontFamily: "var(--font-serif), Newsreader, Georgia, serif",
            fontSize: "16px",
            letterSpacing: "-0.01em",
          }}
        >
          {isCrystal ? "Crystal" : "Epics"}
        </text>

        {/* Divider rule */}
        <line x1="50" y1="118" x2="150" y2="118" stroke={stroke} strokeWidth="0.4" opacity="0.5" />

        {/* Product name */}
        <ProductNameLines name={product.name} y={140} color={textColor} />

        {/* Weight + free-from */}
        <text
          x="100"
          y="190"
          textAnchor="middle"
          fill={textColor}
          opacity="0.7"
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: "5.5px",
            letterSpacing: "0.18em",
          }}
        >
          {product.weight.toUpperCase()} · {product.freeFrom.join(" · ")}
        </text>

        {/* Lot at bottom */}
        <text
          x="100"
          y="210"
          textAnchor="middle"
          fill={textColor}
          opacity="0.55"
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: "5px",
            letterSpacing: "0.16em",
          }}
        >
          LOT {product.lot.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

/* =================== Package archetype mapping =================== */

function packageArchetype(p: Product): "bag" | "cylinder" | "box" | "tub" {
  const bagSlugs = ["european-baking-mix", "flat-bread-pizza-mix", "basbousa-mix", "crystal-low-protein-flat-bread"];
  const cylinderSlugs = ["soft-flour", "cocoa-powder", "free-starch"];
  const tubSlugs = ["whipping-cream-sf"];
  if (bagSlugs.includes(p.slug)) return "bag";
  if (cylinderSlugs.includes(p.slug)) return "cylinder";
  if (tubSlugs.includes(p.slug)) return "tub";
  return "box"; // brownies, basbousa, choco pops, vanilla cake sf, crystal pasta
}

/* =================== SVG package outlines =================== */

function BagOutline() {
  return (
    <>
      {/* Paper bag body */}
      <path d="M 40 50 L 40 230 Q 40 240 50 240 L 150 240 Q 160 240 160 230 L 160 50" />
      {/* Cinched top — zigzag fold */}
      <polyline points="40,50 55,40 70,50 85,40 100,50 115,40 130,50 145,40 160,50" />
      {/* Side seam */}
      <line x1="48" y1="60" x2="48" y2="225" opacity="0.4" />
      {/* Base shadow line */}
      <line x1="50" y1="240" x2="150" y2="240" />
      <line x1="46" y1="245" x2="154" y2="245" opacity="0.3" />
      {/* Subtle texture lines (hairline grain) */}
      <line x1="40" y1="80" x2="160" y2="80" opacity="0.15" />
      <line x1="40" y1="220" x2="160" y2="220" opacity="0.15" />
    </>
  );
}

function CylinderOutline() {
  return (
    <>
      {/* Cylinder body */}
      <rect x="44" y="58" width="112" height="178" rx="4" />
      {/* Top ellipse (perspective) */}
      <ellipse cx="100" cy="58" rx="56" ry="6" />
      {/* Bottom ellipse hint */}
      <path d="M 44 232 Q 100 244 156 232" opacity="0.4" />
      {/* Lid line */}
      <line x1="44" y1="68" x2="156" y2="68" opacity="0.4" />
      {/* Label band edges */}
      <line x1="44" y1="95" x2="156" y2="95" opacity="0.25" />
      <line x1="44" y1="225" x2="156" y2="225" opacity="0.25" />
    </>
  );
}

function BoxOutline() {
  return (
    <>
      {/* Front face */}
      <rect x="42" y="58" width="116" height="178" />
      {/* Top edge perspective */}
      <path d="M 42 58 L 52 48 L 168 48 L 158 58" />
      <line x1="158" y1="58" x2="168" y2="48" opacity="0.5" />
      {/* Right edge perspective */}
      <path d="M 158 58 L 168 48 L 168 226 L 158 236" opacity="0.5" />
      <line x1="158" y1="236" x2="42" y2="236" opacity="0" />
      {/* Lid crease */}
      <line x1="42" y1="68" x2="158" y2="68" opacity="0.3" />
    </>
  );
}

function TubOutline() {
  return (
    <>
      {/* Tub body */}
      <path d="M 50 80 L 46 220 Q 46 232 56 232 L 144 232 Q 154 232 154 220 L 150 80" />
      {/* Lid (top ellipse) */}
      <ellipse cx="100" cy="80" rx="50" ry="5" />
      {/* Lid lip */}
      <path d="M 50 80 Q 50 75 55 73 L 145 73 Q 150 75 150 80" />
      {/* Lid handle indent */}
      <line x1="80" y1="75" x2="120" y2="75" opacity="0.4" />
    </>
  );
}

/* =================== Product name text wrapping =================== */

function ProductNameLines({ name, y, color }: { name: string; y: number; color: string }) {
  // Manual word wrap to fit 100px wide at 11px font
  const words = name.replace(/·/g, " ").split(" ").filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (next.length > 18) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);

  // Cap at 2 lines to avoid bleed
  const display = lines.slice(0, 2);
  return (
    <>
      {display.map((line, i) => (
        <text
          key={i}
          x="100"
          y={y + i * 14}
          textAnchor="middle"
          fill={color}
          style={{
            fontFamily: "var(--font-serif), Newsreader, Georgia, serif",
            fontSize: "11px",
            letterSpacing: "-0.005em",
            fontStyle: "italic",
          }}
        >
          {line}
        </text>
      ))}
    </>
  );
}
