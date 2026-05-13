"use client";

import { motion } from "framer-motion";

/**
 * Epics logo. Custom-drawn sigil (a circular wheat-stalk seal with a saffron
 * strikethrough) paired with the typographic wordmark.
 *
 * Visual lineage:
 *   - The original Epics logo has a blue gear + yellow sun + green leaves
 *     ringing an italic blue "EPICS" wordmark — a busy, clipart-tier mark.
 *   - This rebrand replaces it with a refined hairline seal: a circle
 *     frame, a centered wheat stalk with three pairs of grains, struck
 *     diagonally by a single saffron line (the brand's S-01 free-from
 *     motif). The seal carries the same essence — Egyptian, industrial,
 *     specialty food — at editorial weight.
 *
 * Variants:
 *   - "default"  → sigil + wordmark, side-by-side. Used in nav.
 *   - "stacked"  → sigil over wordmark. Used in footer / cover moments.
 *   - "sigil"    → just the seal. Used as monogram / favicon / social icon.
 *
 * `size` sets the wordmark font-size in px; the sigil scales proportionally.
 * `animated` triggers a 700ms draw-in from below + the strikethrough wipe.
 */
export function Logo({
  variant = "default",
  size = 32,
  className = "",
  animated = false,
}: {
  variant?: "default" | "stacked" | "sigil";
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const sigilSize = Math.round(size * 1.08); // sigil slightly larger than cap-height
  const sigilEl = <Sigil sizePx={sigilSize} animated={animated} />;

  if (variant === "sigil") {
    return (
      <span
        className={`inline-flex items-center justify-center text-current ${className}`}
        aria-label="Epics"
      >
        {sigilEl}
      </span>
    );
  }

  const wordmark = animated ? (
    <motion.span
      className="font-serif-display leading-[0.92] tracking-[-0.04em] text-current select-none whitespace-nowrap"
      style={{ fontSize: size, display: "inline-block" }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      Epics
    </motion.span>
  ) : (
    <span
      className="font-serif-display leading-[0.92] tracking-[-0.04em] text-current select-none whitespace-nowrap"
      style={{ fontSize: size, display: "inline-block" }}
    >
      Epics
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-center gap-2 text-current ${className}`}
        aria-label="Epics"
      >
        {sigilEl}
        {wordmark}
      </span>
    );
  }

  // default — side-by-side
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-current ${className}`}
      aria-label="Epics"
    >
      {sigilEl}
      {wordmark}
    </span>
  );
}

/* =================== Sigil =================== */

function Sigil({ sizePx, animated }: { sizePx: number; animated: boolean }) {
  // The SVG is drawn on a 40-unit viewBox with stroke-based geometry, so it
  // scales cleanly. `currentColor` for the wheat motif lets it adapt to the
  // surrounding text colour; the strikethrough is always saffron.
  const sw = 0.9; // stroke width in viewBox units
  const ringEase = [0.16, 1, 0.3, 1] as const;

  if (!animated) {
    return (
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
        style={{ display: "block" }}
      >
        <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="20" r="18.5" />
          <line x1="20" y1="8.5" x2="20" y2="31.5" />
          {/* three pairs of grains, ascending — keep symmetric */}
          <ellipse cx="17.4" cy="13.6" rx="1.3" ry="2.1" transform="rotate(-30 17.4 13.6)" />
          <ellipse cx="22.6" cy="13.6" rx="1.3" ry="2.1" transform="rotate(30 22.6 13.6)" />
          <ellipse cx="16.7" cy="19.0" rx="1.5" ry="2.4" transform="rotate(-30 16.7 19.0)" />
          <ellipse cx="23.3" cy="19.0" rx="1.5" ry="2.4" transform="rotate(30 23.3 19.0)" />
          <ellipse cx="16.0" cy="24.4" rx="1.6" ry="2.5" transform="rotate(-30 16.0 24.4)" />
          <ellipse cx="24.0" cy="24.4" rx="1.6" ry="2.5" transform="rotate(30 24.0 24.4)" />
        </g>
        {/* saffron strikethrough — always uses the brand accent, regardless of currentColor */}
        <line
          x1="7" y1="33" x2="33" y2="7"
          stroke="rgb(var(--saffron))"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
      style={{ display: "block" }}
    >
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <motion.circle
          cx="20" cy="20" r="18.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: ringEase }}
        />
        <motion.line
          x1="20" y1="8.5" x2="20" y2="31.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: ringEase, delay: 0.4 }}
        />
        {[
          { cx: 17.4, cy: 13.6, rx: 1.3, ry: 2.1, rot: -30, d: 0.55 },
          { cx: 22.6, cy: 13.6, rx: 1.3, ry: 2.1, rot:  30, d: 0.60 },
          { cx: 16.7, cy: 19.0, rx: 1.5, ry: 2.4, rot: -30, d: 0.70 },
          { cx: 23.3, cy: 19.0, rx: 1.5, ry: 2.4, rot:  30, d: 0.75 },
          { cx: 16.0, cy: 24.4, rx: 1.6, ry: 2.5, rot: -30, d: 0.85 },
          { cx: 24.0, cy: 24.4, rx: 1.6, ry: 2.5, rot:  30, d: 0.90 },
        ].map((g, i) => (
          <motion.ellipse
            key={i}
            cx={g.cx} cy={g.cy} rx={g.rx} ry={g.ry}
            transform={`rotate(${g.rot} ${g.cx} ${g.cy})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: ringEase, delay: g.d }}
            style={{ transformOrigin: `${g.cx}px ${g.cy}px`, transformBox: "fill-box" }}
          />
        ))}
      </g>
      <motion.line
        x1="7" y1="33" x2="33" y2="7"
        stroke="rgb(var(--saffron))"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0], delay: 1.15 }}
      />
    </svg>
  );
}
