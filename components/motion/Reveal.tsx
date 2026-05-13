"use client";

/**
 * Mask-up reveal on viewport enter. Per brief §5.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal as="section" delay={0.15}>...</Reveal>
 */
import { motion, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import { type ComponentProps, type ElementType, type ReactNode } from "react";

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
}: RevealProps & Omit<ComponentProps<typeof motion.div>, "children" | "variants" | "initial" | "whileInView" | "viewport" | "transition">) {
  // framer-motion supports motion(tag) for custom elements
  const Component = motion.create(as as ElementType);

  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
