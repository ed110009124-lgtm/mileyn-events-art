import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-6 top-0 z-40 hidden md:block pointer-events-none"
      style={{ height: "100vh" }}
    >
      <div
        className="bg-amber-gold/70 origin-top"
        style={{
          width: 1,
          height: `${progress * 100}vh`,
          transition: "height 0.1s linear",
        }}
      />
    </div>
  );
}
