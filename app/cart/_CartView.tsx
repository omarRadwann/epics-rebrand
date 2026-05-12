"use client";

import Link from "next/link";
import { useCart } from "../_components/CartProvider";
import { productBySlug } from "@/lib/catalog";

const DELIVERY_EGP = 25;

export function CartView() {
  const { lines, setQty, removeItem, hydrated, clear } = useCart();

  const resolved = lines
    .map((l) => ({ product: productBySlug(l.slug), qty: l.qty }))
    .filter((l): l is { product: NonNullable<ReturnType<typeof productBySlug>>; qty: number } => Boolean(l.product));

  const subtotal = resolved.reduce((s, l) => s + l.product.priceEgp * l.qty, 0);
  const total = resolved.length === 0 ? 0 : subtotal + DELIVERY_EGP;

  return (
    <>
      {/* Cart hero */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-12 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">PACKING SLIP · 26-0001</p>
            <h1 className="font-serif-display text-[56px] sm:text-[72px] leading-[1.02] tracking-[-0.025em] mt-3">
              {resolved.length === 0 ? "Your pantry is empty." : "Your pantry."}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex items-end mt-6 md:mt-0">
            <p className="font-serif-display italic text-[20px] sm:text-[22px] leading-[1.3] max-w-[480px]">
              {resolved.length === 0
                ? "There is nothing on the slip yet. Choose a shelf — the gluten-free, the sugar-free, or the Crystal range — and add the first specimen."
                : "We pack within 4 hours of order during our working week (Saturday to Wednesday, 9–4 Cairo time). Ships within 24 hours, anywhere in Egypt."}
            </p>
          </div>
        </div>
      </section>

      {resolved.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12 grid grid-cols-12 gap-x-12 gap-y-12">
            {/* Lines */}
            <div className="col-span-12 lg:col-span-8">
              <ol className="list-none p-0 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px]">
                {resolved.map((l) => (
                  <li
                    key={l.product.slug}
                    className="grid grid-cols-[48px_1fr_auto] sm:grid-cols-[60px_1fr_auto_auto_60px] gap-x-3 sm:gap-x-6 items-center sm:items-baseline py-6 border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px]"
                  >
                    <div
                      className={`aspect-square flex items-center justify-center specimen-lot text-[10px] ${
                        l.product.subBrand === "crystal"
                          ? "bg-[rgb(var(--pomegranate)/0.10)] text-[rgb(var(--pomegranate))]"
                          : "bg-[rgb(var(--linen-mid)/0.5)] text-[rgb(var(--ink-black))]"
                      }`}
                      aria-hidden
                    >
                      {l.product.loafNumber.split(" ")[1] ?? l.product.loafNumber}
                    </div>
                    <div className="min-w-0">
                      {l.product.subBrand === "crystal" && (
                        <p className="specimen-lot text-[rgb(var(--pomegranate))]">CRYSTAL BY EPICS</p>
                      )}
                      <h3 className="font-serif-display text-[18px] sm:text-[22px] leading-[1.15] tracking-[-0.005em]">
                        <Link href={`/products/${l.product.slug}`} className="hover:underline underline-offset-4 decoration-[0.5px]">
                          {l.product.name}
                        </Link>
                      </h3>
                      <p className="specimen-lot opacity-60 mt-1">
                        {l.product.weight.toUpperCase()} · LOT {l.product.lot}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 col-start-2 sm:col-start-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => setQty(l.product.slug, l.qty - 1)}
                        className="w-8 h-8 border border-[rgb(var(--ink-black))] specimen-spec hover:bg-[rgb(var(--ink-black))] hover:text-[rgb(var(--cream-paper))] transition-colors"
                        aria-label={`Decrease ${l.product.name}`}
                      >
                        −
                      </button>
                      <span className="specimen-spec w-6 text-center tabular-nums">{l.qty}</span>
                      <button
                        onClick={() => setQty(l.product.slug, l.qty + 1)}
                        className="w-8 h-8 border border-[rgb(var(--ink-black))] specimen-spec hover:bg-[rgb(var(--ink-black))] hover:text-[rgb(var(--cream-paper))] transition-colors"
                        aria-label={`Increase ${l.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-serif-display text-[18px] sm:text-[20px] tracking-[-0.005em] text-right hidden sm:inline tabular-nums">
                      {l.product.priceEgp * l.qty} <span className="specimen-spec ml-1 opacity-60">EGP</span>
                    </span>
                    <button
                      onClick={() => removeItem(l.product.slug)}
                      className="specimen-lot opacity-60 hover:text-[rgb(var(--pomegranate))] hover:opacity-100 underline underline-offset-4 decoration-[0.5px] justify-self-end col-start-3 sm:col-start-auto mt-2 sm:mt-0"
                      aria-label={`Remove ${l.product.name}`}
                    >
                      REMOVE
                    </button>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap items-baseline justify-between gap-4 mt-8">
                <Link href="/" className="specimen-spec underline underline-offset-[6px] decoration-[0.5px]">
                  ← CONTINUE BROWSING THE PANTRY
                </Link>
                <button
                  onClick={clear}
                  className="specimen-lot opacity-60 hover:text-[rgb(var(--pomegranate))] hover:opacity-100 underline underline-offset-4 decoration-[0.5px]"
                >
                  EMPTY THE SLIP
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 self-start">
              <div className="bg-[rgb(var(--linen-mid)/0.45)] p-6 sm:p-8">
                <p className="specimen-lot opacity-60 mb-6">SUMMARY · S-01</p>
                <dl className="space-y-3 border-b border-[rgb(var(--ink-black)/0.3)] border-b-[0.5px] pb-6 mb-6">
                  <div className="flex justify-between items-baseline">
                    <dt className="specimen-spec">SUBTOTAL</dt>
                    <dd className="font-serif-display text-[22px] tracking-[-0.005em] tabular-nums">
                      {subtotal} <span className="specimen-spec text-[12px] opacity-60">EGP</span>
                    </dd>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <dt className="specimen-spec">DELIVERY · CAIRO/GIZA</dt>
                    <dd className="font-serif-display text-[22px] tracking-[-0.005em] tabular-nums">
                      {DELIVERY_EGP} <span className="specimen-spec text-[12px] opacity-60">EGP</span>
                    </dd>
                  </div>
                </dl>
                <div className="flex justify-between items-baseline mb-8">
                  <dt className="specimen-spec">TOTAL</dt>
                  <dd className="font-serif-display text-[36px] tracking-[-0.015em] tabular-nums">
                    {total} <span className="specimen-spec text-[14px] opacity-60 ml-1">EGP</span>
                  </dd>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors no-underline"
                >
                  PROCEED TO CHECKOUT →
                </Link>
                <p className="specimen-lot opacity-60 mt-4 leading-[1.5]">
                  Cash on delivery available · Card or wallet at checkout · Free returns within 7 days if a lot is faulty.
                </p>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Avoid hydration-mismatch loading flicker */}
      {!hydrated && <div className="sr-only">Loading cart…</div>}
    </>
  );
}

function EmptyCart() {
  return (
    <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { href: "/gluten-free", code: "C-01", label: "Gluten-Free" },
          { href: "/sugar-free", code: "C-02", label: "Sugar-Free" },
          { href: "/pku", code: "C-03", label: "Crystal · PKU" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block bg-[rgb(var(--linen-mid)/0.45)] p-8 hover:bg-[rgb(var(--linen-mid)/0.7)] transition-colors no-underline"
          >
            <p className="specimen-lot opacity-60">{c.code} · SHELF</p>
            <h3 className="font-serif-display text-[28px] leading-[1.15] tracking-[-0.005em] mt-3">{c.label}</h3>
            <p className="specimen-spec mt-6 opacity-70">BROWSE →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
