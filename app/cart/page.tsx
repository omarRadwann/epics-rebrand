import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { CartView } from "./_CartView";

export const metadata = {
  title: "Cart · Epics",
  description: "Your specimen cart.",
};

/**
 * Cart + Checkout. Minimal, confidence-inducing, no dark patterns.
 * Server wrapper around the client CartView, which reads from CartProvider.
 */
export default function CartPage() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />
      <CartView />
      <Footer />
    </main>
  );
}
