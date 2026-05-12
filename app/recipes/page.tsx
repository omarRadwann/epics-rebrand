import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { RecipesGrid } from "./_RecipesGrid";
import { recipes } from "@/lib/recipes";

export const metadata = {
  title: "The Method Book · 24 published recipes · Epics",
  description: "Twenty-four method-book recipes built on the Epics catalogue — pizza, qatayef, brownies, low-protein PKU bread, sugar-free ice cream. Real timings. Real measures.",
};

export default function RecipesIndex() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">M · METHOD BOOK</p>
            <h1 className="font-serif-display text-[72px] sm:text-[96px] leading-[0.95] tracking-[-0.03em] mt-3">
              The
              <br />
              <span className="italic">Method Book.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col justify-between">
            <p className="font-serif-display italic text-[26px] leading-[1.3] tracking-[-0.005em] max-w-[640px]">
              Twenty-four recipes built on the Epics catalogue. Real timings,
              real measures — pizza you can throw, kahk for Eid, low-protein
              flatbread measured in milligrams.
            </p>
            <dl className="mt-10 grid grid-cols-4 gap-x-6 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <Stat code="01" label="Methods" value={`${recipes.length}`} />
              <Stat code="02" label="Gluten-Free" value={`${recipes.filter(r => r.shelf === "gluten-free").length}`} />
              <Stat code="03" label="Sugar-Free" value={`${recipes.filter(r => r.shelf === "sugar-free").length}`} />
              <Stat code="04" label="Crystal · PKU" value={`${recipes.filter(r => r.shelf === "pku").length}`} highlight />
            </dl>
          </div>
        </div>
      </section>

      <RecipesGrid />
      <Footer />
    </main>
  );
}

function Stat({ code, label, value, highlight }: { code: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="specimen-lot opacity-60">{code} · {label.toUpperCase()}</dt>
      <dd
        className={`font-serif-display text-[28px] leading-[1.05] tracking-[-0.005em] tabular-nums ${
          highlight ? "text-[rgb(var(--pomegranate))]" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
