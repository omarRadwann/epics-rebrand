"use client";

/**
 * Mask-up reveal. Per brief §5.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal as="section" delay={0.15}>...</Reveal>
 */
import { motion, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import {
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /** Retained for call-site compatibility; no longer drives a viewport
   *  threshold now that the reveal triggers on mount. */
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
  amount: _amount = 0.2,
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

  // Trigger on mount, not via whileInView / useInView. The
  // IntersectionObserver path silently never fired for above-the-fold
  // sections, leaving them stuck at opacity 0. A mount trigger fades
  // each section in once, reliably, regardless of scroll position.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(true);
  }, []);

  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
