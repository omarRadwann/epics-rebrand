"use client";

import { motion } from "framer-motion";

/**
 * Epics — premium multi-line editorial lockup.
 *
 * This is the register Buly 1803, Le Labo, and the Officine Universelle
 * houses use: a quiet wordmark FRAMED by tiny editorial labels above and
 * below, with hairline rules. The wordmark is set in Italiana (high-contrast
 * Bodoni class); the labels in monospace with wide tracking.
 *
 * The lockup makes the brand feel CATALOGUED, not just typed. That's the
 * difference between "I picked a nice font" and "this is a documented
 * specimen with a date, a place, and a number."
 *
 * Variants
 * ────────
 * `variant="full"` (default for footer / brand pages):
 *     EST · MMXXVI · CAIRO              ← top label (mono, tracked)
 *     ─────────────────────             ← hairline rule
 *           E P I C S                   ← wordmark (Italiana, all caps)
 *     ─────────────────────             ← hairline rule
 *     OFFICINE · 6 OCT · LOT 0001       ← bottom label (mono, tracked)
 *
 * `variant="compact"` (default for nav at small sizes):
 *     ───────────                       ← top rule
 *      E P I C S                        ← wordmark only
 *     ───────────                       ← bottom rule
 *
 *  `variant="wordmark"` (display-only, no rules):
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
  // Italiana caps run ~0.7 of font-size. Tracking 0.28em is the editorial
  // luxury-house setting — wider than typical wordmarks so the mark reads
  // as a label, not a heading.
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

  // Rule width matches wordmark cap-width so it reads as an editorial frame.
  const ruleWidth = wordmarkWidth;
  const ruleGap = Math.round(size * 0.42);
  const labelGap = Math.round(size * 0.24);

  // Top label sized at ~33% of cap-height. Never let it fall below 8px or
  // mono fonts vanish.
  const labelSize = Math.max(8, Math.round(size * 0.33));

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
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay,
          }}
        >
          {text}
        </motion.span>
      );
    }
    return <span style={style}>{text}</span>;
  };

  // Wordmark-only — for the tightest contexts where the rules would clutter.
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

  // Compact — wordmark inside a hairline frame (rules above + below).
  // The frame transforms a plain font choice into a crafted mark.
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex flex-col items-center text-current select-none ${className}`}
        style={{ gap: Math.round(ruleGap * 0.55) }}
        aria-label="Epics"
      >
        <Rule delay={0.05} />
        <Wordmark />
        <Rule delay={0.4} />
      </span>
    );
  }

  // Full lockup — top label, rule, wordmark, rule, bottom label. The
  // composition that turns a font into a specimen tag.
  return (
    <span
      className={`inline-flex flex-col items-center text-current select-none ${className}`}
      aria-label="Epics — Established MMXXVI, 6 October City, Cairo"
    >
      <Label text="EST · MMXXVI · CAIRO" delay={0.05} />
      <span style={{ height: labelGap }} aria-hidden />
      <Rule delay={0.2} />
      <span style={{ height: Math.round(ruleGap * 0.55) }} aria-hidden />
      <Wordmark />
      <span style={{ height: Math.round(ruleGap * 0.55) }} aria-hidden />
      <Rule delay={0.5} />
      <span style={{ height: labelGap }} aria-hidden />
      <Label text="OFFICINE · 6 OCT · LOT 0001" delay={0.65} />
    </span>
  );
}
