"use client";

import { motion } from "framer-motion";

/**
 * Epics — hand-drawn premium logomark.
 *
 * No clipart. Every line, every label, every ornament is drawn as native
 * SVG geometry inside a single coordinate space, so the whole mark scales
 * as one composition instead of "a font next to an icon."
 *
 * The composition is modelled on Officine Universelle Buly's 1803 stamp
 * and Le Labo's apothecary-card lockups. From top to bottom:
 *
 *     OFFICINE · D'ALIMENTS          ← arched supra label (mono caps)
 *           ╱─◊─╲
 *           E P I C S                 ← wordmark (Italiana, large)
 *      ──────────────────             ← hairline rule
 *     EST · MMXXVI · CAIRO            ← infra label (mono caps)
 *           ╱     ╲
 *          (  26  )                   ← circular issue badge
 *           ╲     ╱
 *
 * `variant="full"`     — the whole composition above (footer / brand pages)
 * `variant="compact"`  — wordmark inside hairline frame (nav)
 * `variant="wordmark"` — wordmark only
 *
 * All paths/text inherit `currentColor`, so the mark reads on cream,
 * ink, saffron, sage, and pomegranate surfaces without modification.
 */
export function Logo({
  size = 22,
  className = "",
  animated = false,
  variant = "compact",
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  variant?: "full" | "compact" | "wordmark";
}) {
  /* ─── compact / wordmark variants ──────────────────────────────────── */

  const tracking = 0.28;
  const wordmarkWidth = Math.round(size * (5 * 0.7 + 4 * tracking));

  const wordmarkStyle: React.CSSProperties = {
    fontFamily:
      "var(--font-logo), 'Italiana', 'Bodoni Moda', 'Bodoni 72', Didot, serif",
    fontWeight: 400,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: `${tracking}em`,
    color: "currentColor",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const ruleWidth = wordmarkWidth;
  const ruleGap = Math.round(size * 0.42);

  const Wordmark = () =>
    animated ? (
      <motion.span
        style={wordmarkStyle}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        EPICS
      </motion.span>
    ) : (
      <span style={wordmarkStyle}>EPICS</span>
    );

  const Rule = ({ delay = 0.3 }: { delay?: number }) =>
    animated ? (
      <motion.span
        aria-hidden
        style={{
          display: "block",
          height: 1,
          width: ruleWidth,
          background: "currentColor",
          opacity: 0.85,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      />
    ) : (
      <span
        aria-hidden
        style={{
          display: "block",
          height: 1,
          width: ruleWidth,
          background: "currentColor",
          opacity: 0.85,
        }}
      />
    );

  if (variant === "wordmark") {
    return (
      <span
        className={`inline-flex items-center text-current select-none ${className}`}
        aria-label="Epics"
      >
        <Wordmark />
      </span>
    );
  }

  if (variant === "compact") {
    // Compact: small sigil ("N°26") + framed wordmark.
    // The sigil is a hairline rounded square containing the year code,
    // a tiny apothecary-card mark that sits beside the wordmark.
    const sigilSize = Math.round(size * 1.5);
    const SigilSVG = (
      <svg
        width={sigilSize}
        height={sigilSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.8}
        aria-hidden
      >
        {/* Rounded-square frame */}
        <rect x="1.5" y="1.5" width="21" height="21" rx="1.8" />
        {/* Inner hairline border */}
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="1"
          strokeWidth={0.4}
          opacity={0.55}
        />
        {/* "N°" superscript */}
        <text
          x="12"
          y="11.5"
          fontSize="5"
          letterSpacing="0.4"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={{
            fontFamily:
              "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontWeight: 500,
          }}
        >
          N°
        </text>
        {/* "26" big numerals */}
        <text
          x="12"
          y="19"
          fontSize="7.5"
          letterSpacing="0.2"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={{
            fontFamily:
              "var(--font-logo), 'Italiana', 'Bodoni Moda', Didot, serif",
            fontWeight: 400,
          }}
        >
          26
        </text>
      </svg>
    );

    return (
      <span
        className={`inline-flex items-center text-current select-none ${className}`}
        style={{ gap: Math.round(size * 0.55) }}
        aria-label="Epics — gluten-free, sugar-free, PKU-safe bakery"
      >
        {animated ? (
          <motion.span
            style={{ display: "inline-flex" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {SigilSVG}
          </motion.span>
        ) : (
          SigilSVG
        )}
        <span
          className="inline-flex flex-col items-center"
          style={{ gap: Math.round(ruleGap * 0.55) }}
        >
          <Rule delay={0.15} />
          <Wordmark />
          <Rule delay={0.4} />
        </span>
      </span>
    );
  }

  /* ─── full variant: Buly-style stamp ──────────────────────────────── */

  // Coordinate system: 200×140. Generous around the wordmark so the
  // arched supra label + circular date badge have room to breathe.
  const fullW = 200;
  const fullH = 140;
  const renderH = size * (fullH / 28); // scale the lockup against the cap-height of the wordmark inside
  const renderW = renderH * (fullW / fullH);

  // Curve path used as the baseline for the arched supra label. Bezier
  // curve flattening upward — leaves the brand name fully visible
  // beneath without crowding it.
  const archPath = "M 30 36 Q 100 16, 170 36";

  const Inner = (
    <svg
      width={renderW}
      height={renderH}
      viewBox={`0 0 ${fullW} ${fullH}`}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <defs>
        <path id="epics-arch" d={archPath} fill="none" />
      </defs>

      {/* Arched supra label */}
      <text
        fill="currentColor"
        stroke="none"
        fontSize="5.5"
        letterSpacing="2.6"
        style={{
          fontFamily:
            "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
          fontWeight: 500,
        }}
        opacity="0.7"
      >
        <textPath href="#epics-arch" startOffset="50%" textAnchor="middle">
          OFFICINE  ·  D&apos;ALIMENTS
        </textPath>
      </text>

      {/* Decorative diamond above the wordmark */}
      <g stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="86" y1="48" x2="100" y2="42" />
        <line x1="100" y1="42" x2="114" y2="48" />
        <line x1="86" y1="48" x2="100" y2="54" opacity="0.55" />
        <line x1="100" y1="54" x2="114" y2="48" opacity="0.55" />
        <line x1="100" y1="42" x2="100" y2="54" opacity="0.35" />
      </g>

      {/* The EPICS wordmark — Italiana, sized to dominate */}
      <text
        x={fullW / 2}
        y={82}
        textAnchor="middle"
        fontSize="28"
        letterSpacing="6"
        fill="currentColor"
        stroke="none"
        style={{
          fontFamily:
            "var(--font-logo), 'Italiana', 'Bodoni Moda', 'Bodoni 72', Didot, serif",
          fontWeight: 400,
        }}
      >
        EPICS
      </text>

      {/* Infra label — flanking rules removed because the text width with
          wide tracking exceeded our SVG-space estimate and the rules
          ended up crossing through 'EST' and 'CAIRO' as accidental
          strikethroughs. The composition still reads with the arch above
          + diamond + wordmark + circular stamp providing rhythm. */}
      <text
        x={fullW / 2}
        y={98.5}
        textAnchor="middle"
        fontSize="5.5"
        letterSpacing="2.4"
        fill="currentColor"
        stroke="none"
        style={{
          fontFamily:
            "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
          fontWeight: 500,
        }}
        opacity="0.78"
      >
        EST  ·  MMXXVI  ·  CAIRO
      </text>

      {/* Issue / year stamp — hairline circle with the year inside */}
      <g>
        <circle cx={fullW / 2} cy={120} r={10} strokeWidth="0.8" />
        <circle cx={fullW / 2} cy={120} r={7.5} strokeWidth="0.4" opacity={0.6} />
        <text
          x={fullW / 2}
          y={123}
          textAnchor="middle"
          fontSize="7.5"
          fill="currentColor"
          stroke="none"
          letterSpacing="0.4"
          style={{
            fontFamily:
              "var(--font-logo), 'Italiana', 'Bodoni Moda', Didot, serif",
            fontWeight: 400,
          }}
        >
          26
        </text>
      </g>

      {/* Tiny serif flourishes flanking the issue stamp */}
      <g stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6">
        <line x1="70" y1="120" x2="84" y2="120" />
        <line x1="116" y1="120" x2="130" y2="120" />
        <circle cx="68" cy="120" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="132" cy="120" r="0.7" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.span
        className={`inline-flex text-current select-none ${className}`}
        aria-label="Epics — Officine d'Aliments, Established MMXXVI, 6 October City, Cairo"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {Inner}
      </motion.span>
    );
  }

  return (
    <span
      className={`inline-flex text-current select-none ${className}`}
      aria-label="Epics — Officine d'Aliments, Established MMXXVI, 6 October City, Cairo"
    >
      {Inner}
    </span>
  );
}
