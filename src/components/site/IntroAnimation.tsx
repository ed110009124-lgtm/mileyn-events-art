import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LETTERS = ["M", "I", "L", "E", "Y", "N"];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"line" | "letters" | "events" | "lift" | "done">("line");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase("letters"), 700);
    const t2 = setTimeout(() => setPhase("events"), 700 + 1500);
    const t3 = setTimeout(() => setPhase("lift"), 700 + 1500 + 2000);
    const t4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 700 + 1500 + 2000 + 1400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Vertical thread */}
          <motion.div
            className="absolute left-1/2 top-0 h-full bg-amber-gold"
            style={{ width: 1, x: "-50%" }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: phase === "lift" ? 0 : 1,
              scaleY: 1,
              boxShadow:
                phase === "line"
                  ? ["0 0 0px #C8A97E", "0 0 20px #C8A97E", "0 0 0px #C8A97E"]
                  : "0 0 0px #C8A97E",
            }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Logo lockup */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={false}
            animate={
              phase === "lift"
                ? {
                    top: 0,
                    left: 0,
                    x: "calc(-50vw + 7rem)",
                    y: "calc(-50vh + 2.25rem)",
                    scale: 0.3,
                  }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex" aria-label="MILEYN">
              {LETTERS.map((L, i) => {
                const fromLeft = i % 2 === 0;
                return (
                  <motion.span
                    key={i}
                    className="text-amber-gold font-display font-semibold text-[48px] md:text-[80px] tracking-[0.15em]"
                    initial={{ opacity: 0, x: fromLeft ? -40 : 40, filter: "blur(8px)" }}
                    animate={
                      phase === "letters" || phase === "events" || phase === "lift"
                        ? { opacity: 1, x: 0, filter: "blur(0px)" }
                        : { opacity: 0, x: fromLeft ? -40 : 40 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * i,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {L}
                  </motion.span>
                );
              })}
            </div>
            <motion.span
              className="logo-events text-cream/90 mt-2 text-[14px] md:text-[20px]"
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase === "events" || phase === "lift"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Events
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
