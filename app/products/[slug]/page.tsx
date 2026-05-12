import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { ProductCard } from "../../_components/ProductCard";
import { Strikethrough } from "../../_components/Strikethrough";
import { SpecimenHeader } from "../../_components/SpecimenHeader";
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
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
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
          {/* Photography column — typographic plinth */}
          <div className="col-span-12 lg:col-span-6">
            <div
              className={`aspect-[4/5] flex flex-col justify-between p-12 ${
                isCrystal ? "bg-[rgb(var(--pomegranate)/0.10)]" : "bg-[rgb(var(--linen-mid)/0.5)]"
              }`}
            >
              <div className="flex items-start justify-between">
                <p className="specimen-lot">LOT {p.lot}</p>
                <div className="flex gap-2">
                  {p.freeFrom.includes("S-01") && <Strikethrough variant="wheat" size={40} />}
                  {p.freeFrom.includes("S-02") && <Strikethrough variant="sugar" size={40} />}
                  {p.freeFrom.includes("S-03") && <Strikethrough variant="protein" size={40} />}
                </div>
              </div>
              <div className="flex flex-col items-center text-center text-[rgb(var(--ink-black))]">
                <p className={`specimen-spec mb-3 ${isCrystal ? "text-[rgb(var(--pomegranate))]" : "opacity-60"}`}>
                  {isCrystal ? "CRYSTAL BY EPICS" : "EPICS"}
                </p>
                <h2
                  className="font-serif-display text-[56px] leading-[58px] tracking-[-0.02em]"
                  style={isCrystal ? { color: "rgb(var(--pomegranate))" } : undefined}
                >
                  {p.name}
                </h2>
                <p className="specimen-spec mt-3 opacity-70">{p.weight.toUpperCase()}</p>
              </div>
              <p className="specimen-lot opacity-60">ISO {p.iso}:2018 · BUREAU VERITAS</p>
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
                <p className="specimen-lot opacity-60">PRICE</p>
                <p className="font-serif-display text-[40px] leading-none tracking-[-0.01em]">
                  {p.priceEgp} <span className="specimen-spec ml-1 opacity-70">EGP</span>
                </p>
              </div>
              <button
                className="ml-auto bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] px-8 py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors"
                aria-label={`Add ${p.name} to cart`}
              >
                ADD TO CART →
              </button>
            </div>

            <p className="specimen-lot mt-6 opacity-60">
              Ships within 24 hours of order, anywhere in Egypt. Cash on delivery available.
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

