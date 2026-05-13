/**
 * Scene-range registry for the home page.
 *
 * The home page is a single scroll timeline. Each Moon scene owns a
 * slice of the [0..1] global progress. This file is the single source
 * of truth for those slices — the scene dispatcher reads from here to
 * decide which scene to mount, and each scene normalises its own
 * progress against its declared range.
 *
 * Per Moonshot Brief §6 scroll choreography.
 */
import type { SceneKey } from "@/lib/hooks/useScrollDirector";

export interface SceneRange {
  /** Inclusive start of this scene's slice of the global timeline. */
  start: number;
  /** Exclusive end (next scene's start, except for the last). */
  end: number;
  /** Where to cross-fade in. */
  fadeIn: number;
  /** Where to cross-fade out (must be <= end). */
  fadeOut: number;
}

/**
 * Ranges calibrated to *measured* home-page DOM section positions
 * (preview run, viewport 1440x900, scrollH 5013, max scroll 4113):
 *
 *   Hero          scroll 0.00 .. 0.30   → vitrine
 *   Marquee+Stats scroll 0.30 .. 0.41   → opaque ink, no canvas
 *   Manifesto     scroll 0.41 .. 0.58   → manifesto extruded text
 *   Marquee 2     scroll 0.58 .. 0.60   → paper, no canvas
 *   Categories    scroll 0.60 .. 0.78   → corridor fly-through
 *   Popular       scroll 0.78 .. 0.90   → (specimens-DOM, no canvas)
 *   Certs+Journal scroll 0.90 .. 1.00   → opaque, no canvas
 *
 * Phase 11 will replace these hardcoded values with section-bound
 * IntersectionObserver measurements so ranges adapt to viewport size
 * + content edits without manual recalibration.
 */
export const SCENE_RANGES: Record<SceneKey, SceneRange | null> = {
  vitrine:   { start: 0.00, end: 0.30, fadeIn: 0.00, fadeOut: 0.28 },
  manifesto: { start: 0.41, end: 0.58, fadeIn: 0.41, fadeOut: 0.56 },
  corridor:  { start: 0.60, end: 0.78, fadeIn: 0.60, fadeOut: 0.76 },
  specimens: null,                                                    // DOM-rendered specimen slides on /shop
  stamps:    { start: 0.86, end: 0.97, fadeIn: 0.86, fadeOut: 0.95 },
  none:      null,
};

/** Map global scroll progress (0..1) to local progress (0..1) for a
 *  given scene range. Saturates at the edges. */
export function localProgress(global: number, range: SceneRange): number {
  const { start, end } = range;
  if (global <= start) return 0;
  if (global >= end) return 1;
  return (global - start) / (end - start);
}

/** Fade alpha (0..1) for the canvas wrapper given global progress.
 *  Fades in from `fadeIn` for ~0.02 of scroll, and out into `fadeOut`
 *  for ~0.02 of scroll. */
export function fadeAlpha(global: number, range: SceneRange): number {
  const fadeWidth = 0.02;
  const a = (global - (range.fadeIn - fadeWidth)) / fadeWidth;
  const b = (range.fadeOut + fadeWidth - global) / fadeWidth;
  return Math.max(0, Math.min(1, Math.min(a, b)));
}

/** Which scene owns this global progress, if any. */
export function sceneAt(global: number): SceneKey {
  for (const [key, r] of Object.entries(SCENE_RANGES) as Array<[
    SceneKey,
    SceneRange | null,
  ]>) {
    if (!r) continue;
    if (global >= r.start && global < r.end) return key;
  }
  return "none";
}
