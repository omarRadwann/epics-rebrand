"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Scroll-triggered reveal — Framer Motion replaces my hand-rolled
 * IntersectionObserver. Each child gets a fade + 28px slide up the
 * first time it enters the viewport. Variants make staggering trivial
 * later (e.g. wrapping multiple <Reveal> in a parent stagger container).
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
