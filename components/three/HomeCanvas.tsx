"use client";

/**
 * Home-page R3F canvas host + multi-scene dispatcher.
 *
 * The home page scrolls through several scenes (Vitrine → Corridor →
 * Manifesto → Stamps, with non-canvas DOM sections in between). One
 * canvas, one WebGL context — the active scene's component is mounted
 * inside; siblings unmount when scrolled out of their range.
 *
 * The canvas wrapper crossfades at scene boundaries so the swap reads
 * as a clean cut rather than a hard pop. Past the last scene's range
 * the canvas unmounts entirely and frees the WebGL context.
 *
 * Per Moonshot Brief §6 scroll choreography.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import {
  SCENE_RANGES,
  fadeAlpha,
  sceneAt,
} from "@/lib/three/sceneRanges";

const CanvasRoot = dynamic(
  () => import("./CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const Vitrine = dynamic(
  () => import("./scenes/Vitrine").then((m) => m.Vitrine),
  { ssr: false }
);

const Corridor = dynamic(
  () => import("./scenes/Corridor").then((m) => m.Corridor),
  { ssr: false }
);

const ManifestoText = dynamic(
  () => import("./scenes/ManifestoText").then((m) => m.ManifestoText),
  { ssr: false }
);

// Keep canvas alive until past the last canvas scene (corridor ends at 0.96).
// Pad a bit so the fade-out completes before unmount.
const UNMOUNT_AFTER = 0.98;

export function HomeCanvas() {
  const [scene, setScene] = useState<string>("vitrine");
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let lastScene = "vitrine";
    let lastBucket = -1;
    let lastMounted = true;

    const unsub = useScrollDirector.subscribe((state) => {
      const p = state.progress;

      const activeScene = sceneAt(p);

      // Compute fade alpha against whichever scene currently owns p, or
      // — if we're between scenes — use the nearest range's fade-out.
      const range =
        activeScene !== "none"
          ? (SCENE_RANGES[activeScene] ?? null)
          : null;
      const alpha = range ? fadeAlpha(p, range) : 0;
      const bucket = Math.round(alpha * 16);
      const nextMounted = p < UNMOUNT_AFTER;

      if (activeScene !== lastScene && activeScene !== "none" && activeScene !== "specimens") {
        lastScene = activeScene;
        setScene(activeScene);
      }
      if (bucket !== lastBucket) {
        lastBucket = bucket;
        setOpacity(bucket / 16);
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
        transition: "opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
      }}
    >
      <CanvasRoot>
        {scene === "vitrine" && <Vitrine />}
        {scene === "corridor" && <Corridor />}
        {scene === "manifesto" && <ManifestoText />}
      </CanvasRoot>
    </div>
  );
}
