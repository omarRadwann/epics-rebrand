"use client";

/**
 * Infinite-loop marquee, velocity-aware: speeds up when the page is
 * scrolling fast. Per brief §5.
 *
 * Two copies of the content side-by-side, animated -50% to seam-blend.
 */
import { motion } from "framer-motion";
import { type ReactNode, useMemo } from "react";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";

interface MarqueeProps {
  children: ReactNode;
  speedSeconds?: number;     // baseline loop duration
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  background?: "paper" | "ink" | "transparent";
}

export function Marquee({
  children,
  speedSeconds = 40,
  reverse = false,
  pauseOnHover = false,
  className = "",
  background = "paper",
}: MarqueeProps) {
  // For now, keep it simple — read velocity once and tweak base speed.
  // (Hot-reading velocity per frame would defeat the CSS-driven animation;
  // the velocity boost is applied via duration recalculation only.)
  const velocity = useScrollDirector((s) => s.velocity);
  const adjustedDuration = useMemo(() => {
    const abs = Math.min(Math.abs(velocity || 0), 3);
    return Math.max(8, speedSeconds - abs * 4); // up to 12s faster at high scroll
  }, [velocity, speedSeconds]);

  const bgClass =
    background === "ink"
      ? "bg-ink text-paper"
      : background === "paper"
        ? "bg-paper text-ink"
        : "bg-transparent text-ink";

  return (
    <div
      className={`marquee-mask relative overflow-hidden ${bgClass} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: adjustedDuration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={pauseOnHover ? undefined : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
