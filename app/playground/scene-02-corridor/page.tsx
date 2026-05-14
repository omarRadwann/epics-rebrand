"use client";

/**
 * /playground/scene-02-corridor
 *
 * Moon #2 in isolation. Scroll to fly the camera along a Catmull-Rom
 * curve through three illuminated shelves (S-01 wheat, S-02 sugar,
 * S-03 prismatic).
 *
 * Promoted into the home page in Phase 5 (or wired into the same
 * canvas as Vitrine via scene swap when Phase 3's HomeCanvas becomes
 * a multi-scene dispatcher).
 */
import dynamic from "next/dynamic";
import { Nav } from "@/components/layout/Nav";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const Corridor = dynamic(
  () => import("@/components/three/scenes/Corridor").then((m) => m.Corridor),
  { ssr: false }
);

export default function PlaygroundCorridor() {
  return (
    <>
      <Nav />

      {/* Fixed canvas root, behind DOM content.
          Playground uses the full document scroll (0..1) instead of the
          0.18..0.35 slice the home page allocates to the corridor. */}
      <CanvasRoot>
        <Corridor range={{ start: 0, end: 1 }} />
      </CanvasRoot>

      <main id="main" className="relative">
        {/* Hero — first viewport, before the fly-through begins */}
        <section className="relative flex min-h-[100vh] flex-col justify-end px-6 pb-12 pt-32 sm:px-12 lg:px-24">
          <p className="specimen-lot text-paper">
            PLAYGROUND · SCENE-02 · MOON #2
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-paper">
            Three shelves.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-[1.55] text-paper/70">
            Camera flies forward along a Catmull-Rom curve, passing each
            shelf in turn. Wheat-gold, cool blue, prismatic — one body per
            shelf, same gravity.
          </p>
        </section>

        {/* Shelf marker — S-01 */}
        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ShelfMarker
            code="S-01"
            label="Gluten-Free"
            tone="text-shelf-01"
            hint="Wheat-gold key light, a single loaf at rest on the plinth."
          />
        </section>

        {/* Shelf marker — S-02 */}
        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ShelfMarker
            code="S-02"
            label="Sugar-Free"
            tone="text-shelf-02"
            hint="Cool blue, a faceted sugar crystal catching the key."
          />
        </section>

        {/* Shelf marker — S-03 */}
        <section className="relative min-h-[100vh] px-6 sm:px-12 lg:px-24">
          <ShelfMarker
            code="S-03"
            label="Crystal · PKU"
            tone="text-shelf-03"
            hint="Prismatic refraction — walking inside a quartz crystal."
          />
        </section>
      </main>
    </>
  );
}

function ShelfMarker({
  code,
  label,
  tone,
  hint,
}: {
  code: string;
  label: string;
  tone: string;
  hint: string;
}) {
  return (
    <div className="mx-auto flex h-full max-w-[1440px] items-center justify-end">
      <div className="max-w-sm text-right">
        <p className={`specimen-lot ${tone}`}>{code}</p>
        <p className={`mt-1 font-display text-[28px] leading-[1.15] tracking-[-0.015em] text-paper`}>
          {label}
        </p>
        <p className="mt-3 text-[14px] leading-[1.5] text-paper/70">{hint}</p>
      </div>
    </div>
  );
}
