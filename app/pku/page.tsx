import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "Crystal by Epics — PKU",
  description:
    "Low-protein food, measured in milligrams. The endorsed sub-brand for families who count phenylalanine.",
};

export default function PkuPage() {
  const pkuProducts = productsByCategory("pku");

  return (
    <>
      <Nav />
      <main
        id="main"
        className="bg-paper"
        style={{ ["--accent" as string]: "var(--color-stamp)" }}
      >
        <Reveal as="header" className="border-b border-ink/40 bg-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-stamp/80">
              C-03 · CRYSTAL BY EPICS — PKU
            </p>
            <SplitText
              as="h1"
              text="Crystal."
              mode="char"
              className="font-display text-[clamp(4rem,12vw,10rem)] italic leading-[0.95] tracking-[-0.025em] text-stamp"
            />
            <p className="mt-6 max-w-xl text-[18px] leading-[1.55] text-ink/75">
              Low-protein food, measured in milligrams. The endorsed sub-brand for families
              who manage phenylketonuria. Engineered to ISO 22000, supplemented with psyllium
              for structure.
            </p>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <p className="specimen-lot mb-6 text-ink/60">
            PKU · {pkuProducts.length} SPECIMENS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pkuProducts.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col border border-stamp/40 bg-paper p-6"
              >
                <p className="specimen-lot text-stamp/80">
                  {p.loafNumber.toUpperCase()} · LOT {p.lot}
                </p>
                <h2 className="mt-4 font-display text-[24px] leading-[1.15] tracking-[-0.01em]">
                  {p.name}
                </h2>
                <p className="specimen-spec mt-2 text-ink/55">
                  {p.weight} · ISO {p.iso}
                </p>
                <p className="mt-3 line-clamp-4 text-[14px] leading-[1.5] text-ink/70">
                  {p.description}
                </p>
                {p.servingsHint && (
                  <p className="specimen-lot mt-4 text-stamp/70">{p.servingsHint}</p>
                )}
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-xl text-[14px] italic text-ink/70">
            Phenylalanine values on analytical file — request per-lot certificate from{" "}
            <Link
              href="mailto:crystal@epics-group.com"
              className="text-stamp underline decoration-stamp/40 underline-offset-2"
            >
              crystal@epics-group.com
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
