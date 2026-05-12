"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

/**
 * Split-word headline reveal with Framer Motion. Each word lifts from
 * 110% below its baseline to its position, staggered. Triggers once
 * when the headline enters the viewport.
 *
 * Use `children` for a single-line headline, or `lines` for a multi-line
 * one (preserves line breaks).
 */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

type Line = string | { text: string; className?: string };

export function TextReveal({
  children,
  lines,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children?: string;
  lines?: Line[];
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const sourceLines: Line[] = lines ?? (children ? [children] : []);
  const MotionTag = motion(Tag as React.ElementType);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      transition={{ delayChildren: delay / 1000 }}
    >
      {sourceLines.map((line, lineI) => {
        const text = typeof line === "string" ? line : line.text;
        const lineClassName = typeof line === "string" ? "" : line.className ?? "";
        const words = text.split(" ");
        return (
          <Fragment key={lineI}>
            {words.map((w, wI) => (
              <span
                key={`${lineI}-${wI}`}
                className={`inline-block overflow-hidden align-baseline ${lineClassName}`}
                style={{ whiteSpace: "pre" }}
              >
                <motion.span className="inline-block" variants={word}>
                  {w}
                  {wI < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
            {lineI < sourceLines.length - 1 && <br />}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
