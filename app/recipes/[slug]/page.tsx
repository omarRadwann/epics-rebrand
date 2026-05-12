import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { recipes, productBySlug } from "@/lib/catalog";

const detail: Record<string, {
  ingredients: { qty: string; item: string; note?: string }[];
  method: { code: string; title: string; body: string; time?: string }[];
  why: string;
  byline: string;
  date: string;
}> = {
  "european-loaf": {
    ingredients: [
      { qty: "500 g", item: "Epics European Baking Mix", note: "Loaf 03 · Lot 22-1138" },
      { qty: "7 g",   item: "Active dry yeast", note: "Enclosed sachet" },
      { qty: "380 ml", item: "Warm water", note: "38°C — wrist-warm, not hot" },
      { qty: "15 ml", item: "Olive oil", note: "Optional · for a softer crust" },
      { qty: "8 g",   item: "Sea salt", note: "Maldon if you have it" },
    ],
    method: [
      { code: "01", title: "Bloom the yeast", time: "10 min",
        body: "Dissolve yeast in 80 ml of the warm water with a pinch of the cane fibre from the mix. Wait for the surface to texture — small, even bubbles, not a dramatic head. If nothing happens in 10 minutes, the yeast is dead. Start over." },
      { code: "02", title: "Combine", time: "5 min",
        body: "Tip the rest of the mix into a wide bowl. Make a well. Pour in the bloomed yeast, the remaining 300 ml of water, the oil, and the salt — salt last so it doesn't kill the yeast. Mix with a wooden spoon until it forms a slack, slightly tacky dough." },
      { code: "03", title: "Knead", time: "8 min",
        body: "On a lightly floured surface, knead with the heel of your hand for 6–8 minutes. Gluten-free doughs don't develop the same way wheat does — you're aiming for elastic, not stretchy. Stop when the dough holds its shape when you poke it." },
      { code: "04", title: "First prove", time: "45 min",
        body: "Cover with a damp cloth. Leave somewhere warm — 26°C is ideal. The dough won't double the way wheat dough does. It will rise about 50%. That's correct." },
      { code: "05", title: "Shape & score", time: "5 min",
        body: "Shape into a tight oval. Place on a sheet of baking paper. Score the top with a sharp blade in three diagonal lines, about 5 mm deep." },
      { code: "06", title: "Second prove", time: "20 min",
        body: "Cover again. Pre-heat the oven to 220°C with a baking stone or heavy tray inside." },
      { code: "07", title: "Bake", time: "35 min",
        body: "Slide the loaf (paper and all) onto the hot stone. Drop the oven to 200°C. Bake for 30–35 minutes. The crust will sound hollow when you tap the base — that's the test, not a probe." },
      { code: "08", title: "Cool — completely", time: "60 min",
        body: "Resist. Cooling sets the crumb structure. Cut into a warm gluten-free loaf and you'll get gum. Wait 60 minutes. Then cut, then eat, then send us a photograph." },
    ],
    why:
      "Most gluten-free bread fails for the same reason: not enough hydration, not enough proof time, too eager a cut. This recipe was iterated through 14 versions in our 6th of October kitchen over a 2024 spring. The published version is the one we eat at home.",
    byline: "TESTED BY THE EPICS METHOD BOOK · DEVELOPMENT BATCH 22-1138",
    date: "FIRST PUBLISHED 12 OCT 2026",
  },
  "fudgy-brownies": {
    ingredients: [
      { qty: "400 g", item: "Epics Brownies Mix", note: "Bake 07 · Lot 22-1320" },
      { qty: "120 g", item: "Butter, melted", note: "Salted is fine" },
      { qty: "2",     item: "Eggs, room temperature" },
      { qty: "60 ml", item: "Water" },
      { qty: "1 tsp", item: "Vanilla extract" },
    ],
    method: [
      { code: "01", title: "Heat the oven", time: "10 min", body: "180°C, fan. Line a 22×22 cm tin with parchment, leaving an overhang." },
      { code: "02", title: "Combine wet", time: "3 min", body: "Whisk eggs, melted butter, water, vanilla in a bowl until uniformly glossy." },
      { code: "03", title: "Fold in dry", time: "2 min", body: "Add the brownies mix in one go. Fold with a spatula until just combined. Don't over-mix; you want streaks." },
      { code: "04", title: "Bake", time: "22 min", body: "Pour into tin, level. Bake 22 minutes. A skewer should come out with moist crumb attached. Not clean." },
      { code: "05", title: "Wait", time: "10 min", body: "Out of the oven, leave in tin for 10 minutes. Lift out by the parchment. Cool another 10 minutes before cutting. We are serious about this." },
    ],
    why: "The standard mistake is over-baking by 4 minutes — turning fudgy into cakey. The skewer test is wrong for brownies; trust the time. 22 minutes, that's it.",
    byline: "TESTED BY THE EPICS METHOD BOOK · DEVELOPMENT BATCH 22-1320",
    date: "FIRST PUBLISHED 28 SEP 2026",
  },
  "crystal-pku-flatbread": {
    ingredients: [
      { qty: "500 g", item: "Crystal Low-Protein Flat Bread Mix", note: "PKU 21 · Lot 22-PKU-0042" },
      { qty: "350 ml", item: "Warm water" },
      { qty: "7 g",   item: "Active dry yeast", note: "Enclosed sachet" },
      { qty: "1 tsp", item: "Olive oil" },
    ],
    method: [
      { code: "01", title: "Bloom", time: "10 min", body: "Bloom yeast in 80 ml warm water." },
      { code: "02", title: "Combine", time: "5 min", body: "Add bloomed yeast, remaining water, oil to mix. Knead 5 minutes until smooth." },
      { code: "03", title: "Rest", time: "30 min", body: "Cover. Rest 30 minutes — low-protein doughs need shorter proves." },
      { code: "04", title: "Divide", time: "5 min", body: "Divide into 6 balls. Roll each to a 4 mm round." },
      { code: "05", title: "Cook", time: "12 min", body: "On a dry skillet over medium-high heat, cook each flatbread 60-90 seconds per side until it puffs and develops dark spots." },
    ],
    why:
      "We publish the phenylalanine value per flatbread, not per 100g. Why: a family managing PKU rations by piece, not by weight. Per flatbread: ~1.2mg PHE.",
    byline: "DEVELOPED WITH CONSULTATION FROM CAIRO UNIVERSITY HOSPITAL · METABOLIC UNIT",
    date: "FIRST PUBLISHED 14 SEP 2026",
  },
};

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = recipes.find((x) => x.slug === params.slug);
  if (!r) return { title: "Not found · Epics" };
  return { title: `${r.title} · ${r.code} · Epics`, description: r.summary };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const r = recipes.find((x) => x.slug === params.slug);
  if (!r) return notFound();
  const d = detail[params.slug]; // may be undefined — render gracefully without
  const product = productBySlug(r.productSlug)!;
  const isPku = product.category === "pku";

  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Editorial hero — magazine spread, not a blog post */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-12 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <p className="specimen-lot opacity-60">{r.code} · METHOD</p>
            {d && <p className="specimen-spec opacity-60">{d.date}</p>}
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-serif-display text-[80px] sm:text-[112px] leading-[0.95] tracking-[-0.03em]">
              {r.title.split(" ").map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "italic" : ""}>
                  {word}{i < arr.length - 1 ? " " : "."}
                </span>
              ))}
            </h1>
            <p className="font-serif-display italic text-[26px] leading-[1.3] tracking-[-0.005em] mt-10 max-w-[680px]">
              {r.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
          <RecipeStat code="01" label="Time" value={r.time} />
          <RecipeStat code="02" label="Yield" value={r.yield} />
          <RecipeStat code="03" label="From" value={product.loafNumber} />
          <RecipeStat code="04" label="Difficulty" value="Intermediate" />
        </div>
      </section>

      {/* Why — pull quote (only when long-form detail exists) */}
      {d && (
        <section className={`${isPku ? "bg-[rgb(var(--pomegranate)/0.08)]" : "bg-[rgb(var(--linen-mid)/0.35)]"} border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]`}>
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
            <p className="specimen-lot opacity-60 mb-4">W-01 · WHY</p>
            <blockquote className="font-serif-display italic text-[36px] sm:text-[44px] leading-[1.2] tracking-[-0.01em] max-w-[1000px]">
              {d.why}
            </blockquote>
            <p className="specimen-lot mt-6 opacity-60">{d.byline}</p>
          </div>
        </section>
      )}

      {/* Ingredients + Method (only when long-form detail exists) */}
      {d ? (
        <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20 grid grid-cols-12 gap-x-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 self-start">
              <p className="specimen-lot opacity-60 mb-2">I · INGREDIENTS</p>
              <h2 className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em]">What you need.</h2>
              <ol className="mt-8 list-none p-0 space-y-0 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px]">
                {d.ingredients.map((ing, i) => (
                  <li key={i} className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline py-4 border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px]">
                    <span className="specimen-spec font-medium">{ing.qty}</span>
                    <div>
                      <p className="font-sans-text text-[15px]">{ing.item}</p>
                      {ing.note && <p className="specimen-lot opacity-60 mt-1">{ing.note}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <p className="specimen-lot opacity-60 mb-2">M · METHOD</p>
              <h2 className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em]">What you do.</h2>
              <ol className="mt-10 list-none p-0 space-y-12">
                {d.method.map((step) => (
                  <li key={step.code} className="grid grid-cols-[60px_1fr] gap-x-6">
                    <span className="font-serif-display text-[48px] leading-none italic text-[rgb(var(--saffron))]">{step.code}</span>
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-serif-display text-[24px] leading-[1.1] tracking-[-0.005em]">{step.title}</h3>
                        {step.time && <span className="specimen-lot opacity-60">{step.time.toUpperCase()}</span>}
                      </div>
                      <p className="font-sans-text text-[16px] leading-[1.6] mt-3 text-[rgb(var(--charcoal-sub))]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : (
        /* Cross-link card for recipes whose full method is on the Epics archive */
        <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20 grid grid-cols-12 gap-x-12 gap-y-12">
            <div className="col-span-12 md:col-span-5">
              <p className="specimen-lot opacity-60 mb-2">B-01 · BUILT ON</p>
              <h2 className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em]">
                Built on {product.name}.
              </h2>
              <p className="font-sans-text text-[16px] leading-[1.6] mt-6 max-w-[460px] text-[rgb(var(--charcoal-sub))]">
                {product.description}
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="inline-block mt-8 specimen-spec underline underline-offset-[6px] decoration-[0.5px]"
              >
                {product.loafNumber.toUpperCase()} · {product.weight.toUpperCase()} · {product.priceEgp ?? "—"} EGP →
              </Link>
            </div>
            <div className="col-span-12 md:col-span-7 bg-[rgb(var(--linen-mid)/0.35)] p-8">
              <p className="specimen-lot opacity-60">M · METHOD</p>
              <h3 className="font-serif-display text-[26px] leading-[1.2] tracking-[-0.005em] mt-3">
                The full method is in our printed method book and on the legacy archive.
              </h3>
              <p className="font-sans-text text-[15px] leading-[1.6] mt-4 text-[rgb(var(--charcoal-sub))]">
                We&rsquo;re moving every recipe over to this site as part of the rebrand — until then, the original
                step-by-step lives on the legacy site.
              </p>
              <a
                href={`https://epics-group.com/recipes/${params.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 specimen-spec underline underline-offset-[6px] decoration-[0.5px]"
              >
                READ ON THE LEGACY ARCHIVE →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footnote */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
          <p className="specimen-lot opacity-60">F · FOOTNOTE</p>
          <p className="font-serif-display italic text-[22px] leading-[1.3] mt-2 max-w-[860px]">
            If your loaf doesn&rsquo;t turn out the way you expected, photograph the crumb, send it to{" "}
            <a href="mailto:info@epics-group.com" className="underline decoration-[0.5px]">info@epics-group.com</a>,
            and we&rsquo;ll tell you what went wrong. That&rsquo;s how the method book gets better.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function RecipeStat({ code, label, value }: { code: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-3">
      <span className="specimen-lot opacity-60">{code} · {label.toUpperCase()}</span>
      <span className="font-serif-display text-[22px] leading-[1.15] tracking-[-0.005em]">{value}</span>
    </div>
  );
}
