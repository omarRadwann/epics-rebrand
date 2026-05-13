"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal — Framer Motion's `whileInView` with a defensive
 * mount-time check.
 *
 * The defensive check: when a user lands on a hash anchor (e.g.
 * /#manifesto), the browser scrolls past sections above the anchor BEFORE
 * IntersectionObserver attaches. Those sections never intersect, so they
 * stay at `opacity: 0` forever. If the user scrolls UP, they see blank
 * cream paper. Same failure mode for SEO crawlers and any restored scroll
 * position from a back/forward navigation.
 *
 * Fix: on mount, check whether the element is already above the viewport
 * (`bottom < 0`). If so, snap it to the shown state immediately. If it's
 * below the fold, wait for whileInView to trigger normally.
 */

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
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
    // Already scrolled past on initial mount → reveal immediately, no
    // animation. Also handles SSR-restored scroll positions and hash
    // anchors that target a section below this one.
    if (rect.bottom < 0) setForceShow(true);
  }, []);

  const MotionTag = motion(Tag as React.ElementType);

  if (forceShow) {
    // Bypass `whileInView` entirely — the section is already past the
    // viewport, so we just render it visible without animation.
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
