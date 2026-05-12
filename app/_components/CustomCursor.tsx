"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Saffron dot follows the cursor with slight spring lag. Scales up + becomes
 * a ring when the cursor hovers an interactive element (a, button, [role=button]).
 *
 * Hidden on touch devices and when prefers-reduced-motion is set.
 * Only rendered after first mouse-move so it doesn't sit at 0,0 on load.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch — bail
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dx = 0, dy = 0, rx = 0, ry = 0; // dot follows pointer; ring follows dot with lag
    let raf = 0;

    const interactive = "a, button, [role='button'], input, textarea, select, label[for]";

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (!active) setActive(true);
      const t = e.target as Element | null;
      const hit = t?.closest?.(interactive);
      if (dotRef.current) dotRef.current.setAttribute("data-hover", hit ? "1" : "0");
      if (ringRef.current) ringRef.current.setAttribute("data-hover", hit ? "1" : "0");
    };
    const onDown = () => { if (dotRef.current) dotRef.current.setAttribute("data-press", "1"); };
    const onUp   = () => { if (dotRef.current) dotRef.current.setAttribute("data-press", "0"); };

    const tick = () => {
      // Spring the ring toward the cursor
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] w-10 h-10 border border-[rgb(var(--ink-black))] rounded-full"
        style={{
          transition: "width 220ms cubic-bezier(0.16,1,0.3,1), height 220ms cubic-bezier(0.16,1,0.3,1), border-color 200ms",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] w-1.5 h-1.5 rounded-full bg-[rgb(var(--saffron))]"
        style={{
          transition: "width 160ms cubic-bezier(0.16,1,0.3,1), height 160ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <style jsx global>{`
        @media (pointer: fine) { body { cursor: none; } a, button, [role='button'], input, textarea, select, label[for] { cursor: none; } }
        [data-hover='1'].epics-ring, .epics-ring[data-hover='1'] { width: 56px; height: 56px; }
        [data-press='1'].epics-dot { width: 4px; height: 4px; opacity: 0.7; }
      `}</style>
    </>
  );
}
