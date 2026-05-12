"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

/**
 * Add-to-cart button used on the PDP. On click:
 *   - Pushes the item into the cart context
 *   - Flips the label to "ADDED ✓" for 1.6s, with saffron accent
 *   - Restores to the original label
 */
export function AddToCartButton({
  slug,
  label = "ADD TO CART →",
  addedLabel = "ADDED ✓",
}: {
  slug: string;
  label?: string;
  addedLabel?: string;
}) {
  const { addItem } = useCart();
  const [flash, setFlash] = useState(false);

  return (
    <button
      onClick={() => {
        addItem(slug, 1);
        setFlash(true);
        setTimeout(() => setFlash(false), 1600);
      }}
      aria-live="polite"
      className={`ml-auto px-8 py-4 specimen-spec transition-colors ${
        flash
          ? "bg-[rgb(var(--saffron))] text-[rgb(var(--ink-black))]"
          : "bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))]"
      }`}
    >
      {flash ? addedLabel : label}
    </button>
  );
}
