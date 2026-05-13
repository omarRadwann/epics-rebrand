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

  // Mark sizing — the scored loaf is roughly cap-height tall so it sits
  // beside the wordmark without dominating. The viewBox is 32×22 (wider
  // than tall) so the loaf shape reads correctly.
  const markH = Math.round(size * 1.05);
  const markW = Math.round(markH * (32 / 22));

  const Mark = ({ delay = 0 }: { delay?: number }) => {
    const sw = Math.max(0.7, size * 0.045); // stroke width scales with size
    const inner = (
      <svg
        width={markW}
        height={markH}
        viewBox="0 0 32 22"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Three scoring marks — short diagonal slashes across the
            top of the loaf. The signature gesture of a hand-scored
            loaf, and a callback to the brand's three shelves. */}
        <line x1="9" y1="3" x2="12" y2="6" />
        <line x1="14.5" y1="3" x2="17.5" y2="6" />
        <line x1="20" y1="3" x2="23" y2="6" />
        {/* Loaf silhouette — a generous rounded capsule. The top arc
            is shallower than the bottom, the way a baked loaf swells. */}
        <path d="M 5 11 C 5 7.5, 9 7, 16 7 C 23 7, 27 7.5, 27 11 L 27 14 C 27 17.5, 23 19, 16 19 C 9 19, 5 17.5, 5 14 Z" />
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
