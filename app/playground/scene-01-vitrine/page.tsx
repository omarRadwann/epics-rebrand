"use client";

/**
 * /playground/scene-01-vitrine
 *
 * Moon #1 in isolation. The R3F canvas sits fixed behind the page; the
 * DOM provides scroll length so the scroll director can drive particle
 * condensation toward the EPICS wordmark.
 *
 * This is the iteration surface — once the scene is shippable it gets
 * promoted into the home page in Phase 3.
 */
import dynamic from "next/dynamic";
import { Nav } from "@/components/layout/Nav";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const Vitrine = dynamic(
  () => import("@/components/three/scenes/Vitrine").then((m) => m.Vitrine),
  { ssr: false }
);

export default function PlaygroundVitrine() {
  return (
    <>
      <Nav />

      {/* Fixed canvas root, behind DOM content.
          Playground uses the full document scroll (0..1) instead of the
          0..0.18 slice the home page allocates to the vitrine. */}
      <CanvasRoot>
        <Vitrine range={{ start: 0, end: 1 }} />
      </CanvasRoot>

      <main id="main" className="relative">
        {/* Hero section — first viewport, scene fills the space */}
        <section className="relative flex min-h-[100vh] flex-col justify-end px-6 pb-12 pt-32 sm:px-12 lg:px-24">
          <p className="specimen-lot text-ink/60">
            PLAYGROUND · SCENE-01 · MOON #1
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em]">
            The Specimen Vitrine.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-[1.55] text-ink/70">
            A real specimen loaf on a dark plinth inside a hairline display case — a
            contained field of wheat grains drifts behind it in warmth-biased light.
            Scroll to condense them into the brand mark.
          </p>
        </section>

        {/* Scroll spacers — give the scene 200vh of progress so condensation
            (which happens 0.04 .. 0.16) is comfortably readable. */}
        <section className="min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ScrollMarker label="SCROLL · 50%" hint="The wheat grains lift and begin to condense toward the wordmark." />
        </section>

        <section className="min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ScrollMarker label="SCROLL · 100%" hint="The wordmark resolves. Continue down the page for the corridor handoff (Phase 4)." />
        </section>
      </main>
    </>
  );
}

function ScrollMarker({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="mx-auto flex h-full max-w-[1440px] items-center justify-end">
      <div className="max-w-sm text-right">
        <p className="specimen-lot text-ink/60">{label}</p>
        <p className="mt-3 text-[14px] leading-[1.5] text-ink/65">{hint}</p>
      </div>
    </div>
  );
}
