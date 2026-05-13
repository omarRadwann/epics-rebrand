/**
 * Scroll Director — single source of truth for normalized scroll progress
 * (0..1) and active Moon scene. Broadcasts to the R3F canvas without going
 * through React context (avoids unnecessary re-renders on every frame).
 *
 * Per Moonshot Brief §6: DOM scrolls, 3D scenes react.
 *
 * Home page scroll timeline:
 *   0.00 – 0.10 → Hero vitrine          (scene: "vitrine")
 *   0.10 – 0.18 → Marquee + manifesto   (scene: "vitrine")
 *   0.18 – 0.35 → Categories corridor   (scene: "corridor")
 *   0.35 – 0.50 → Manifesto extruded    (scene: "manifesto")
 *   0.50 – 0.70 → Products / specimens  (scene: "specimens")
 *   0.70 – 0.85 → Stamp room            (scene: "stamps")
 *   0.85 – 1.00 → Journal + footer      (scene: "stamps")
 */
import { create } from "zustand";

export type SceneKey =
  | "vitrine"
  | "corridor"
  | "manifesto"
  | "specimens"
  | "stamps"
  | "none";

export interface ScrollDirectorState {
  /** 0..1 progress through the whole document */
  progress: number;
  /** Active Moon scene derived from progress */
  scene: SceneKey;
  /** Raw scroll velocity in pixels/frame — fed to velocity-aware components */
  velocity: number;
  /** Whether the user prefers reduced motion (mirrored here for non-React access) */
  reducedMotion: boolean;

  setProgress: (p: number) => void;
  setVelocity: (v: number) => void;
  setReducedMotion: (r: boolean) => void;
}

function deriveScene(progress: number): SceneKey {
  if (progress < 0.18) return "vitrine";
  if (progress < 0.35) return "corridor";
  if (progress < 0.5) return "manifesto";
  if (progress < 0.7) return "specimens";
  if (progress < 1) return "stamps";
  return "stamps";
}

export const useScrollDirector = create<ScrollDirectorState>((set) => ({
  progress: 0,
  scene: "vitrine",
  velocity: 0,
  reducedMotion: false,

  setProgress: (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    set({ progress: clamped, scene: deriveScene(clamped) });
  },
  setVelocity: (v) => set({ velocity: v }),
  setReducedMotion: (r) => set({ reducedMotion: r }),
}));

/**
 * Read scroll-director state outside of React (R3F useFrame, GSAP timelines).
 * Reading the store directly does NOT trigger re-renders.
 */
export const readScrollDirector = () => useScrollDirector.getState();
