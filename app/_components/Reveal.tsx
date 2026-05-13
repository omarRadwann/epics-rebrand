"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Scroll-triggered reveal — content is ALWAYS visible (initial opacity is
 * close to 1), and only a small y-translation animates in when the section
 * first enters the viewport.
 *
 * The earlier version used `initial: opacity: 0` plus a conditional
 * `forceShow` state branch. If Framer's IntersectionObserver never fired
 * (hash deep-link, restored scroll, fast programmatic scroll, JS
 * slow/disabled, stale cache hit mid-deploy), the section sat at opacity:0
 * and produced a blank page. Worse, the conditional render branch caused
 * a React hydration mismatch (#423) on cart and other client routes.
 *
 * The fix: a single render path with `initial.opacity` set high enough
 * that the content reads even before any animation runs. If JS is dead,
 * the worst case is "no animation" — never an invisible page, never a
 * hydration mismatch.
 */

const variants: Variants = {
  hidden: { y: 24, opacity: 0.6 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const MotionTag = motion(Tag as React.ElementType);
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
