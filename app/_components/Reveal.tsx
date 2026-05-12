"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered fade + slide. Uses IntersectionObserver so it's free —
 * no animation library, no scroll listener.
 *
 * Respects prefers-reduced-motion via the global guard in globals.css that
 * forces animations to 0.001ms.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already in view? (e.g. above-the-fold content on first paint)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const TagAny = Tag as React.ElementType;
  return (
    <TagAny
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
      className={className}
    >
      {children}
    </TagAny>
  );
}
