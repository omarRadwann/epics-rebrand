import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { ProductCard } from "../_components/ProductCard";
import { Strikethrough } from "../_components/Strikethrough";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "Crystal by Epics — PKU · Low-protein food, measured in milligrams",
  description: "Crystal by Epics is the endorsed PKU sub-brand: low-protein, phenylalanine-measured food for families managing phenylketonuria. Made in 6th of October City, certified ISO 22000.",
};

/**
 * The trust-builder. Pomegranate accent (gravity color) takes over from saffron.
 * Designed with the gravity of a hospital pamphlet redesigned by a magazine art director.
 *
 * Voice: precise, plain, never cute. Never "your little PKU warrior." Numbers up front.
 */
export default function PkuPage() {
  const pkuProducts = productsByCategory("pku");

  return (
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Lockup hero — Crystal-by-Epics as an endorsed sub-brand */}
      <section className="bg-[rgb(var(--pomegranate)/0.08)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-24 grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <p className="specimen-lot text-[rgb(var(--pomegranate))]">PKU-01 · ENDORSED SUB-BRAND</p>
            <div className="mt-3 flex items-baseline gap-4 flex-wrap">
              <span className="specimen-spec opacity-60">EPICS</span>
              <span className="specimen-spec opacity-40">·</span>
              <span className="font-serif-display text-[44px] leading-none italic text-[rgb(var(--pomegranate))]">
                Crystal
              </span>
              <span className="specimen-spec opacity-40">·</span>
              <span className="specimen-spec text-[rgb(var(--pomegranate))]">PKU</span>
            </div>
            <h1 className="font-serif-display text-[64px] sm:text-[88px] leading-[0.98] tracking-[-0.025em] mt-10">
              Low-protein
              <br />
              food, measured
              <br />
              <span className="italic" style={{ color: "rgb(var(--pomegranate))" }}>in milligrams.</span>
            </h1>
            <p className="font-serif-display italic text-[22px] leading-[1.3] mt-10 max-w-[600px]">
              For families managing phenylketonuria. Phenylalanine published per piece, not per 100&thinsp;g, because
              that is how rationing works in practice.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col items-center justify-center">
            <div className="text-[rgb(var(--pomegranate))]">
              <Strikethrough variant="protein" size={200} />
            </div>
            <p className="specimen-lot mt-6 text-[rgb(var(--pomegranate))]">S-03 · PROTEIN · STRUCK</p>
          </div>
        </div>
      </section>

      {/* What is PKU — plain language explainer */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-3">
              <p className="specimen-lot opacity-60">PKU-02 · DEFINITION</p>
              <h2 className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em] mt-2">
                What is PKU?
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9 space-y-6 font-sans-text text-[17px] leading-[1.6] text-[rgb(var(--ink-black))] max-w-[720px]">
              <p>
                Phenylketonuria — usually written PKU — is a rare inherited metabolic disorder. People born with it
                cannot process <em>phenylalanine</em>, an amino acid present in almost all protein. The body
                accumulates phenylalanine to toxic levels, and untreated, this causes irreversible brain damage.
              </p>
              <p>
                It affects roughly 1 in 10,000 newborns in Egypt. Most are identified at the newborn heel-prick screen.
                <em> Treatment is dietary, lifelong, and unforgiving.</em>
              </p>
              <p>
                A person with PKU follows a strict low-protein diet from birth, typically supplemented with a medical
                amino-acid formula that supplies the proteins they cannot get from food. The diet is calculated in
                milligrams of phenylalanine, rationed across the day.
              </p>
              <p className="font-serif-display italic text-[20px] leading-[1.4] pl-6 border-l border-[rgb(var(--pomegranate))]">
                One slice of ordinary bread contains roughly 200&thinsp;mg of phenylalanine. A child with PKU may have
                a daily allowance of 200–400&thinsp;mg, total. So an ordinary slice of bread is, mathematically, a
                whole day&rsquo;s ration. This is why our flatbread comes in at 1.2&thinsp;mg per piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Crystal does */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot opacity-60">PKU-03 · OUR ROLE</p>
            <h2 className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em] mt-2">
              What we do.
            </h2>
          </div>
          <ol className="col-span-12 md:col-span-9 list-none p-0 space-y-12">
            <DoEntry
              code="01"
              title="Engineer low-protein food that tastes like food."
              body="Bread, pasta, cookies, flatbreads. Developed against published PHE targets, not against marketing copy. Eighteen months of consultation with the Cairo University Hospital metabolic unit before the first SKU shipped."
            />
            <DoEntry
              code="02"
              title="Publish phenylalanine per piece."
              body="The standard convention is mg of PHE per 100g. That is useful for chemists. For a parent rationing a packed school lunch, mg-per-piece is the operative unit. We publish both."
            />
            <DoEntry
              code="03"
              title="Run a dedicated PKU production line."
              body="The Crystal line is a separate production lane inside our 6th of October factory. Equipment is dedicated, not shared. Between batches we run a phenylalanine-targeted cleanout protocol. Our ISO 22000 audit specifically covers this lane."
            />
            <DoEntry
              code="04"
              title="Print the lot number on every package."
              body="Every Crystal package carries a lot number traceable back to its mill batch, its production date, and the staff member who signed off. If a lot is questioned, we recall by lot, not by SKU."
            />
          </ol>
        </div>
      </section>

      {/* Product range */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <p className="specimen-lot opacity-60 mb-2">PKU-04 · THE RANGE</p>
          <h2 className="font-serif-display text-[48px] leading-[1.05] tracking-[-0.015em]">
            The Crystal range.
          </h2>
          <p className="font-sans-text text-[17px] leading-[1.55] mt-4 max-w-[640px] text-[rgb(var(--charcoal-sub))]">
            Two specimens live now. Four more in development. Listed in order of PHE per gram, ascending.
          </p>
          <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {pkuProducts.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} variant="grid" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* For clinicians — pull quote */}
      <section className="bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot text-[rgb(var(--cream-paper)/0.6)]">PKU-05 · FOR CLINICIANS</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-serif-display text-[44px] leading-[1.1] tracking-[-0.015em]">
              If you are a metabolic dietitian working in Egypt and you would like product samples, certificates of
              analysis, or our PHE-per-lot history — write to us.
            </h2>
            <a
              href="mailto:crystal@epics-group.com"
              className="inline-block mt-10 specimen-spec underline underline-offset-[6px] decoration-[0.5px]"
            >
              CRYSTAL@EPICS-GROUP.COM →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DoEntry({ code, title, body }: { code: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[60px_1fr] gap-x-6">
      <span className="font-serif-display text-[40px] leading-none italic text-[rgb(var(--pomegranate))]">
        {code}
      </span>
      <div>
        <h3 className="font-serif-display text-[24px] leading-[1.15] tracking-[-0.005em]">{title}</h3>
        <p className="font-sans-text text-[16px] leading-[1.6] mt-3 text-[rgb(var(--charcoal-sub))]">{body}</p>
      </div>
    </li>
  );
}
