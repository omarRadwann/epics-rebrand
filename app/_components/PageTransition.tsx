"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Route-level transition wrapper. Every navigation crossfades the old
 * page out (8px lift) while the new page eases in from below.
 *
 * Sits inside <body> in layout.tsx, wrapping {children}. The pathname
 * key tells AnimatePresence which subtree to swap. mode="wait" so the
 * exit completes before the next page paints — feels deliberate, not
 * choppy.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
