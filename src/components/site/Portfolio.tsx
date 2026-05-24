import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GoldenThread } from "./GoldenThread";

const ITEMS = [
  { name: "The Pearl Wedding", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=70" },
  { name: "The Executive Gala", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=70" },
  { name: "Garden Soirée", img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=70" },
  { name: "Coastal Vow", img: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=70" },
  { name: "Velvet Hour", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=70" },
  { name: "Brass & Linen", img: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=900&q=70" },
];

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
          {ITEMS.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative shrink-0 snap-start w-[300px] md:w-[400px] aspect-[3/4] overflow-hidden bg-charcoal cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent group-hover:from-espresso/90 transition-all duration-500" />

              {/* Tracing border */}
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                <span className="absolute left-0 top-0 h-px bg-amber-gold animate-[grow-x_0.4s_ease-out_forwards]" style={{ width: 0 }} />
                <span className="absolute inset-0 border border-amber-gold/0 group-hover:border-amber-gold/80 transition-colors duration-700" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                <span className="thread-link mt-2 inline-block text-amber-gold text-[11px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity">
                  View Experience →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
