import { notFound } from "next/navigation";
import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/Magnetic";
import { SpecimenHeader } from "@/components/ui/SpecimenHeader";
import { Strikethrough } from "@/components/ui/Strikethrough";
import { products, productBySlug } from "@/lib/catalog";
import { ProductHeroCanvas } from "./ProductHeroCanvas";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return { title: "Not in this lot" };
  return {
    title: `${p.name} · ${p.loafNumber}`,
    description: p.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const isCrystal = product.category === "pku";
  const accent = isCrystal ? "text-stamp" : "text-saffron";
  const accentBg = isCrystal ? "bg-stamp" : "bg-saffron";

  return (
    <>
      <Nav />

      <main id="main" className="bg-paper">
        <SpecimenHeader
          fields={[
            { label: "Unit", value: product.loafNumber },
            { label: "Weight", value: product.weight },
            { label: "Free From", value: product.freeFrom.join(" · ") },
            { label: "Lot", value: product.lot },
            { label: "ISO", value: product.iso },
          ]}
        />

        {/* Hero: 3D product on the left, copy on the right */}
        <section className="border-b border-ink/15">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-12 gap-y-8 px-6 py-16 sm:px-12 lg:grid-cols-12 lg:px-24 lg:py-24">
            <div className="lg:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-paper">
                <ProductHeroCanvas product={product} />
              </div>
              <p className="specimen-lot mt-4 text-ink/55">
                AXIS ON · CURSOR-NUDGEABLE · CATEGORY {product.category.toUpperCase()}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className={`specimen-lot ${accent}`}>
                {product.loafNumber.toUpperCase()} · {isCrystal ? "CRYSTAL · PKU" : "EPICS"}
              </p>
              <SplitText
                as="h1"
                text={product.name}
                mode="word"
                className="mt-3 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.025em]"
              />
              <p className="font-display mt-4 text-[18px] italic text-ink/65" lang="ar" dir="rtl">
                {product.arabicName}
              </p>
              <p className="mt-8 text-[16px] leading-[1.6] text-ink/80">
                {product.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <span className="font-display text-[44px] leading-none tracking-[-0.02em]">
                  {product.priceEgp ?? "—"}
                  <span className="specimen-lot ml-2 align-baseline text-ink/55">
                    EGP / {product.weight}
                  </span>
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    className={`specimen-spec inline-flex items-center gap-2 border border-ink ${accentBg} px-7 py-4 text-paper transition-colors hover:bg-ink`}
                    aria-label="Add to cart"
                  >
                    ADD TO CART <span aria-hidden>→</span>
                  </button>
                </Magnetic>
                <Link
                  href="/shop"
                  className="specimen-spec underline decoration-[1px] underline-offset-[6px] hover:decoration-2"
                >
                  BACK TO THE SHOP
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-3">
                {product.freeFrom.map((code) => {
                  const variant =
                    code === "S-01" ? "wheat" : code === "S-02" ? "sugar" : "protein";
                  return (
                    <div key={code} className="text-ink/85">
                      <Strikethrough variant={variant} size={40} label />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients + Nutrition */}
        <Reveal as="section" className="border-b border-ink/15">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-12 gap-y-12 px-6 py-20 sm:px-12 lg:grid-cols-12 lg:px-24">
            <div className="lg:col-span-6">
              <p className="specimen-lot mb-3 text-ink/55">SPEC · INGREDIENTS</p>
              <ul className="space-y-2 font-mono text-[13px] leading-[1.6] text-ink/85">
                {product.ingredients.map((line) => (
                  <li key={line} className="border-b border-ink/10 pb-2">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <p className="specimen-lot mb-3 text-ink/55">SPEC · NUTRITION · PER 100G</p>
              <dl className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 font-mono text-[13px] leading-[1.5] text-ink/85">
                {Object.entries(product.nutrition.per100g).map(([k, v]) => (
                  <DeflineEntry key={k} term={k} value={v} />
                ))}
              </dl>
              {product.servingsHint && (
                <p className="specimen-lot mt-6 text-ink/60">
                  {product.servingsHint.toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Footnote / related */}
        <Reveal as="section">
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-24">
            <p className="specimen-lot text-ink/55">F-{product.loafNumber} · FOOTNOTE</p>
            <p className="mt-4 max-w-2xl font-display text-[26px] italic leading-[1.3] tracking-[-0.01em]">
              {isCrystal
                ? "Phenylalanine values on analytical file — request per-lot certificate from crystal@epics-group.com."
                : "Every loaf carries a lot number. The number is the warranty. If your loaf doesn't turn out as expected, photograph the crumb and send it to us with the lot number."}
            </p>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}

function DeflineEntry({ term, value }: { term: string; value: string }) {
  return (
    <>
      <dt className="border-b border-ink/10 pb-2 text-ink/65">{term}</dt>
      <dd className="border-b border-ink/10 pb-2 text-right">{value}</dd>
    </>
  );
}
