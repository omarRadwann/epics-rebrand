"use client";

/**
 * Custom cursor — 8px ink-black dot + 36px ring that lags slightly behind
 * via a spring. Ring grows + becomes saffron when hovering interactive
 * elements (links, buttons, [role=button], data-cursor-hover).
 *
 * Disabled when:
 *   - prefers-reduced-motion is on
 *   - pointer is coarse (touch device)
 *   - the user has tabbed (keyboard nav) — body gets [data-keyboard] from a global listener
 */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { springCursorRing } from "@/lib/motion/eases";

const RING_SIZE = 36;
const DOT_SIZE = 8;

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, springCursorRing);
  const ringY = useSpring(y, springCursorRing);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia("(pointer: fine) and (hover: hover)");

    const evaluate = () => {
      const allowed = !mqMotion.matches && mqPointer.matches;
      setEnabled(allowed);
      document.documentElement.classList.toggle("has-custom-cursor", allowed);
    };
    evaluate();
    mqMotion.addEventListener("change", evaluate);
    mqPointer.addEventListener("change", evaluate);

    return () => {
      mqMotion.removeEventListener("change", evaluate);
      mqPointer.removeEventListener("change", evaluate);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const node = el as HTMLElement;
      if (node.closest("a, button, [role=button], [data-cursor-hover], input, textarea, select, summary")) {
        return true;
      }
      return false;
    };

    const onOver = (e: PointerEvent) => setHovering(isInteractive(e.target as Element));
    const onOut = () => setHovering(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          translateX: x,
          translateY: y,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full bg-ink will-change-transform"
      />
      <motion.div
        aria-hidden="true"
        style={{
          translateX: ringX,
          translateY: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          borderColor: hovering ? "var(--color-saffron)" : "var(--color-ink)",
          backgroundColor: hovering ? "rgba(224, 122, 27, 0.08)" : "rgba(224, 122, 27, 0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-ink will-change-transform"
      />
    </>
  );
}
