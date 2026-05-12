"use client";

import { motion } from "framer-motion";

/**
 * Epics wordmark. Pure typography in the brand serif (Newsreader, falling
 * back to Georgia). No SVG paths, no ornament — the mark is the word,
 * tightly tracked, with perfect baseline alignment to adjacent text.
 *
 * Why text instead of inline SVG:
 *   1) The Quiver-generated SVG carried a wheat-stalk ornament after the
 *      "s" that read as a smudge next to the lot-code text.
 *   2) An SVG inline-block element baseline-aligns by its bottom edge, not
 *      by the glyph baseline, so it sat too high next to `items-baseline`
 *      flex peers in the Nav.
 *   3) HTML text inherits the same font stack as the rest of the page and
 *      stays selectable / accessible.
 *
 * `animated` slides the wordmark in on mount (used in the hero / cover
 * if we want to reintroduce a flourish). Defaults to static.
 *
 * `size` is the font-size in pixels. Nav uses ~28; Footer uses ~64.
 */
export function Logo({
  size = 28,
  className = "",
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const base =
    "font-serif-display leading-[0.92] tracking-[-0.04em] text-current select-none whitespace-nowrap";

  if (animated) {
    return (
      <motion.span
        className={`${base} ${className}`}
        style={{ fontSize: size, display: "inline-block" }}
        aria-label="Epics"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        Epics
      </motion.span>
    );
  }

  return (
    <span
      className={`${base} ${className}`}
      style={{ fontSize: size, display: "inline-block" }}
      aria-label="Epics"
    >
      Epics
    </span>
  );
}
