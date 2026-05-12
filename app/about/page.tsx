import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { Strikethrough } from "../_components/Strikethrough";

export const metadata = {
  title: "About · The pantry of people who read the label · Epics",
  description: "Epics Group is an Egyptian manufacturer of gluten-free, sugar-free, and PKU-safe foods, headquartered in 6th of October City and certified to ISO 22000 and ISO 9001.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Manifesto reprise */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot opacity-60">A · ABOUT EPICS</p>
            <p className="specimen-lot opacity-60 mt-2">MMXXVI · ISSUE 01</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-serif-display text-[80px] sm:text-[120px] leading-[0.95] tracking-[-0.03em]">
              We don&rsquo;t
              <br />
              romanticise
              <br />
              <span className="italic">our limits.</span>
            </h1>
            <p className="font-serif-display italic text-[26px] leading-[1.3] mt-10 max-w-[720px]">
              Epics is the pantry of people who read the label. We were founded in 6th of October City to make food
              that families managing celiac disease, diabetes, and phenylketonuria can feed each other without
              footnotes, asterisks, or apology.
            </p>
          </div>
        </div>
      </section>

      {/* Founding story — numbered, not bulleted */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <p className="specimen-lot opacity-60 mb-2">S · STORY</p>
          <h2 className="font-serif-display text-[48px] leading-[1.05] tracking-[-0.015em] max-w-[800px]">
            How we got here, in five movements.
          </h2>

          <ol className="mt-16 list-none p-0 grid grid-cols-12 gap-x-8 gap-y-16">
            <StoryEntry
              code="I"
              year="2018"
              title="The first loaf."
              body="A celiac diagnosis in the founder's family. Egyptian gluten-free bread at the time was either imported and unaffordable or domestic and inedible. The first European-style loaf was baked in a rented kitchen behind the Lebanon Square mosque."
            />
            <StoryEntry
              code="II"
              year="2020"
              title="The factory."
              body="Moved into Plot 330, 6th Industrial Zone, 6 October City. Eight staff. One mill. One commercial deck oven. We started supplying three pharmacies in Zamalek and one specialist clinic in Maadi."
            />
            <StoryEntry
              code="III"
              year="2022"
              title="ISO 22000."
              body="Audited and certified by Bureau Veritas Egypt. Food safety management is not a marketing claim. It is a binder full of process documents, equipment logs, and traceability records reviewed annually by people who do not want to be impressed."
            />
            <StoryEntry
              code="IV"
              year="2024"
              title="Crystal."
              body="A consultant paediatrician at Cairo University Hospital approached us about PKU. There was no domestic supplier in Egypt. We spent eighteen months developing the Crystal low-protein range with the metabolic unit. We publish phenylalanine in milligrams per piece because that is how families ration."
            />
            <StoryEntry
              code="V"
              year="2026"
              title="This pantry."
              body="The site you are reading. We rewrote everything — the wordmark, the photography, the recipes, the way we publish certifications — because the substance of what we make had outgrown its expression."
            />
          </ol>
        </div>
      </section>

      {/* Three-up: certifications, manufacturing, sourcing */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-12 gap-y-12">
          <FactBlock
            code="F-01"
            heading="Made in 6 October."
            body="Plot 330, 6th Industrial Zone, 6 October City, Giza. 22 staff. Two commercial mills. Five deck ovens. One certified PKU clean line — equipment dedicated to low-protein production with a phenylalanine cleanout between batches."
            stat="22"
            statLabel="STAFF"
          />
          <FactBlock
            code="F-02"
            heading="Certified by audit, not by stickering."
            body="ISO 22000:2018 (food safety) and ISO 9001:2015 (quality management), audited annually by Bureau Veritas Egypt. Halal certification renewed January 2025. Every package leaves the line with a lot number we can trace back to its mill batch."
            stat="2024"
            statLabel="LAST AUDIT"
          />
          <FactBlock
            code="F-03"
            heading="Sourced for substitutability, not for marketing."
            body="Our rice flour is milled in El Beheira. Our corn starch comes from a single supplier in Damietta. Our tapioca starch is imported from southern Vietnam — we tried three Egyptian suppliers and none could hit the consistency we need for the Crystal line."
            stat="6"
            statLabel="COUNTRIES SOURCED"
          />
        </div>
      </section>

      {/* PKU pull-out — gravity color */}
      <section className="bg-[rgb(var(--pomegranate)/0.10)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <p className="specimen-lot text-[rgb(var(--pomegranate))]">P · CRYSTAL BY EPICS</p>
            <Strikethrough variant="protein" size={96} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-serif-display text-[56px] leading-[1.05] tracking-[-0.02em] text-[rgb(var(--pomegranate))]">
              The Crystal line is why we exist.
            </h2>
            <p className="font-sans-text text-[18px] leading-[1.55] mt-8 max-w-[720px] text-[rgb(var(--ink-black))]">
              Phenylketonuria is a rare inherited metabolic disorder. People with PKU cannot process phenylalanine, an
              amino acid present in almost all protein. Untreated, it causes irreversible brain damage. Treated, with a
              strict low-protein diet from birth, lives proceed normally — but the diet is unforgiving and the food
              that fits it has historically been hard to find in Egypt.
            </p>
            <p className="font-sans-text text-[18px] leading-[1.55] mt-6 max-w-[720px] text-[rgb(var(--ink-black))]">
              Crystal by Epics is our endorsed sub-brand for PKU. Six SKUs, more in development. Phenylalanine
              published in milligrams per piece because that is how families ration.
            </p>
            <Link
              href="/pku"
              className="inline-block mt-10 bg-[rgb(var(--pomegranate))] text-[rgb(var(--cream-paper))] px-6 py-4 specimen-spec hover:opacity-90 transition-opacity"
            >
              READ THE PKU EXPLAINER →
            </Link>
          </div>
        </div>
      </section>

      {/* Closing pull quote */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <blockquote className="font-serif-display italic text-[44px] sm:text-[56px] leading-[1.15] tracking-[-0.015em] max-w-[1100px]">
            &ldquo;Every label is a footnote. Every footnote is true.&rdquo;
          </blockquote>
          <p className="specimen-lot mt-8 opacity-60">— INTERNAL MEMO · MAY 2026 · PINNED TO THE PRODUCTION FLOOR</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StoryEntry({ code, year, title, body }: { code: string; year: string; title: string; body: string }) {
  return (
    <li className="col-span-12 md:col-span-6 grid grid-cols-[60px_1fr] gap-x-6">
      <div className="flex flex-col gap-1">
        <span className="font-serif-display text-[48px] leading-none italic text-[rgb(var(--saffron))]">
          {code}
        </span>
        <span className="specimen-lot opacity-60">{year}</span>
      </div>
      <div>
        <h3 className="font-serif-display text-[28px] leading-[1.1] tracking-[-0.005em]">{title}</h3>
        <p className="font-sans-text text-[16px] leading-[1.6] mt-3 text-[rgb(var(--charcoal-sub))]">{body}</p>
      </div>
    </li>
  );
}

function FactBlock({ code, heading, body, stat, statLabel }: { code: string; heading: string; body: string; stat: string; statLabel: string }) {
  return (
    <article className="col-span-12 md:col-span-4 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6 flex flex-col gap-4">
      <p className="specimen-lot opacity-60">{code}</p>
      <p className="font-serif-display text-[64px] leading-none tracking-[-0.02em]">{stat}</p>
      <p className="specimen-lot opacity-60">{statLabel}</p>
      <h3 className="font-serif-display text-[24px] leading-[1.15] tracking-[-0.005em] mt-2">{heading}</h3>
      <p className="font-sans-text text-[15px] leading-[1.55] text-[rgb(var(--charcoal-sub))]">{body}</p>
    </article>
  );
}
