"use client";

import { useRef } from "react";
import Link from "next/link";

/**
 * Magnetic effect — the button drifts slightly toward the cursor as it
 * approaches. Inner content shifts a little less than the button itself,
 * giving the parallax illusion of "pull."
 */
export function MagneticButton({
  href,
  children,
  className = "",
  innerClassName = "",
  strength = 14,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  strength?: number;
}) {
  const outer = useRef<HTMLAnchorElement | null>(null);
  const inner = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = outer.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    if (inner.current) inner.current.style.transform = `translate(${x * strength * 0.4}px, ${y * strength * 0.4}px)`;
  };

  const reset = () => {
    if (outer.current) outer.current.style.transform = "translate(0,0)";
    if (inner.current) inner.current.style.transform = "translate(0,0)";
  };

  return (
    <Link
      href={href}
      ref={outer}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
      className={className}
    >
      <span
        ref={inner}
        style={{ transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}
        className={innerClassName}
      >
        {children}
      </span>
    </Link>
  );
}
