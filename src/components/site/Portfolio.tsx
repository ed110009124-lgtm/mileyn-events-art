import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GoldenThread } from "./GoldenThread";
import { PROJECTS } from "@/data/site";

export function Portfolio() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="relative bg-espresso text-cream py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">Curated Experiences</h2>
          <div className="mt-5"><GoldenThread width={48} /></div>
        </motion.div>
      </div>

      <div className="relative mt-14">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-cream/10 backdrop-blur border border-amber-gold/40 text-amber-gold hover:bg-amber-gold hover:text-espresso transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-cream/10 backdrop-blur border border-amber-gold/40 text-amber-gold hover:bg-amber-gold hover:text-espresso transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 snap-x snap-mandatory scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {PROJECTS.map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative shrink-0 snap-start w-[300px] md:w-[400px] aspect-[3/4] overflow-hidden bg-charcoal"
            >
              <Link to="/portfolio/$slug" params={{ slug: item.slug }} className="block h-full w-full">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent group-hover:from-espresso/90 transition-all duration-500" />
                <span className="pointer-events-none absolute inset-0 border border-amber-gold/0 group-hover:border-amber-gold/80 transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-amber-gold/80 text-[10px] uppercase tracking-[0.3em]">{item.type}</p>
                  <h3 className="font-display text-2xl text-cream mt-1">{item.name}</h3>
                  <span className="mt-2 inline-block text-amber-gold text-[11px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Experience →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
