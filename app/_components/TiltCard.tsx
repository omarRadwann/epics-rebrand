"use client";

import { useRef } from "react";

/**
 * 3D tilt-on-hover wrapper. Tracks mouse position relative to the card
 * center and applies a perspective rotation. Reset smoothly on leave.
 *
 * Cheap — no event subscription beyond the element itself. Skips on
 * prefers-reduced-motion (we just don't move).
 */
export function TiltCard({
  children,
  maxDeg = 6,
  className = "",
}: {
  children: React.ReactNode;
  maxDeg?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -y * maxDeg * 2;
    const ry = x * maxDeg * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 360ms cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      {children}
    </div>
  );
}
