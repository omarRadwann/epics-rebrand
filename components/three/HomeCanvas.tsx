"use client";

/**
 * Home-page R3F canvas host.
 *
 * Mounts the Moon #1 Vitrine and fades the entire canvas out as scroll
 * progress crosses the corridor handoff threshold (0.18 → 0.24). Past
 * that point the canvas is invisible AND the WebGL loop is paused
 * (frameloop="demand") so we don't burn GPU on something the user can't
 * see.
 *
 * Phase 4 will replace this single-scene mount with a multi-scene
 * dispatcher that switches based on `scrollDirector.scene`. For now
 * it's just the vitrine.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";

const CanvasRoot = dynamic(
  () => import("./CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const Vitrine = dynamic(
  () => import("./scenes/Vitrine").then((m) => m.Vitrine),
  { ssr: false }
);

const FADE_START = 0.18;
const FADE_END = 0.24;
const UNMOUNT_AT = 0.32;

export function HomeCanvas() {
  // Mirror progress into local state, but throttled to one render per
  // visible-state transition so we don't re-render on every Lenis tick.
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let lastBucket = -1;
    let lastMounted = true;
    const unsub = useScrollDirector.subscribe((state) => {
      const p = state.progress;
      // 12-step opacity quantisation — visually identical, ~12x fewer
      // React re-renders than mirroring every Lenis tick.
      const raw =
        p < FADE_START
          ? 1
          : p > FADE_END
            ? 0
            : 1 - (p - FADE_START) / (FADE_END - FADE_START);
      const bucket = Math.round(raw * 12);
      const nextMounted = p < UNMOUNT_AT;
      if (bucket !== lastBucket) {
        lastBucket = bucket;
        setOpacity(bucket / 12);
      }
      if (nextMounted !== lastMounted) {
        lastMounted = nextMounted;
        setMounted(nextMounted);
      }
    });
    return unsub;
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        opacity,
        transition: "opacity 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
      }}
    >
      <CanvasRoot>
        <Vitrine />
      </CanvasRoot>
    </div>
  );
}
