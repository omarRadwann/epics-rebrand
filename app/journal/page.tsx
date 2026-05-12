import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { journal } from "@/lib/journal";

export const metadata = {
  title: "The Journal · Epics",
  description: "Editorial pieces from the Epics method book — process, certification, PKU, and design.",
};

export default function JournalIndex() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot opacity-60">J · THE JOURNAL</p>
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
            <p className="font-serif-display italic text-[24px] leading-[1.3] mt-10 max-w-[640px]">
              Long-form pieces from the Epics method book. Process, certification, the PKU line, and the small editorial
              decisions that compound into a brand.
            </p>
          </div>
        </div>
      </section>

      {/* Article index */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16">
          <ol className="list-none p-0 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px]">
            {journal.map((j) => (
              <li key={j.slug} className="border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px]">
                <Link href={`/journal/${j.slug}`} className="grid grid-cols-12 gap-x-6 py-8 group no-underline">
                  <div className="col-span-12 md:col-span-2 flex flex-col gap-1">
                    <span className="specimen-lot opacity-60">{j.code}</span>
                    <span className="specimen-lot opacity-60">{j.date}</span>
                  </div>
                  <div className="col-span-12 md:col-span-1">
                    <span className="specimen-spec opacity-60">{j.category.toUpperCase()}</span>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-serif-display text-[32px] leading-[1.1] tracking-[-0.015em] group-hover:text-[rgb(var(--saffron))] transition-colors">
                      {j.title}
                    </h2>
                    <p className="font-serif-display italic text-[18px] leading-[1.3] mt-3 max-w-[640px] text-[rgb(var(--charcoal-sub))]">
                      {j.dek}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end gap-1 mt-3 md:mt-0">
                    <span className="specimen-lot opacity-60">{j.read} READ</span>
                    <span className="specimen-spec group-hover:underline underline-offset-4 decoration-[0.5px] mt-3">READ →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}
