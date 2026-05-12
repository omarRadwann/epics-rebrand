"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

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

const STORAGE_KEY = "epics.cart.v1";

const seed: CartLine[] = [
  { slug: "european-baking-mix", qty: 2 },
  { slug: "brownies-mix", qty: 1 },
  { slug: "crystal-low-protein-flat-bread", qty: 1 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount. If absent, seed with a demo cart so the
  // /cart page has something to show on first visit (demo-friendly).
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(parsed);
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* fall through to seed */
    }
    setLines(seed);
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
