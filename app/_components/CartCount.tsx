"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

/**
 * Live cart count in the nav. Read from CartProvider context.
 * Shows " · 0" during SSR until hydration, then animates the real count in.
 */
export function CartCount({ locale = "en" }: { locale?: "en" | "ar" }) {
  const { count, hydrated } = useCart();
  const label = locale === "ar" ? "السلة" : "Cart";

  return (
    <Link
      href={locale === "ar" ? "/cart" : "/cart"}
      className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] hover:underline underline-offset-4 decoration-[0.5px] tabular-nums"
      aria-label={`${label} (${count})`}
    >
      {label} · {hydrated ? count : 0}
    </Link>
  );
}
