"use client";

import { motion } from "framer-motion";

/**
 * Epics — typographic lockup PLUS a custom identifying mark.
 *
 * The mark: a geometric LOAF SILHOUETTE with three hairline SCORING marks
 * across its crust. It says exactly what the brand is: a bakery. Drawn at
 * the same hairline weight as the editorial rules and frame around the
 * wordmark, so the whole composition reads as ONE crafted system rather
 * than "a font next to a clipart icon."
 *
 * Why a scored loaf — three reasons
 * ─────────────────────────────────
 * 1. Identifies the brand category at a glance (bakery, food).
 * 2. The three scoring marks line up with the three shelves
 *    (Gluten-Free, Sugar-Free, Crystal · PKU) — a triple meaning the
 *    audience eventually discovers but doesn't need to.
 * 3. Geometric reduction — pure hairline strokes, no illustration risk.
 *    Reads at 14px (favicon) and 120px (footer) without redrawing.
 *
 * Variants
 * ────────
 * `variant="full"` (footer / brand pages):
 *
 *          ╭─╮ ╭─╮ ╭─╮          ← three scoring marks
 *         ╭─────────╮            ← scored loaf
 *         ╰─────────╯
 *     EST · MMXXVI · CAIRO
 *     ────────────────────
 *           E P I C S            ← wordmark (Italiana)
 *     ────────────────────
 *     OFFICINE · 6 OCT · LOT 0001
 *
 * `variant="compact"` (nav default):
 *      ╭─╮ ╭─╮ ╭─╮
 *     ╭───────────╮    E P I C S
 *     ╰───────────╯
 *
 *  `variant="wordmark"` (display-only):
 *     E P I C S
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
  // Italiana caps run ~0.7 of font-size. 0.28em tracking is the editorial
  // luxury-house setting.
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
  const labelGap = Math.round(size * 0.24);
  const labelSize = Math.max(8, Math.round(size * 0.33));

  // Mark sizing — generous against the wordmark cap-height so the loaf
  // reads at a glance instead of resembling decoration. ViewBox 38×26
  // (proper bakery-loaf aspect ratio, generous scoring zone above).
  const markH = Math.round(size * 1.55);
  const markW = Math.round(markH * (38 / 26));

  const Mark = ({ delay = 0 }: { delay?: number }) => {
    const sw = Math.max(0.9, size * 0.06); // stroke weighted enough to read
    const inner = (
      <svg
        width={markW}
        height={markH}
        viewBox="0 0 38 26"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Three scoring marks — the boulanger's signature gesture, drawn
            as confident diagonal slashes across the crust. Their spacing
            matches the brand's three shelves (S-01 / S-02 / S-03). */}
        <line x1="11" y1="2.5" x2="15" y2="7" />
        <line x1="17.5" y1="2.5" x2="21.5" y2="7" />
        <line x1="24" y1="2.5" x2="28" y2="7" />
        {/* Loaf silhouette — an asymmetric rounded shape with a higher,
            shallower top arc (the way a baked loaf rises) and a deeper,
            slightly flatter bottom (where it sat on the oven stone). */}
        <path d="M 4 13 C 4 9, 9 8, 19 8 C 29 8, 34 9, 34 13 L 34 17 C 34 21, 29 23, 19 23 C 9 23, 4 21, 4 17 Z" />
        {/* Subtle horizontal seam — adds depth and reinforces "loaf"
            without crowding the silhouette. */}
        <path d="M 6 15.5 C 12 16, 26 16, 32 15.5" strokeWidth={Math.max(0.6, sw * 0.7)} opacity={0.55} />
      </svg>
    );
    if (animated) {
      return (
        <motion.span
          aria-hidden="true"
          style={{ display: "inline-flex" }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {inner}
        </motion.span>
      );
    }
    return (
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        {inner}
      </span>
    );
  };

  const Rule = ({ delay = 0.3 }: { delay?: number }) => {
    if (animated) {
      return (
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
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay,
          }}
        />
      );
    }
    return (
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
  };

  const Wordmark = () => {
    const content = "EPICS";
    if (animated) {
      return (
        <motion.span
          style={wordmarkStyle}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {content}
        </motion.span>
      );
    }
    return <span style={wordmarkStyle}>{content}</span>;
  };

  const Label = ({ text, delay }: { text: string; delay: number }) => {
    const style: React.CSSProperties = {
      fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
      fontWeight: 500,
      fontSize: labelSize,
      lineHeight: 1,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "currentColor",
      opacity: 0.7,
      display: "inline-block",
      whiteSpace: "nowrap",
    };
    if (animated) {
      return (
        <motion.span
          style={style}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {text}
        </motion.span>
      );
    }
    return <span style={style}>{text}</span>;
  };

  // Wordmark-only — for tightest contexts.
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

  // Compact — Mark + Wordmark side-by-side. The mark sits left, vertically
  // centered against the wordmark cap-height. The hairline frame around
  // the wordmark survives for visual continuity with the full variant.
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center text-current select-none ${className}`}
        style={{ gap: Math.round(size * 0.45) }}
        aria-label="Epics — gluten-free, sugar-free, PKU-safe bakery"
      >
        <Mark delay={0.05} />
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

  // Full — Mark above, then top label, rule, wordmark, rule, bottom label.
  // The specimen-tag composition with the brand mark crowning it.
  return (
    <span
      className={`inline-flex flex-col items-center text-current select-none ${className}`}
      aria-label="Epics — Established MMXXVI, 6 October City, Cairo. Gluten-free, sugar-free, PKU-safe bakery"
    >
      <Mark delay={0.05} />
      <span style={{ height: Math.round(ruleGap * 0.7) }} aria-hidden />
      <Label text="EST · MMXXVI · CAIRO" delay={0.15} />
      <span style={{ height: labelGap }} aria-hidden />
      <Rule delay={0.25} />
      <span style={{ height: Math.round(ruleGap * 0.55) }} aria-hidden />
      <Wordmark />
      <span style={{ height: Math.round(ruleGap * 0.55) }} aria-hidden />
      <Rule delay={0.55} />
      <span style={{ height: labelGap }} aria-hidden />
      <Label text="OFFICINE · 6 OCT · LOT 0001" delay={0.7} />
    </span>
  );
}
