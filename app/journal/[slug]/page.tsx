import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { journal, journalBySlug, type JournalBlock } from "@/lib/journal";

export function generateStaticParams() {
  return journal.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const j = journalBySlug(params.slug);
  if (!j) return { title: "Not found · Epics" };
  return {
    title: `${j.title} · The Journal · Epics`,
    description: j.dek,
  };
}

export default function JournalArticle({ params }: { params: { slug: string } }) {
  const j = journalBySlug(params.slug);
  if (!j) return notFound();

  const idx = journal.findIndex((x) => x.slug === j.slug);
  const prev = journal[idx - 1];
  const next = journal[idx + 1];

  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Article hero */}
      <article className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <header className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-12 pb-16 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <nav aria-label="Breadcrumb">
              <p className="specimen-lot opacity-60">
                <Link href="/journal" className="hover:underline">JOURNAL</Link>{" "}
                / <span>{j.code}</span>
              </p>
            </nav>
            <p className="specimen-lot opacity-60 mt-6">{j.date}</p>
            <p className="specimen-lot opacity-60 mt-2">{j.read} READ</p>
            <p className="specimen-spec opacity-60 mt-2">{j.category.toUpperCase()}</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-serif-display text-[56px] sm:text-[88px] leading-[0.98] tracking-[-0.025em]">
              {j.title}
            </h1>
            <p className="font-serif-display italic text-[24px] leading-[1.3] mt-8 max-w-[680px]">
              {j.dek}
            </p>
            <p className="specimen-lot opacity-60 mt-10">{j.byline}</p>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pb-20 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-6">
            {j.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {/* Prev / Next */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12 grid grid-cols-2 gap-x-6">
          <div>
            {prev ? (
              <Link href={`/journal/${prev.slug}`} className="block group no-underline">
                <p className="specimen-lot opacity-60">← PREVIOUS · {prev.code}</p>
                <h3 className="font-serif-display text-[22px] leading-[1.15] tracking-[-0.005em] mt-2 group-hover:text-[rgb(var(--saffron))] transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : (
              <Link href="/journal" className="specimen-lot opacity-60 hover:text-[rgb(var(--ink-black))]">
                ← ALL OF THE JOURNAL
              </Link>
            )}
          </div>
          <div className="text-right">
            {next ? (
              <Link href={`/journal/${next.slug}`} className="block group no-underline">
                <p className="specimen-lot opacity-60">NEXT · {next.code} →</p>
                <h3 className="font-serif-display text-[22px] leading-[1.15] tracking-[-0.005em] mt-2 group-hover:text-[rgb(var(--saffron))] transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <Link href="/journal" className="specimen-lot opacity-60 hover:text-[rgb(var(--ink-black))]">
                ALL OF THE JOURNAL →
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Block({ block }: { block: JournalBlock }) {
  if (block.kind === "p") {
    return <p className="font-sans-text text-[18px] leading-[1.65] text-[rgb(var(--ink-black))]">{block.text}</p>;
  }
  if (block.kind === "h") {
    return <h2 className="font-serif-display text-[28px] leading-[1.15] tracking-[-0.005em] mt-12 mb-2">{block.text}</h2>;
  }
  if (block.kind === "pull") {
    return (
      <blockquote className="border-l-2 border-[rgb(var(--saffron))] pl-6 my-10">
        <p className="font-serif-display italic text-[24px] sm:text-[28px] leading-[1.3] tracking-[-0.005em]">
          {block.text}
        </p>
        {block.attr && <p className="specimen-lot mt-3 opacity-60">— {block.attr}</p>}
      </blockquote>
    );
  }
  if (block.kind === "list") {
    return (
      <ol className="list-none p-0 space-y-3 my-6">
        {block.items.map((item, i) => (
          <li key={i} className="grid grid-cols-[40px_1fr] gap-x-4 items-baseline">
            <span className="specimen-lot opacity-60">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-sans-text text-[17px] leading-[1.55]">{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return null;
}
