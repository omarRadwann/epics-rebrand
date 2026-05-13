"use client";

/**
 * Single hook to get the active perf profile.
 * Tier is detected on first mount and stable thereafter
 * (we don't dynamically retier mid-scene to avoid layout thrash).
 */
import { useMemo } from "react";
import { detectTier, getProfile, type PerfProfile, type Tier } from "@/lib/three/perfBudget";

let cachedTier: Tier | null = null;

export function usePerfTier(): PerfProfile {
  return useMemo(() => {
    if (!cachedTier) cachedTier = detectTier();
    return getProfile(cachedTier);
  }, []);
}

/** Server-safe default (used for SSR placeholders that never paint anyway). */
export const ssrProfile = getProfile("desktop-low");
