import { motion } from "framer-motion";
import heroImage from "@/assets/hero-event.jpg";

const STATS = [
  { v: "150+", l: "Events Curated" },
  { v: "50+", l: "Luxury Celebrations" },
  { v: "98%", l: "Client Satisfaction" },
  { v: "8+", l: "Years Mastery" },
];

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-espresso text-cream"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.img
          src={heroImage}
          alt="Mileyn Events — golden-hour wedding reception"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-espresso/60" />
      </motion.div>

      {/* Drifting amber particles */}
      <Particles />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-16 md:px-12">
        <motion.h1
          className="font-display text-[44px] leading-[1.05] md:text-[84px] text-cream max-w-4xl text-balance"
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Where Vision Meets <em className="text-amber-gold not-italic font-light italic">Exquisite</em> Execution
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-cream/80 text-base md:text-lg font-light leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          From intimate celebrations to grand galas, we craft moments that linger long after the last guest departs.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <a
            href="#portfolio"
            className="gold-sweep border border-amber-gold text-amber-gold hover:bg-amber-gold hover:text-espresso px-7 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-colors"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="gold-sweep bg-amber-gold text-espresso hover:bg-amber-gold/90 px-7 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-colors"
          >
            Begin Your Vision
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 text-cream/85"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div>
                <span className="font-display text-2xl text-amber-gold">{s.v}</span>
                <span className="ml-2 text-xs uppercase tracking-[0.2em] text-cream/70">{s.l}</span>
              </div>
              {i < STATS.length - 1 && <span className="hidden md:inline-block h-1 w-1 rounded-full bg-amber-gold" />}
            </div>
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-cream/55"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {["Featured in Luxury Events Magazine", "Member, Intl. Event Society", "Fully Insured & Licensed", "Available Worldwide"].map((t, i, arr) => (
            <div key={i} className="flex items-center gap-3">
              <span>{t}</span>
              {i < arr.length - 1 && <span className="h-1 w-1 rounded-full bg-amber-gold/60" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Particles() {
  // Lightweight CSS-only floating amber particles
  const dots = Array.from({ length: 18 });
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.7) % 8;
        const size = 2 + (i % 3);
        const dur = 8 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-amber-gold"
            style={{ left: `${left}%`, bottom: -10, width: size, height: size, opacity: 0.6 }}
            animate={{ y: [-0, -window.innerHeight - 50], opacity: [0, 0.7, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
