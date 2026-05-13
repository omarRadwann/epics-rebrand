"use client";

/**
 * Lenis smooth-scroll provider.
 * Wires Lenis RAF loop, feeds normalized progress + velocity to the
 * scroll director, and respects prefers-reduced-motion.
 *
 * Per brief §6: a SINGLE Lenis instance at the page root.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const setReducedMotion = useScrollDirector.getState().setReducedMotion;
    const setProgress = useScrollDirector.getState().setProgress;
    const setVelocity = useScrollDirector.getState().setVelocity;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    let lenis: Lenis | null = null;
    let raf = 0;

    // Only run Lenis when motion is allowed. Otherwise native scroll
    // is fine and Lenis would still emit progress events we don't want.
    if (!mq.matches) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ({ progress, velocity }: { progress: number; velocity: number }) => {
        setProgress(progress);
        setVelocity(velocity);
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      // reduced-motion: hook native scroll to keep the director current
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return <>{children}</>;
}
