import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { productBySlug } from "@/lib/catalog";

export const metadata = {
  title: "Cart · Epics",
  description: "Your specimen cart.",
};

/**
 * Cart + Checkout. Minimal, confidence-inducing, no dark patterns.
 * No countdown timers. No "only 2 left!" anxiety. No upsell pop-ups.
 *
 * The cart reads like a packing slip — because that's what it is.
 */
export default function CartPage() {
  // Demo cart with 3 lines
  const lines = [
    { product: productBySlug("european-baking-mix")!, qty: 2 },
    { product: productBySlug("brownies-mix")!, qty: 1 },
    { product: productBySlug("crystal-low-protein-flat-bread")!, qty: 1 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.product.priceEgp * l.qty, 0);
  const delivery = 25;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Cart hero */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-12 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">PACKING SLIP · 26-0001</p>
            <h1 className="font-serif-display text-[72px] leading-[1.02] tracking-[-0.025em] mt-3">
              Your pantry.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex items-end">
            <p className="font-serif-display italic text-[22px] leading-[1.3] max-w-[480px]">
              We pack within 4 hours of order during our working week (Saturday to Wednesday, 9–4 Cairo time). Ships
              within 24 hours, anywhere in Egypt.
            </p>
          </div>
        </div>
      </section>

      {/* Cart + summary */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12 grid grid-cols-12 gap-x-12 gap-y-12">
          {/* Lines */}
          <div className="col-span-12 lg:col-span-8">
            <ol className="list-none p-0 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px]">
              {lines.map((l) => (
                <li
                  key={l.product.slug}
                  className="grid grid-cols-[60px_1fr_auto_auto_60px] gap-x-6 items-baseline py-6 border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px]"
                >
                  <div
                    className={`aspect-square flex items-center justify-center text-[10px] specimen-lot ${
                      l.product.subBrand === "crystal"
                        ? "bg-[rgb(var(--pomegranate)/0.10)] text-[rgb(var(--pomegranate))]"
                        : "bg-[rgb(var(--linen-mid)/0.5)] text-[rgb(var(--ink-black))]"
                    }`}
                  >
                    {l.product.loafNumber.split(" ")[1] ?? l.product.loafNumber}
                  </div>
                  <div>
                    {l.product.subBrand === "crystal" && (
                      <p className="specimen-lot text-[rgb(var(--pomegranate))]">CRYSTAL BY EPICS</p>
                    )}
                    <h3 className="font-serif-display text-[22px] leading-[1.1] tracking-[-0.005em]">
                      {l.product.name}
                    </h3>
                    <p className="specimen-lot opacity-60 mt-1">
                      {l.product.weight.toUpperCase()} · LOT {l.product.lot}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 border border-[rgb(var(--ink-black))] specimen-spec" aria-label="Decrease">−</button>
                    <span className="specimen-spec w-6 text-center">{l.qty}</span>
                    <button className="w-8 h-8 border border-[rgb(var(--ink-black))] specimen-spec" aria-label="Increase">+</button>
                  </div>
                  <span className="font-serif-display text-[20px] tracking-[-0.005em] text-right">
                    {l.product.priceEgp * l.qty} <span className="specimen-spec ml-1 opacity-60">EGP</span>
                  </span>
                  <button className="specimen-lot opacity-60 hover:text-[rgb(var(--pomegranate))] underline underline-offset-4 decoration-[0.5px]" aria-label="Remove">
                    REMOVE
                  </button>
                </li>
              ))}
            </ol>

            <Link href="/" className="inline-block mt-8 specimen-spec underline underline-offset-[6px] decoration-[0.5px]">
              ← CONTINUE BROWSING THE PANTRY
            </Link>
          </div>

          {/* Summary */}
          <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 self-start">
            <div className="bg-[rgb(var(--linen-mid)/0.45)] p-8">
              <p className="specimen-lot opacity-60 mb-6">SUMMARY · S-01</p>
              <dl className="space-y-3 border-b border-[rgb(var(--ink-black)/0.3)] border-b-[0.5px] pb-6 mb-6">
                <div className="flex justify-between items-baseline">
                  <dt className="specimen-spec">SUBTOTAL</dt>
                  <dd className="font-serif-display text-[22px] tracking-[-0.005em]">{subtotal} <span className="specimen-spec text-[12px] opacity-60">EGP</span></dd>
                </div>
                <div className="flex justify-between items-baseline">
                  <dt className="specimen-spec">DELIVERY · CAIRO/GIZA</dt>
                  <dd className="font-serif-display text-[22px] tracking-[-0.005em]">{delivery} <span className="specimen-spec text-[12px] opacity-60">EGP</span></dd>
                </div>
              </dl>
              <div className="flex justify-between items-baseline mb-8">
                <dt className="specimen-spec">TOTAL</dt>
                <dd className="font-serif-display text-[36px] tracking-[-0.015em]">{total} <span className="specimen-spec text-[14px] opacity-60 ml-1">EGP</span></dd>
              </div>
              <button className="w-full bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors">
                PROCEED TO CHECKOUT →
              </button>
              <p className="specimen-lot opacity-60 mt-4 leading-[1.5]">
                Cash on delivery available · Card or wallet at checkout · Free returns within 7 days if a lot is faulty.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
