import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { ProductCard } from "../_components/ProductCard";
import { Strikethrough } from "../_components/Strikethrough";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "Sugar-Free · Epics",
  description: "Cake mix, whipping cream, ice cream. For diabetic households who still want birthdays.",
};

export default function SugarFreePage() {
  const items = productsByCategory("sugar-free");

  return (
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <nav aria-label="Breadcrumb">
              <p className="specimen-lot opacity-60">
                <Link href="/" className="hover:underline">SHOP</Link> /{" "}
                <span className="text-[rgb(var(--ink-black))]">SUGAR-FREE</span>
              </p>
            </nav>
            <h1 className="font-serif-display text-[72px] leading-[1.02] tracking-[-0.025em] mt-6">
              Sugar-Free.
            </h1>
            <div className="mt-6">
              <Strikethrough variant="sugar" size={80} label />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col justify-between">
            <p className="font-serif-display italic text-[28px] leading-[1.25] tracking-[-0.005em] max-w-[640px]">
              For diabetic households who still want birthdays. Stevia-sweetened cream that holds peaks. Vanilla
              cake that tastes like vanilla, not like a substitute.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <FilterStat code="01" label="Specimens" value={`${items.length}`} />
              <FilterStat code="02" label="Certification" value="ISO 22000" />
              <FilterStat code="03" label="Origin" value="6 October" />
            </dl>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16">
          <p className="specimen-lot mb-6">LOT GROUP · 22-16 / 22-17</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
            {items.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} variant="hero" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterStat({ code, label, value }: { code: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="specimen-lot opacity-60">{code} · {label.toUpperCase()}</dt>
      <dd className="font-serif-display text-[24px] leading-[1.1] tracking-[-0.005em]">{value}</dd>
    </div>
  );
}
