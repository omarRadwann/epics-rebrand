"use client";

import { useEffect, useRef } from "react";

/**
 * Thin saffron bar at the top of the viewport that scales horizontally
 * with scroll progress. Pure transform-based; no layout thrash.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${pct})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-[rgb(var(--saffron))]"
      style={{ transform: "scaleX(0)" }}
      ref={ref}
    />
  );
}
