import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { ProductCard } from "../../_components/ProductCard";
import { Strikethrough } from "../../_components/Strikethrough";
import { SpecimenHeader } from "../../_components/SpecimenHeader";
import { AddToCartButton } from "../../_components/AddToCartButton";
import { asset } from "@/lib/asset";
import { products, productBySlug, productsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  if (!p) return { title: "Not found · Epics" };
  return {
    title: `${p.name} · ${p.loafNumber} · Epics`,
    description: p.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  if (!p) return notFound();
  const isCrystal = p.subBrand === "crystal";
  const related = productsByCategory(p.category).filter((q) => q.slug !== p.slug).slice(0, 4);

  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Specimen header — typographic banner */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-4">
          <nav aria-label="Breadcrumb" className="mb-2">
            <p className="specimen-lot opacity-60">
              <Link href="/" className="hover:underline">SHOP</Link> /{" "}
              <Link href={`/${p.category}`} className="hover:underline">{p.category.toUpperCase()}</Link>{" "}
              / <span className="text-[rgb(var(--ink-black))]">{p.loafNumber.toUpperCase()}</span>
            </p>
          </nav>
          <SpecimenHeader
            fields={[
              { label: "UNIT", value: p.loafNumber },
              { label: "NAME", value: p.name },
              { label: "WEIGHT", value: p.weight },
              { label: "FREE FROM", value: p.freeFrom.join(" + ") },
              { label: "LOT", value: p.lot },
              { label: "ISO", value: p.iso },
            ]}
          />
        </div>
      </section>

      {/* Product hero — 2 columns */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16 grid grid-cols-12 gap-x-12 gap-y-10">
          {/* Product photography column — clean white card, no blend */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white aspect-[4/5] flex flex-col relative overflow-hidden shadow-[0_2px_0_rgba(26,24,23,0.1)]">
              {isCrystal && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[rgb(var(--pomegranate))]" aria-hidden />
              )}
              <div className="flex items-start justify-between p-6 relative z-10">
                <div>
                  <p className="specimen-lot opacity-70">LOT {p.lot}</p>
                  {isCrystal && (
                    <p className="specimen-lot mt-0.5 text-[rgb(var(--pomegranate))]">CRYSTAL · BY EPICS</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {p.freeFrom.includes("S-01") && <Strikethrough variant="wheat" size={36} />}
                  {p.freeFrom.includes("S-02") && <Strikethrough variant="sugar" size={36} />}
                  {p.freeFrom.includes("S-03") && <Strikethrough variant="protein" size={36} />}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-10 pb-16">
                <Image
                  src={asset(p.imageUrl)}
                  alt={p.name}
                  width={900}
                  height={1100}
                  unoptimized
                  priority
                  className="object-contain max-w-[82%] max-h-[88%]"
                />
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between">
                <p className="specimen-lot opacity-50">ISO {p.iso}:2018 · BUREAU VERITAS</p>
                <p className="specimen-lot opacity-50">{p.weight.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Buying column */}
          <div className="col-span-12 lg:col-span-6 flex flex-col">
            {isCrystal && (
              <p className="specimen-spec text-[rgb(var(--pomegranate))] mb-4">CRYSTAL BY EPICS · PKU</p>
            )}
            <h1 className="font-serif-display text-[64px] leading-[1.05] tracking-[-0.02em] text-[rgb(var(--ink-black))]">
              {p.name}
            </h1>
            <p className="specimen-lot mt-4 opacity-60">{p.loafNumber.toUpperCase()} · LOT {p.lot}</p>
            <p className="font-sans-text text-[17px] leading-[1.55] mt-8 text-[rgb(var(--charcoal-sub))]">
              {p.description}
            </p>
            {p.servingsHint && (
              <p className="specimen-spec mt-6 text-[rgb(var(--ink-black))]">{p.servingsHint.toUpperCase()}</p>
            )}

            <div className="mt-10 flex items-end gap-6 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <div>
                <p className="specimen-lot opacity-60">{p.isWholesale ? "WHOLESALE" : "PRICE"}</p>
                {p.priceEgp != null ? (
                  <p className="font-serif-display text-[40px] leading-none tracking-[-0.01em]">
                    {p.priceEgp} <span className="specimen-spec ml-1 opacity-70">EGP</span>
                  </p>
                ) : (
                  <p className="font-serif-display text-[28px] leading-tight tracking-[-0.01em]">
                    Contact sales
                  </p>
                )}
              </div>
              {p.isWholesale ? (
                <a
                  href="mailto:sales@epics-group.com?subject=Wholesale enquiry — Epics"
                  className="ml-auto bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] px-8 py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors no-underline"
                >
                  EMAIL SALES →
                </a>
              ) : (
                <AddToCartButton slug={p.slug} />
              )}
            </div>

            <p className="specimen-lot mt-6 opacity-60">
              {p.isWholesale
                ? "20kg sacks for bakeries, hotel kitchens, and specialist pâtisserie. Delivery to Cairo, Alexandria, Hurghada on request."
                : "Ships within 24 hours of order, anywhere in Egypt. Cash on delivery available."}
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients + nutrition — designed tables, not bullets */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20 grid grid-cols-12 gap-x-12 gap-y-12">
          {/* Ingredients */}
          <div className="col-span-12 md:col-span-7">
            <p className="specimen-lot opacity-60">I-01 · INGREDIENT MANIFEST</p>
            <h2 className="font-serif-display text-[40px] leading-[1.1] tracking-[-0.015em] mt-2">
              What&rsquo;s inside.
            </h2>
            <ol className="mt-8 list-none p-0 space-y-3 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-4">
              {p.ingredients.map((ing, i) => (
                <li key={i} className="grid grid-cols-[40px_1fr] gap-x-4 items-baseline border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px] pb-3">
                  <span className="specimen-lot opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-sans-text text-[15px]">{ing}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Nutrition specimen */}
          <div className="col-span-12 md:col-span-5">
            <p className="specimen-lot opacity-60">N-01 · NUTRITION SPECIMEN · PER 100G</p>
            <h2 className="font-serif-display text-[40px] leading-[1.1] tracking-[-0.015em] mt-2">
              The numbers.
            </h2>
            <dl className="mt-8 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-4">
              {Object.entries(p.nutrition.per100g).map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline py-3 border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px]"
                >
                  <dt className="specimen-spec opacity-70">{k.toUpperCase()}</dt>
                  <dd className="specimen-spec">{v}</dd>
                </div>
              ))}
            </dl>
            {isCrystal && (
              <p className="specimen-lot mt-6 text-[rgb(var(--pomegranate))]">
                PHE VALUES ARE WORST-CASE PER LOT · MEASURED IN MILLIGRAMS
              </p>
            )}
          </div>
        </div>
      </section>

      {/* What to bake — cross-link recipe */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
          <p className="specimen-lot opacity-60 mb-2">R-01 · METHOD</p>
          <h2 className="font-serif-display text-[40px] leading-[1.1] tracking-[-0.015em]">
            What to bake with it.
          </h2>
          <Link
            href="/recipes/european-loaf"
            className="inline-block mt-8 specimen-spec underline underline-offset-[6px] decoration-[0.5px]"
          >
            THE EUROPEAN LOAF · 1H 50M · YIELDS ONE 800G LOAF →
          </Link>
        </div>
      </section>

      {/* Related */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
          <p className="specimen-lot opacity-60 mb-2">RELATED · SAME SHELF</p>
          <h2 className="font-serif-display text-[32px] leading-[1.1] tracking-[-0.01em] mb-8">
            On the same shelf.
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 list-none p-0">
            {related.map((q) => (
              <li key={q.slug}>
                <ProductCard product={q} variant="grid" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

