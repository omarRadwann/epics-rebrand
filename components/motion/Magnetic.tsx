"use client";

/**
 * Magnetic — element pulls toward the cursor when nearby.
 * Per brief §5: spring k=8 damping=15. Max pull = 18px on a 200px box.
 *
 * Disabled on touch + reduced-motion.
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { springMagnetic } from "@/lib/motion/eases";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.35,
  radius = 1.6,
  className,
  ...rest
}: MagneticProps & Omit<ComponentProps<typeof motion.span>, "children" | "style">) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springMagnetic);
  const sy = useSpring(y, springMagnetic);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce) , (hover: none)");
    if (mq.matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxR = Math.max(r.width, r.height) * radius;
      if (dist > maxR) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * strength);
      y.set(dy * strength);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, strength, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
