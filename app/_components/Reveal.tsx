"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal — content is ALWAYS visible (opacity:1), and
 * only the entrance animates a small y-translation when the section first
 * enters the viewport.
 *
 * Earlier versions used `initial: opacity: 0` which produced a real bug:
 * if Framer's IntersectionObserver never fired (hash-deep-link, restored
 * scroll, fast programmatic scroll, JS disabled, stale cache hit during a
 * deploy transition), the section sat at opacity:0 forever and the user
 * saw blank cream paper. Worse on a static-exported Next.js app served
 * from a CDN where any unusual fetch sequence could keep content hidden.
 *
 * The rule now: render the content visible. Animate only the transform.
 * If JS is slow/broken/disabled, the worst case is "the page works but
 * doesn't animate." No more invisible pages.
 */

const variants: Variants = {
  hidden: { y: 24, opacity: 0.001 }, // basically visible — just a tiny opacity nudge for the fade-in feel
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
  const ref = useRef<HTMLElement | null>(null);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // If section is already past viewport top on mount (hash-anchor, restored
    // scroll, etc.) snap to shown — no entrance animation.
    if (rect.bottom < 0) setForceShow(true);
  }, []);

  const MotionTag = motion(Tag as React.ElementType);

  if (forceShow) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        initial="show"
        animate="show"
        variants={variants}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
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
