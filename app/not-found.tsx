import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="flex min-h-[80vh] items-center justify-center px-6 py-24"
      >
        <div className="text-center">
          <p className="specimen-lot mb-6 text-ink/60">
            F-404 · OUT OF CATALOGUE
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] italic leading-[0.95] tracking-[-0.025em]">
            Not in this lot.
          </h1>
          <p className="mt-6 max-w-md mx-auto text-[15px] leading-[1.55] text-ink/75">
            We catalogue every specimen. This page isn&rsquo;t one of them.
            Try the pantry shelves, or report the missing reference.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="specimen-spec inline-flex border border-ink bg-ink px-7 py-4 text-paper no-underline transition-colors hover:bg-saffron hover:text-ink"
            >
              RETURN TO THE PANTRY →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
