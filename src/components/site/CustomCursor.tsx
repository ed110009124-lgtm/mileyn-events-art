import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    setEnabled(true);
    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button], input, textarea, select, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] rounded-full border border-amber-gold mix-blend-difference"
        animate={{
          x: pos.x - (hover ? 13 : 10),
          y: pos.y - (hover ? 13 : 10),
          width: hover ? 26 : 20,
          height: hover ? 26 : 20,
          backgroundColor: hover ? "rgba(200,169,126,0.9)" : "rgba(200,169,126,0)",
        }}
        transition={{ type: "spring", damping: 28, stiffness: 400, mass: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[99] rounded-full border border-amber-gold/40"
        style={{ width: 28, height: 28 }}
        animate={{ x: pos.x - 14, y: pos.y - 14 }}
        transition={{ type: "spring", damping: 20, stiffness: 120, mass: 0.6 }}
      />
    </>
  );
}
