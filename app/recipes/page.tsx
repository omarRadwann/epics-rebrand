import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { recipes } from "@/lib/recipes";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "Recipes · The Method Book",
  description:
    "Real measures, real timings. Recipes published the way pharmacists publish dosages.",
};

export default function RecipesIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/15">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-ink/60">
              R-00 · THE METHOD BOOK
            </p>
            <SplitText
              as="h1"
              text="Real measures."
              mode="word"
              className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.025em]"
            />
            <p className="mt-6 max-w-xl text-[18px] leading-[1.55] text-ink/75">
              {recipes.length} published methods. Mixed with real grams, real
              minutes, real ovens. Photographed on cream, not wood.
            </p>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <ol className="grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="group block no-underline"
                  data-cursor-hover
                >
                  <div
                    className="relative aspect-[5/4] overflow-hidden border border-ink/15 bg-linen-mid/40"
                    style={{
                      backgroundImage: `url(${asset(r.imageUrl)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                  </div>
                  <p className="specimen-lot mt-4 text-ink/55">
                    {r.code} · {r.shelf.toUpperCase()} · {r.time.toUpperCase()}
                  </p>
                  <h2 className="mt-2 font-display text-[24px] leading-[1.2] tracking-[-0.01em] text-ink">
                    {r.title}
                  </h2>
                  {r.arabicTitle && (
                    <p
                      className="font-display mt-1 text-[15px] italic text-ink/55"
                      lang="ar"
                      dir="rtl"
                    >
                      {r.arabicTitle}
                    </p>
                  )}
                  <p className="mt-3 line-clamp-2 text-[14px] leading-[1.55] text-ink/70">
                    {r.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
