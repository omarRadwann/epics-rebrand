"use client";

/**
 * Single R3F canvas, fixed full-viewport, behind DOM content.
 * All five Moon scenes render into this one canvas.
 *
 * Position: fixed; z-index: -1; pointer-events: none — DOM scrolls over it.
 * Per brief §6.
 *
 * Children are R3F scene components. In playground routes the scene is
 * passed directly; in the main app it's selected by the scroll director.
 */
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { usePerfTier } from "@/lib/hooks/usePerfTier";

interface CanvasRootProps {
  children: ReactNode;
  /** Override to make the canvas non-fixed (e.g., in a playground card). */
  fullBleed?: boolean;
  className?: string;
}

export function CanvasRoot({
  children,
  fullBleed = true,
  className = "",
}: CanvasRootProps) {
  const profile = usePerfTier();

  const containerClass = fullBleed
    ? `canvas-root ${className}`
    : `relative h-full w-full ${className}`;

  const glProps: CanvasProps["gl"] = {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  };

  return (
    <div className={containerClass} aria-hidden="true">
      <Canvas
        dpr={profile.dprCap}
        gl={glProps}
        camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0.2, 5] }}
        frameloop={profile.tier === "reduced" ? "demand" : "always"}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
