"use client";

/**
 * /playground/scene-05-stamps
 *
 * Moon #5 in isolation. Scroll laterally-feeling (camera glides
 * sideways) past three embossed seals — ISO 22000, ISO 9001, Halal.
 *
 * The home-page integration in Phase 11 will require either changing
 * the Certs section background to ink (so the dark stamp room reads)
 * or inserting a dedicated canvas-anchored slot before the editorial
 * Certs block.
 */
import dynamic from "next/dynamic";
import { Nav } from "@/components/layout/Nav";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const StampRoom = dynamic(
  () => import("@/components/three/scenes/StampRoom").then((m) => m.StampRoom),
  { ssr: false }
);

export default function PlaygroundStamps() {
  return (
    <>
      <Nav />

      <CanvasRoot>
        <StampRoom range={{ start: 0, end: 1 }} />
      </CanvasRoot>

      <main id="main" className="relative">
        <section className="relative flex min-h-[100vh] flex-col justify-end px-6 pb-12 pt-32 sm:px-12 lg:px-24">
          <p className="specimen-lot text-paper">
            PLAYGROUND · SCENE-05 · MOON #5
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-paper">
            The Stamp Room.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-[1.55] text-paper/70">
            ISO 22000 / ISO 9001 / Halal — three embossed seals catching a
            single key light. Scroll to glide past each in turn.
          </p>
        </section>

        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ScrollMarker code="X-01-A" label="ISO 22000 : 2018" />
        </section>
        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ScrollMarker code="X-01-B" label="ISO 9001 : 2015" />
        </section>
        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ScrollMarker code="X-01-C" label="HALAL · EHA-2025-0061" />
        </section>
      </main>
    </>
  );
}

function ScrollMarker({ code, label }: { code: string; label: string }) {
  return (
    <div className="mx-auto flex h-full max-w-[1440px] items-center justify-end">
      <div className="max-w-sm text-right">
        <p className="specimen-lot text-paper/65">{code}</p>
        <p className="mt-1 font-display text-[28px] leading-[1.15] tracking-[-0.015em] text-paper">
          {label}
        </p>
      </div>
    </div>
  );
}
