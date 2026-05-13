"use client";

/**
 * Route-change transition: paper sheet slides up over outgoing content,
 * pauses on a brand watermark frame, then reveals incoming content.
 *
 * Driven by AnimatePresence keyed on pathname.
 */
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { easeEntrance, easeExit } from "@/lib/motion/eases";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeEntrance, delay: 0.1 } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.4, ease: easeExit } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
