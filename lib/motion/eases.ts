/**
 * Motion constants — single source of truth for easing curves and springs
 * across Framer Motion, GSAP, and R3F. Per Moonshot Brief §5.
 *
 * Entrance ease: [0.16, 1, 0.3, 1] — sine-out-quint
 * Exit ease:     [0.7, 0, 0.84, 0]
 * Default spring: { stiffness: 200, damping: 30, mass: 1 }
 */
import type { Transition } from "framer-motion";

export const easeEntrance: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeExit: [number, number, number, number] = [0.7, 0, 0.84, 0];

export const springDefault: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1,
};

/** Magnetic-cursor spring — softer, faster recovery */
export const springMagnetic: Transition = {
  type: "spring",
  stiffness: 8,
  damping: 15,
  mass: 0.5,
};

/** Cursor-ring follow spring — lags slightly behind the dot */
export const springCursorRing: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.45,
};

/** Default transition for FM revealed elements */
export const transitionEntrance: Transition = {
  duration: 0.9,
  ease: easeEntrance,
};

export const transitionExit: Transition = {
  duration: 0.5,
  ease: easeExit,
};
