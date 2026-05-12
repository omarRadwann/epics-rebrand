"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../_components/CartProvider";
import { productBySlug } from "@/lib/catalog";

const DELIVERY_EGP = 25;

type Payment = "cod" | "card" | "wallet";

export function CheckoutForm() {
  const { lines, clear, hydrated } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() => `EG-${Date.now().toString().slice(-7)}`);
  const [payment, setPayment] = useState<Payment>("cod");

  const resolved = lines
    .map((l) => ({ product: productBySlug(l.slug), qty: l.qty }))
    .filter((l): l is { product: NonNullable<ReturnType<typeof productBySlug>>; qty: number } =>
      Boolean(l.product) && l.product!.priceEgp != null
    );
  const subtotal = resolved.reduce((s, l) => s + (l.product.priceEgp ?? 0) * l.qty, 0);
  const total = subtotal + DELIVERY_EGP;

  if (!hydrated) {
    return <div className="sr-only">Loading checkout…</div>;
  }

  if (resolved.length === 0 && !submitted) {
    return (
      <section className="py-24 text-center">
        <p className="font-serif-display italic text-[28px]">There&rsquo;s nothing to check out.</p>
        <Link href="/shop" className="inline-block mt-8 specimen-spec underline underline-offset-[6px] decoration-[0.5px]">
          BACK TO THE PANTRY →
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-[840px] px-6 sm:px-12 text-center">
          <p className="specimen-lot opacity-60">ORDER CONFIRMED</p>
          <p className="specimen-spec opacity-60 mt-1">{orderId}</p>
          <h2 className="font-serif-display text-[64px] leading-[1.02] tracking-[-0.025em] mt-6">
            On its way.
          </h2>
          <p className="font-serif-display italic text-[22px] leading-[1.3] mt-6">
            We&rsquo;ll WhatsApp you the lot numbers as soon as the slip is packed. You&rsquo;ll have it within 24 hours.
          </p>
          <div className="grid grid-cols-3 gap-x-6 mt-12 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-8 text-left">
            <div>
              <p className="specimen-lot opacity-60">ORDER</p>
              <p className="font-serif-display text-[22px] mt-1 tracking-[-0.005em]">{orderId}</p>
            </div>
            <div>
              <p className="specimen-lot opacity-60">PAYMENT</p>
              <p className="font-serif-display text-[22px] mt-1 tracking-[-0.005em]">
                {payment === "cod" ? "Cash on delivery" : payment === "card" ? "Card at door" : "Wallet"}
              </p>
            </div>
            <div>
              <p className="specimen-lot opacity-60">TOTAL</p>
              <p className="font-serif-display text-[22px] mt-1 tracking-[-0.005em] tabular-nums">{total} <span className="specimen-spec text-[12px] opacity-60">EGP</span></p>
            </div>
          </div>
          <Link
            href="/shop"
            className="inline-block mt-12 specimen-spec underline underline-offset-[6px] decoration-[0.5px]"
          >
            BROWSE ANOTHER SHELF →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        clear();
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12 grid grid-cols-12 gap-x-12 gap-y-12">
        {/* Form */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          <Fieldset code="D-01" title="Delivery">
            <Field label="Full name" name="name" required />
            <Field label="Phone (we use WhatsApp)" name="phone" type="tel" required pattern="^\+?20?1[0125]\d{8}$" />
            <Field label="Street address" name="address" required />
            <div className="grid grid-cols-2 gap-x-4">
              <Field label="District / Area" name="district" required />
              <Field label="Governorate" name="governorate" defaultValue="Giza" required />
            </div>
            <Field label="Notes for the courier" name="notes" placeholder="Building number, landmark, doorbell name…" />
          </Fieldset>

          <Fieldset code="D-02" title="Payment">
            <div className="space-y-3">
              {([
                { id: "cod" as const, label: "Cash on delivery", note: "Pay in cash when the courier hands you the slip." },
                { id: "card" as const, label: "Card at the door", note: "Visa, Mastercard, or Meeza. POS at delivery." },
                { id: "wallet" as const, label: "Wallet (Vodafone Cash, InstaPay)", note: "We send a payment link after we pack the slip." },
              ]).map((opt) => (
                <label
                  key={opt.id}
                  className={`block border p-4 cursor-pointer transition-colors ${
                    payment === opt.id
                      ? "border-[rgb(var(--ink-black))] bg-[rgb(var(--linen-mid)/0.35)]"
                      : "border-[rgb(var(--ink-black)/0.25)] hover:border-[rgb(var(--ink-black))]"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === opt.id}
                      onChange={() => setPayment(opt.id)}
                      className="accent-[rgb(var(--ink-black))]"
                    />
                    <span className="specimen-spec">{opt.label.toUpperCase()}</span>
                  </div>
                  <p className="font-sans-text text-[14px] text-[rgb(var(--charcoal-sub))] mt-2 ml-7">{opt.note}</p>
                </label>
              ))}
            </div>
          </Fieldset>
        </div>

        {/* Summary */}
        <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 self-start">
          <div className="bg-[rgb(var(--linen-mid)/0.45)] p-6 sm:p-8">
            <p className="specimen-lot opacity-60 mb-6">SLIP · {resolved.length} {resolved.length === 1 ? "LINE" : "LINES"}</p>
            <ol className="list-none p-0 space-y-3 border-b border-[rgb(var(--ink-black)/0.3)] border-b-[0.5px] pb-5 mb-5">
              {resolved.map((l) => (
                <li key={l.product.slug} className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans-text text-[14px] truncate">{l.product.name}</p>
                    <p className="specimen-lot opacity-60">{l.product.weight.toUpperCase()} · ×{l.qty}</p>
                  </div>
                  <span className="specimen-spec tabular-nums">{(l.product.priceEgp ?? 0) * l.qty} EGP</span>
                </li>
              ))}
            </ol>
            <dl className="space-y-2 mb-6">
              <div className="flex justify-between specimen-spec opacity-70">
                <dt>SUBTOTAL</dt>
                <dd className="tabular-nums">{subtotal} EGP</dd>
              </div>
              <div className="flex justify-between specimen-spec opacity-70">
                <dt>DELIVERY</dt>
                <dd className="tabular-nums">{DELIVERY_EGP} EGP</dd>
              </div>
            </dl>
            <div className="flex justify-between items-baseline mb-8 border-t border-[rgb(var(--ink-black)/0.3)] border-t-[0.5px] pt-4">
              <dt className="specimen-spec">TOTAL</dt>
              <dd className="font-serif-display text-[36px] tracking-[-0.015em] tabular-nums">
                {total} <span className="specimen-spec text-[14px] opacity-60 ml-1">EGP</span>
              </dd>
            </div>
            <button
              type="submit"
              className="w-full bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors"
            >
              PLACE ORDER →
            </button>
            <p className="specimen-lot opacity-60 mt-4 leading-[1.5]">
              By placing the order you agree to our returns policy: free returns within 7 days if a lot is faulty. We will
              tell you the lot number on the slip.
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

function Fieldset({ code, title, children }: { code: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline justify-between mb-6">
        <p className="specimen-lot opacity-60">{code} · {title.toUpperCase()}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  label, name, type = "text", required, placeholder, pattern, defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="specimen-lot opacity-60">{label.toUpperCase()}{required ? " ·  REQUIRED" : ""}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        defaultValue={defaultValue}
        className="block w-full mt-2 px-0 py-2 border-0 border-b border-[rgb(var(--ink-black))] bg-transparent font-sans-text text-[16px] focus:outline-none focus:border-b-[1.5px] focus:border-[rgb(var(--saffron))] placeholder:text-[rgb(var(--charcoal-sub)/0.5)]"
      />
    </label>
  );
}
