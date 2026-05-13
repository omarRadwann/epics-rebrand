import Link from "next/link";
import { notFound } from "next/navigation";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SpecimenHeader } from "@/components/ui/SpecimenHeader";
import { recipes, recipeBySlug } from "@/lib/recipes";
import { productBySlug } from "@/lib/catalog";
import { asset } from "@/lib/asset";

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const r = recipeBySlug(slug);
  if (!r) return { title: "Not in this lot" };
  return {
    title: `${r.title} · ${r.code}`,
    description: r.summary,
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = recipeBySlug(slug);
  if (!recipe) notFound();
  const product = productBySlug(recipe.productSlug);

  const isCrystal = recipe.shelf === "pku";
  const accent = isCrystal ? "text-stamp" : "text-saffron";

  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <SpecimenHeader
          fields={[
            { label: "Method", value: recipe.code },
            { label: "Time", value: recipe.time },
            { label: "Yield", value: recipe.yield },
            { label: "Shelf", value: recipe.shelf },
            ...(product
              ? [{ label: "From", value: product.loafNumber }]
              : []),
          ]}
        />

        {/* Magazine-spread hero */}
        <section className="border-b border-ink/15">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-12 gap-y-10 px-6 py-16 sm:px-12 lg:grid-cols-12 lg:px-24 lg:py-24">
            <div className="lg:col-span-7">
              <div
                className="aspect-[5/4] w-full border border-ink/15"
                style={{
                  backgroundImage: `url(${asset(recipe.imageUrl)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={`${recipe.title} — photograph`}
              />
            </div>
            <div className="lg:col-span-5">
              <p className={`specimen-lot ${accent}`}>
                {recipe.code} · METHOD
              </p>
              <SplitText
                as="h1"
                text={recipe.title}
                mode="word"
                className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.025em]"
              />
              {recipe.arabicTitle && (
                <p
                  className="font-display mt-3 text-[20px] italic text-ink/65"
                  lang="ar"
                  dir="rtl"
                >
                  {recipe.arabicTitle}
                </p>
              )}
              <p className="mt-8 text-[16px] leading-[1.6] text-ink/80">
                {recipe.summary}
              </p>

              {product && (
                <div className="mt-10 border-t border-ink/15 pt-6">
                  <p className="specimen-lot text-ink/55">METHOD USES</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-2 inline-flex items-baseline gap-3 no-underline transition-colors hover:text-saffron"
                  >
                    <span className="specimen-lot text-ink/55">
                      {product.loafNumber.toUpperCase()}
                    </span>
                    <span className="font-display text-[22px] leading-[1.15]">
                      {product.name}
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              )}

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-6 text-ink/85">
                <Spec label="Time" value={recipe.time} />
                <Spec label="Yield" value={recipe.yield} />
              </dl>
            </div>
          </div>
        </section>

        {/* Footnote — method is canonically published by Epics editorial.
            For Phase 9 we link back to the source on epics-group.com; the
            full step-by-step method gets ported here in a later phase. */}
        <Reveal as="section">
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-24">
            <p className="specimen-lot text-ink/55">F-{recipe.code} · FOOTNOTE</p>
            <p className="mt-4 max-w-2xl font-display text-[26px] italic leading-[1.3] tracking-[-0.01em]">
              Methods are instructions, not stories. Real timings, real measures,
              published the way pharmacists publish dosages. The full step-by-step
              for this method is in the Epics print recipe book.
            </p>
            <Link
              href="/recipes"
              className="specimen-spec mt-10 inline-block underline decoration-[1px] underline-offset-[6px] hover:decoration-2"
            >
              ← BACK TO THE METHOD BOOK
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="specimen-lot text-ink/60">{label.toUpperCase()}</dt>
      <dd className="font-display text-[22px] leading-[1.2]">{value}</dd>
    </>
  );
}
