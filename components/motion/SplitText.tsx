"use client";

/**
 * Per-character or per-word reveal. Per brief §5: stagger 0.02s,
 * ease [0.16, 1, 0.3, 1].
 *
 * Re-triggers on every viewport enter (viewport.once = false) so
 * scrolling back up replays the stagger. viewport.amount is "some"
 * (any pixel visible) — a high numeric threshold silently never fires
 * for headlines taller or wider than the viewport, which is exactly
 * what once left hero headings stuck invisible. The memoised
 * motion.create() (see Reveal.tsx for the full history) is what makes
 * the viewport trigger reliable now.
 *
 * Usage:
 *   <SplitText text="On the record." mode="char" />
 *   <SplitText text="Three shelves." mode="word" stagger={0.05} as="h1" />
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import { createElement, useMemo, type ElementType } from "react";

interface SplitTextProps {
  text: string;
  mode?: "char" | "word";
  stagger?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
}

const parentVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const childVariants: Variants = {
  hidden: { opacity: 0, y: "60%" },
  shown: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: easeEntrance },
  },
};

export function SplitText({
  text,
  mode = "char",
  stagger = 0.02,
  delay = 0,
  as = "span",
  className,
}: SplitTextProps) {
  const tokens =
    mode === "char"
      ? Array.from(text)
      : text.split(/(\s+)/); // keep spaces in word mode for layout

  // motion.create() must be memoised — calling it inline on every
  // render returns a fresh component type, which remounts the subtree
  // (and silently kills the viewport observer mid-scroll).
  const Wrapper = useMemo(() => motion.create(as as ElementType), [as]);
  const reduced = useReducedMotion();

  // Reduced motion: render the text plainly, fully visible, no stagger.
  // createElement (not <Tag/>) — JSX can't infer children for a value
  // typed as ElementType.
  if (reduced) {
    return createElement(as, { className, "aria-label": text }, text);
  }

  return (
    <Wrapper
      className={className}
      variants={parentVariants(stagger, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount: "some" }}
      aria-label={text}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {tokens.map((token, i) => {
        // Whitespace tokens render as plain, non-animated spans in BOTH
        // modes. In char mode a " " token inside a display:inline-block
        // span collapses to zero width, jamming every word together
        // ("Breadthatdoesn'tapologise"). A space need not animate anyway.
        if (/^\s+$/.test(token)) {
          return (
            <span key={i} aria-hidden style={{ whiteSpace: "pre" }}>
              {token}
            </span>
          );
        }
        return (
          <span key={i} aria-hidden style={{ display: "inline-block", overflow: "hidden" }}>
            <motion.span variants={childVariants} style={{ display: "inline-block" }}>
              {token === " " ? " " : token}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
}
