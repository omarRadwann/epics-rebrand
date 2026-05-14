"use client";

/**
 * Home-page R3F canvas host + multi-scene dispatcher.
 *
 * The home page scrolls through several scenes (Vitrine → Manifesto →
 * Corridor → Stamps, with non-canvas DOM sections in between). One
 * canvas, one WebGL context — the active scene's component is mounted
 * inside; siblings unmount when scrolled out of their range.
 *
 * Scene ranges are MEASURED from the live DOM ([data-scene] sections)
 * via useMeasuredRanges, so they adapt to viewport size, font-load
 * reflow, and content edits — no hardcoded percentages.
 *
 * The canvas wrapper crossfades at scene boundaries so the swap reads
 * as a clean cut rather than a hard pop. Past the last scene's range
 * the canvas unmounts entirely and frees the WebGL context.
 *
 * Per Moonshot Brief §6 scroll choreography.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { fadeAlpha, type SceneRange } from "@/lib/three/sceneRanges";
import {
  useMeasuredRanges,
  measuredSceneAt,
  type MeasuredRanges,
} from "@/lib/three/useMeasuredRanges";

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

const StampRoom = dynamic(
  () => import("./scenes/StampRoom").then((m) => m.StampRoom),
  { ssr: false }
);

export function HomeCanvas() {
  const measured = useMeasuredRanges();
  // Keep the latest measured ranges in a ref so the scroll subscriber
  // (which is set up once) always reads current values.
  const rangesRef = useRef<MeasuredRanges>(measured);
  rangesRef.current = measured;

  const [scene, setScene] = useState<string>("vitrine");
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let lastScene = "vitrine";
    let lastBucket = -1;
    let lastMounted = true;

    const unsub = useScrollDirector.subscribe((state) => {
      const p = state.progress;
      const ranges = rangesRef.current;

      const activeScene = measuredSceneAt(p, ranges);
      const range: SceneRange | null =
        activeScene !== "none" ? (ranges[activeScene] ?? null) : null;

      const alpha = range ? fadeAlpha(p, range) : 0;
      const bucket = Math.round(alpha * 16);

      // Canvas stays mounted while p is inside ANY measured range.
      // Compute the latest scene end so we can release the WebGL
      // context once the user has scrolled past every canvas scene.
      let lastEnd = 0;
      for (const r of Object.values(ranges)) {
        if (r && r.end > lastEnd) lastEnd = r.end;
      }
      const nextMounted = p < lastEnd + 0.02;

      if (
        activeScene !== lastScene &&
        activeScene !== "none" &&
        activeScene !== "specimens"
      ) {
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

  // Pass the measured range to each scene so it normalises its local
  // progress against the live DOM, not the static fallback.
  const activeRange = measured[scene as keyof MeasuredRanges];

  return (
    <div
      style={{
        opacity,
        transition: "opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
      }}
    >
      <CanvasRoot>
        {scene === "vitrine" && <Vitrine range={activeRange} />}
        {scene === "corridor" && <Corridor range={activeRange} />}
        {scene === "manifesto" && <ManifestoText range={activeRange} />}
        {scene === "stamps" && <StampRoom range={activeRange} />}
      </CanvasRoot>
    </div>
  );
}
