"use client";

/**
 * Mask-up reveal on viewport enter. Per brief §5.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal as="section" delay={0.15}>...</Reveal>
 */
import { motion, useInView, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import {
  useMemo,
  useRef,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
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
  amount = 0.2,
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
  // render returns a fresh component type, which remounts the subtree
  // (and resets the in-view observer) every render.
  const Component = useMemo(() => motion.create(as as ElementType), [as]);

  // useInView fires reliably for elements already in the viewport on
  // mount, unlike the previous whileInView + viewport config which
  // left above-the-fold sections stuck at opacity 0 until a scroll.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <Component
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
