"use client";

/**
 * 3D tilt on hover. Per brief §5: max 8°, damped.
 * Disabled on touch + reduced-motion.
 */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  max?: number;            // degrees
  perspective?: number;    // px
  className?: string;
  scale?: number;
}

export function Tilt({
  children,
  max = 8,
  perspective = 1000,
  scale = 1.02,
  className,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  const sy = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ scale }}
      style={{
        perspective,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
