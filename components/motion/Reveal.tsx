"use client";

/**
 * Mask-up reveal on viewport enter. Per brief §5.
 *
 * Re-triggers every time the element enters the viewport
 * (viewport.once = false) — so scrolling back up replays the reveal
 * instead of leaving a static page. The element only returns to its
 * hidden state once it is fully out of view, so a partially-scrolled
 * section never flickers.
 *
 * History: an earlier pass replaced the viewport trigger with a
 * one-shot mount trigger to escape an "invisible heroes" bug. The real
 * cause of that bug was calling motion.create() inline on every render
 * (a fresh component type → the subtree remounts → the viewport
 * observer is destroyed mid-scroll). That is fixed below with useMemo,
 * so the scroll-linked trigger is safe again — and it has to be, or
 * there is no reveal choreography at all.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal as="section" delay={0.15}>...</Reveal>
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import {
  useMemo,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /** Fraction of the element that must be visible to trigger. Kept low
   *  (0.15) on purpose — a high threshold silently never fires for
   *  elements taller than the viewport. */
  amount?: number;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeEntrance },
  },
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  amount = 0.15,
  className,
  id,
  ...rest
}: RevealProps &
  Omit<
    ComponentProps<typeof motion.div>,
    | "children"
    | "variants"
    | "initial"
    | "animate"
    | "whileInView"
    | "viewport"
    | "transition"
  >) {
  // motion.create() must be memoised — calling it inline on every
  // render returns a fresh component type, which remounts the subtree.
  const Component = useMemo(() => motion.create(as as ElementType), [as]);
  const reduced = useReducedMotion();

  // Reduced motion: render shown, no scroll trigger, no offset.
  if (reduced) {
    return (
      <Component id={id} className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
