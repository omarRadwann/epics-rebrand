import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { ShopGrid } from "./_ShopGrid";
import { products } from "@/lib/catalog";

export const metadata = {
  title: "The Pantry · Epics",
  description: "Every specimen, all shelves. Filterable by gluten-free, sugar-free, or Crystal · PKU.",
};

export default function ShopPage() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-16 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">SHOP · ALL SHELVES</p>
            <h1 className="font-serif-display text-[72px] leading-[1.02] tracking-[-0.025em] mt-3">
              The Pantry.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col justify-between">
            <p className="font-serif-display italic text-[24px] leading-[1.3] max-w-[640px]">
              Every specimen we make, on one shelf. Filter by the strikethrough that matters to your body.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-x-6 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <Stat code="01" label="Specimens" value={`${products.length}`} />
              <Stat code="02" label="Certification" value="ISO 22000" />
              <Stat code="03" label="Origin" value="6 October" />
            </dl>
          </div>
        </div>
      </section>

      <ShopGrid />

      <Footer />
    </main>
  );
}

function Stat({ code, label, value }: { code: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="specimen-lot opacity-60">{code} · {label.toUpperCase()}</dt>
      <dd className="font-serif-display text-[24px] leading-[1.1] tracking-[-0.005em]">{value}</dd>
    </div>
  );
}
