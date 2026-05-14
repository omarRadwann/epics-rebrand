/**
 * Performance budget for R3F scenes. Per brief §9:
 *   - 60fps on M1 Air @ 1440p
 *   - Mobile: drop particle counts by 60%, disable postprocessing
 *   - DPR cap at 2 desktop, 1.5 mobile
 *   - prefers-reduced-motion: freeze scenes on hero frame
 *
 * This is the single source of truth — every scene reads from it
 * via useTier() and adapts its instance counts / effects.
 */
export type Tier = "desktop-high" | "desktop-low" | "mobile" | "reduced";

export interface PerfProfile {
  tier: Tier;
  dprCap: [number, number];      // [min, max] for <Canvas dpr={...}>
  particles: {
    wheatGrains: number;
    sugarCrystals: number;
  };
  postprocessing: {
    bloom: boolean;
    chromaticAberration: boolean;
    dof: boolean;
    grain: boolean;
  };
  animations: {
    handheldCamera: boolean;
    particleDrift: boolean;
    cursorPull: boolean;
  };
}

export const profiles: Record<Tier, PerfProfile> = {
  // Counts cut hard from the original brief target (8000): the
  // per-frame instanced-matrix rebuild was the home page's biggest
  // main-thread cost. 2800 still reads as a full grain field and
  // gives the EPICS wordmark ample density (~14 grains per sample).
  "desktop-high": {
    tier: "desktop-high",
    dprCap: [1, 2],
    particles: { wheatGrains: 2800, sugarCrystals: 1800 },
    postprocessing: { bloom: true, chromaticAberration: true, dof: false, grain: true },
    animations: { handheldCamera: true, particleDrift: true, cursorPull: false },
  },
  "desktop-low": {
    tier: "desktop-low",
    dprCap: [1, 1.5],
    particles: { wheatGrains: 1600, sugarCrystals: 1000 },
    postprocessing: { bloom: true, chromaticAberration: false, dof: false, grain: true },
    animations: { handheldCamera: true, particleDrift: true, cursorPull: false },
  },
  mobile: {
    tier: "mobile",
    dprCap: [1, 1.5],
    particles: { wheatGrains: 900, sugarCrystals: 600 },
    postprocessing: { bloom: false, chromaticAberration: false, dof: false, grain: false },
    animations: { handheldCamera: false, particleDrift: true, cursorPull: false },
  },
  reduced: {
    tier: "reduced",
    dprCap: [1, 1],
    particles: { wheatGrains: 600, sugarCrystals: 400 },
    postprocessing: { bloom: false, chromaticAberration: false, dof: false, grain: false },
    animations: { handheldCamera: false, particleDrift: false, cursorPull: false },
  },
};

/** Heuristic GPU classification — runs once on first canvas mount.
 *  Reads navigator.userAgent + hardwareConcurrency + devicePixelRatio.
 *  Never blocks the scene from rendering. */
export function detectTier(): Tier {
  if (typeof window === "undefined") return "desktop-low";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }

  const ua = navigator.userAgent.toLowerCase();
  const isMobile =
    /mobi|android|iphone|ipad|tablet/.test(ua) ||
    (window.innerWidth < 768 && "ontouchstart" in window);
  if (isMobile) return "mobile";

  const cores = navigator.hardwareConcurrency ?? 4;
  const dpr = window.devicePixelRatio ?? 1;

  // Heuristic: low-end desktop if few cores OR retina-scaled low-clock
  if (cores < 4 || (cores < 8 && dpr < 1.5)) return "desktop-low";

  return "desktop-high";
}

export function getProfile(tier: Tier): PerfProfile {
  return profiles[tier];
}
