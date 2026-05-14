"use client";

/**
 * Measures the actual scroll position of every [data-scene] element in
 * the document and converts each into a {start, end, fadeIn, fadeOut}
 * range expressed as a fraction of total scrollable distance.
 *
 * This replaces the hardcoded SCENE_RANGES percentages — which only
 * held at one viewport size — with live measurements that re-run on
 * resize, font-load, and content change.
 *
 * A [data-scene] element declares which Moon scene plays while it is
 * the dominant section in the viewport. The measured range spans from
 * (element top - half a viewport) to (element bottom - half a
 * viewport), clamped to [0, 1], so the scene is "active" roughly while
 * the section occupies the centre of the screen.
 */
import { useEffect, useState } from "react";
import type { SceneKey } from "@/lib/hooks/useScrollDirector";
import { SCENE_RANGES, type SceneRange } from "@/lib/three/sceneRanges";

export type MeasuredRanges = Partial<Record<SceneKey, SceneRange>>;

export function useMeasuredRanges(): MeasuredRanges {
  // Start with the static ranges so the first paint isn't empty; the
  // effect below overwrites them with measurements once the DOM is laid
  // out.
  const [ranges, setRanges] = useState<MeasuredRanges>(() => {
    const seed: MeasuredRanges = {};
    for (const [key, r] of Object.entries(SCENE_RANGES)) {
      if (r) seed[key as SceneKey] = r;
    }
    return seed;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    function measure() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const vh = window.innerHeight;
      const next: MeasuredRanges = {};

      const nodes = document.querySelectorAll<HTMLElement>("[data-scene]");
      nodes.forEach((node) => {
        const key = node.dataset.scene as SceneKey | undefined;
        if (!key) return;

        const rect = node.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;

        // Scene is active while the section centre passes through the
        // viewport centre: from (top - vh/2) to (bottom - vh/2).
        const startPx = Math.max(0, top - vh * 0.5);
        const endPx = Math.min(maxScroll, bottom - vh * 0.5);

        const start = startPx / maxScroll;
        const end = endPx / maxScroll;
        // Fade margins: ~6% of the scene's own span, capped at 0.03 global.
        const span = Math.max(0.0001, end - start);
        const fadeMargin = Math.min(0.03, span * 0.12);

        next[key] = {
          start,
          end,
          fadeIn: start,
          fadeOut: Math.max(start, end - fadeMargin),
        };
      });

      // Only update if something actually moved — avoids a render loop
      // when ResizeObserver fires with identical metrics.
      setRanges((prev) => {
        const changed = (Object.keys(next) as SceneKey[]).some((k) => {
          const a = prev[k];
          const b = next[k];
          if (!a || !b) return true;
          return (
            Math.abs(a.start - b.start) > 0.001 ||
            Math.abs(a.end - b.end) > 0.001
          );
        });
        return changed ? { ...prev, ...next } : prev;
      });
    }

    // Measure now, after fonts load, and on resize.
    measure();
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => measure());
    ro.observe(document.documentElement);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return ranges;
}

/** Which scene owns this global progress, given a measured ranges map. */
export function measuredSceneAt(
  global: number,
  ranges: MeasuredRanges
): SceneKey {
  for (const [key, r] of Object.entries(ranges) as Array<[
    SceneKey,
    SceneRange,
  ]>) {
    if (global >= r.start && global < r.end) return key;
  }
  return "none";
}
