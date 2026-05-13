"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { productBySlug } from "@/lib/catalog";

export type CartLine = { slug: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const Ctx = createContext<CartCtx | null>(null);

// v2 — bumped from v1 because the catalog slugs were shortened
// (`european-baking-mix` → `euro`, etc.) and stale v1 carts produced a
// "Cart · 4 in nav / empty on cart page" mismatch.
const STORAGE_KEY = "epics.cart.v2";

const seed: CartLine[] = [
  { slug: "euro", qty: 2 },
  { slug: "brownies", qty: 1 },
  { slug: "pku-baking-mix", qty: 1 },
];

/** Drop any cart lines whose slug no longer exists in the catalog or has
 *  no price (wholesale-only). Prevents the "ghost-count" hydration mismatch
 *  where Nav counts entries but the cart page filters them out. */
function sanitize(lines: CartLine[]): CartLine[] {
  return lines.filter((l) => {
    if (!l || typeof l.slug !== "string" || typeof l.qty !== "number" || l.qty <= 0) {
      return false;
    }
    const product = productBySlug(l.slug);
    return Boolean(product) && product!.priceEgp != null;
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount. If absent, seed with a demo cart so
  // the /cart page has something to show on first visit. Always sanitize
  // — any line whose slug was deleted from the catalog or whose price
  // dropped to null is silently removed. Also wipe stale v1 keys.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // One-time migration: remove stale v1 key with old catalog slugs.
      window.localStorage.removeItem("epics.cart.v1");

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          const valid = sanitize(parsed);
          // If sanitize stripped everything, fall back to the seed so a
          // demo visitor still sees the cart populated.
          setLines(valid.length > 0 ? valid : sanitize(seed));
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* fall through to seed */
    }
    setLines(sanitize(seed));
    setHydrated(true);
  }, []);

  // Persist on every change after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* localStorage may be disabled — fail silently */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, qty: number = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
      return;
    }
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <Ctx.Provider value={{ lines, count, addItem, setQty, removeItem, clear, hydrated }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
