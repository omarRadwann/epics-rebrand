"use client";

/**
 * Per-character or per-word reveal. Per brief §5: stagger 0.02s,
 * ease [0.16, 1, 0.3, 1].
 *
 * Usage:
 *   <SplitText text="On the record." mode="char" />
 *   <SplitText text="Three shelves." mode="word" stagger={0.05} as="h1" />
 */
import { motion, useInView, type Variants } from "framer-motion";
import { easeEntrance } from "@/lib/motion/eases";
import { useMemo, useRef, type ElementType } from "react";

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
  // render returns a fresh component type, which remounts the whole
  // subtree (and resets the in-view observer) every render.
  const Wrapper = useMemo(() => motion.create(as as ElementType), [as]);

  // useInView fires reliably for elements that are already in the
  // viewport on mount. The previous whileInView + viewport={{ amount:
  // 0.6 }} silently never triggered for above-the-fold headings, so
  // they rendered permanently invisible until the user scrolled.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Wrapper
      ref={ref}
      className={className}
      variants={parentVariants(stagger, delay)}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      aria-label={text}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {tokens.map((token, i) => {
        if (mode === "word" && /^\s+$/.test(token)) {
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
