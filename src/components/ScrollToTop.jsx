import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { scaleFade } from "../animations/variants";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          {...scaleFade}
          transition={{ duration: 0.2 }}
          onClick={scrollUp}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 shadow-lg backdrop-blur hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900/80 dark:hover:bg-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
