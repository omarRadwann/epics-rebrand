"use client";

import { motion } from "framer-motion";

/**
 * Epics wordmark. Set in Italiana — a contemporary high-contrast display
 * serif in the Bodoni family. Premium typographic restraint, all caps,
 * wide tracking, anchored by a hairline rule.
 *
 * This is intentionally NOT a sigil + wordmark composition. The decisive
 * move on a refined editorial brand (Aesop, Le Labo, The Row, Lemaire,
 * Buly 1803, Loewe) is pure typography in a face that the rest of the
 * site doesn't use — so the wordmark carries its own voice. Italiana is
 * loaded only for this component.
 *
 * `size` controls the cap-height in px.
 * `withRule` adds the hairline rule below (default on for the standalone
 *   logo, off when the lot-code badge sits next to it in the nav so the
 *   two don't fight for vertical attention).
 * `animated` triggers a subtle reveal: letters fade + lift, rule wipes
 *   from left to right.
 */
export function Logo({
  size = 22,
  className = "",
  animated = false,
  withRule = true,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  withRule?: boolean;
}) {
  // Italiana is generous on cap height — letter-spacing 0.18em gives the
  // luxury-house tracking. Slight optical kerning between IC where the
  // dot of the I would otherwise crowd the C bowl.
  const letterSpacing = "0.22em";
  // Visual width is approximately N letters × (cap-height × 0.72) + tracking.
  // Italiana caps run ~0.7 of font-size, so width ≈ 5 × size × 0.7 + 4×size×0.22.
  const approxWidth = Math.round(size * (5 * 0.72 + 4 * 0.22));

  const wordmarkStyle: React.CSSProperties = {
    fontFamily: "var(--font-logo), 'Italiana', 'Bodoni Moda', 'Bodoni 72', Didot, serif",
    fontWeight: 400,
    fontSize: size,
    lineHeight: 1,
    letterSpacing,
    color: "currentColor",
    display: "inline-block",
    whiteSpace: "nowrap",
    // Trim native cap-height padding so the rule sits flush with the
    // letter baseline.
    paddingRight: `calc(${letterSpacing} * 0)`,
  };

  if (animated) {
    return (
      <span
        className={`inline-flex flex-col items-start text-current select-none ${className}`}
        aria-label="Epics"
      >
        <motion.span
          style={wordmarkStyle}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          EPICS
        </motion.span>
        {withRule && (
          <motion.span
            aria-hidden
            style={{
              display: "block",
              height: 1,
              width: approxWidth,
              background: "currentColor",
              opacity: 0.85,
              marginTop: size * 0.32,
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          />
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-col items-start text-current select-none ${className}`}
      aria-label="Epics"
    >
      <span style={wordmarkStyle}>EPICS</span>
      {withRule && (
        <span
          aria-hidden
          style={{
            display: "block",
            height: 1,
            width: approxWidth,
            background: "currentColor",
            opacity: 0.85,
            marginTop: size * 0.32,
          }}
        />
      )}
    </span>
  );
}
