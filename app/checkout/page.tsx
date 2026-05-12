import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { CheckoutForm } from "./_CheckoutForm";

export const metadata = {
  title: "Checkout · Epics",
  description: "Confirm delivery and payment. We ship within 24 hours, anywhere in Egypt.",
};

export default function CheckoutPage() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-12 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">PACKING SLIP · 26-0001 · CHECKOUT</p>
            <h1 className="font-serif-display text-[64px] leading-[1.02] tracking-[-0.025em] mt-3">
              Where to.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex items-end mt-6 md:mt-0">
            <p className="font-serif-display italic text-[22px] leading-[1.3] max-w-[480px]">
              We pack within 4 hours of order during our working week. Cash on delivery is available everywhere in Egypt;
              card and wallet at the door.
            </p>
          </div>
        </div>
      </section>

      <CheckoutForm />

      <Footer />
    </main>
  );
}
