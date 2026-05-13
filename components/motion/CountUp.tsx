"use client";

/**
 * Counts from `from` to `to` over `duration` ms, triggers on enter-viewport.
 * RAF-based. Respects reduced-motion (renders final value immediately).
 */
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;       // ms
  className?: string;
  formatter?: (v: number) => string;
}

export function CountUp({
  from = 0,
  to,
  duration = 1600,
  className,
  formatter,
}: CountUpProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !triggered.current) {
            triggered.current = true;
            const start = performance.now();
            let raf = 0;
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
              setValue(Math.round(from + (to - from) * eased));
              if (t < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
            obs.disconnect();
            return () => cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {formatter ? formatter(value) : value.toLocaleString()}
    </span>
  );
}
