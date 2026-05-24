import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GoldenThread } from "./GoldenThread";

const TESTIMONIALS = [
  { quote: "They didn't plan our wedding. They composed it.", name: "Adaeze & Tomiwa", role: "The Pearl Wedding" },
  { quote: "Every detail considered. Nothing felt accidental.", name: "L. Achieng", role: "Executive Gala Host" },
  { quote: "We exhaled the moment they took over. Truly rare.", name: "The Otieno Family", role: "Garden Soirée" },
];

export function Testimonials() {
  return (
    <section className="relative bg-espresso text-cream py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">In Their Own Words</h2>
          <div className="mt-5"><GoldenThread width={48} /></div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-charcoal border border-amber-gold/30 p-8"
            >
              <p className="font-display text-2xl leading-snug text-cream/95 italic">
                <TypedFirstLine text={`"${t.quote}"`} delay={i * 0.3} />
              </p>
              <div className="mt-6 flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 1.0 + s * 0.1 }}
                  >
                    <Star className="h-4 w-4 fill-amber-gold text-amber-gold" />
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 1.6 }}
                className="mt-6"
              >
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-amber-gold/80 text-xs uppercase tracking-[0.25em] mt-1">{t.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <a href="#contact" className="thread-link text-amber-gold text-xs uppercase tracking-[0.25em]">
            Read All Stories →
          </a>
        </div>
      </div>
    </section>
  );
}

function TypedFirstLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.05, delay: delay + i * 0.025 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
