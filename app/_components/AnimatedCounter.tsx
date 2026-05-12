"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from `from` to `to` over `duration` ms when scrolled into view.
 * Uses requestAnimationFrame with ease-out-cubic. One-shot — fires once
 * per page load. Respects prefers-reduced-motion by snapping to `to`.
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 1400,
  className = "",
  prefix = "",
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState<number>(from);
  const ref = useRef<HTMLSpanElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      fired.current = true;
      return;
    }

    const start = (t0: number) => {
      const tick = (now: number) => {
        const elapsed = now - t0;
        const p = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(from + (to - from) * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            start(performance.now());
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
