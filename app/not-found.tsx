import Link from "next/link";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";

export const metadata = {
  title: "Not in this lot · Epics",
};

/**
 * 404. Memorable. Not "Oops!" — that breaks the brand voice.
 *
 * Treated as a missing specimen card: a black tile with a struck-out lot
 * number where the loaf should be.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))] flex flex-col">
      <Nav />

      <section className="flex-1 border-y border-[rgb(var(--ink-black)/0.6)] border-y-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-12">
          {/* The missing specimen */}
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-[3/4] bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] flex flex-col justify-between p-8 relative overflow-hidden">
              <p className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">SPECIMEN · NOT FOUND</p>
              <div className="text-center">
                <p className="specimen-spec text-[rgb(var(--cream-paper)/0.6)] mb-2">LOT</p>
                <p className="font-serif-display text-[88px] leading-none tracking-[-0.025em] line-through decoration-[1px] decoration-[rgb(var(--saffron))]">
                  404
                </p>
              </div>
              <p className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">SHELF · UNCATALOGUED</p>

              {/* Diagonal strikethrough across the whole card */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(to top right, transparent 49.7%, rgb(var(--saffron)) 50%, rgb(var(--saffron)) 50.3%, transparent 50.4%)" }}
              />
            </div>
          </div>

          {/* Editorial copy */}
          <div className="col-span-12 md:col-span-7 md:pl-8 flex flex-col justify-between">
            <div>
              <p className="specimen-lot opacity-60">404 · NOT IN THIS LOT</p>
              <h1 className="font-serif-display text-[80px] sm:text-[112px] leading-[0.95] tracking-[-0.03em] mt-4">
                Not in this
                <br />
                <span className="italic">lot.</span>
              </h1>
              <p className="font-serif-display italic text-[24px] leading-[1.3] mt-10 max-w-[520px]">
                The page you wanted is either uncatalogued, mis-numbered, or has been retired between print runs. The
                pantry has shelves you might prefer.
              </p>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 list-none p-0">
              {[
                { href: "/", label: "Home", code: "H-01" },
                { href: "/gluten-free", label: "Gluten-Free", code: "C-01" },
                { href: "/pku", label: "Crystal · PKU", code: "C-03" },
                { href: "/about", label: "About Epics", code: "A-01" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-3 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] group">
                    <p className="specimen-lot opacity-60">{l.code}</p>
                    <p className="font-serif-display text-[22px] leading-[1.1] tracking-[-0.005em] mt-1 group-hover:underline underline-offset-4 decoration-[0.5px]">
                      {l.label} <span className="opacity-50 ml-1">→</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
