import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { GoldenThread } from "./GoldenThread";
import bts1 from "@/assets/team-bts-1.jpg";
import bts2 from "@/assets/team-bts-2.jpg";
import bts3 from "@/assets/team-bts-3.jpg";
import bts4 from "@/assets/team-bts-4.jpg";

// Behind-the-scenes collage. Captions are atmospheric, not identifying.
const FRAMES: { src: string; caption: string; tall?: boolean; wide?: boolean }[] = [
  { src: bts1, caption: "Golden hour, final stems", tall: true },
  { src: bts2, caption: "The last knife laid" },
  { src: bts4, caption: "Two hundred candles before doors", wide: true },
  { src: bts3, caption: "A mood board, found", tall: true },
];

export function Team() {
  return (
    <section id="team" className="relative bg-cream text-espresso py-28 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-amber-gold text-[11px] uppercase tracking-[0.4em] font-medium glow-gold-text">
            Behind The Curtain
          </p>
          <h2 className="font-display text-5xl md:text-7xl mt-3 leading-[1.02]">
            The hands that <em className="italic font-light text-amber-gold">make it look easy</em>.
          </h2>
          <div className="mt-5"><GoldenThread width={56} /></div>
          <p className="mt-7 text-espresso/80 text-lg font-light leading-relaxed">
            We don't pose for portraits. We're usually in the back of the room — pinning a stem,
            relighting a wick, fixing what only we noticed. Here are a few stolen moments from real events.
          </p>
        </motion.div>

        {/* Asymmetric collage */}
        <div className="mt-16 grid grid-cols-12 gap-3 md:gap-5 auto-rows-[120px] md:auto-rows-[160px]">
          {FRAMES.map((f, i) => {
            const span =
              i === 0
                ? "col-span-7 md:col-span-5 row-span-3"
                : i === 1
                ? "col-span-5 md:col-span-3 row-span-2"
                : i === 2
                ? "col-span-12 md:col-span-4 row-span-3 md:translate-y-6"
                : "col-span-7 md:col-span-5 row-span-3 md:-translate-y-4";
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className={`group relative overflow-hidden bg-champagne ${span}`}
              >
                <img
                  src={f.src}
                  alt={f.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/0 to-transparent opacity-90" />
                <figcaption className="absolute bottom-3 left-4 right-4 text-cream text-xs md:text-sm font-display italic tracking-wide drop-shadow-md">
                  {f.caption}
                </figcaption>
                <span className="absolute top-3 left-4 text-[10px] uppercase tracking-[0.35em] text-amber-gold/90 font-medium">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </motion.figure>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <p className="font-display italic text-espresso/85 text-xl md:text-2xl max-w-xl">
            "We measure success by what the guests <span className="text-amber-gold">don't</span> see."
          </p>
          <Link
            to="/team"
            className="thread-link text-amber-gold text-xs uppercase tracking-[0.3em] font-medium glow-gold-text"
          >
            Step Into The Studio →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
