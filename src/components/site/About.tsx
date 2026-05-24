import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";
import { useContent } from "@/lib/content";

export function About() {
  const c = useContent().about;
  return (
    <section id="about" className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-6xl text-balance leading-tight">
            {c.headingTop}<br />
            <em className="font-light italic text-amber-gold">{c.headingEm}</em>
          </h2>
          <div className="mt-6"><GoldenThread width={48} /></div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.img
              src={c.image}
              alt="Mileyn Events"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
              variants={{ hidden: { scale: 1.08 }, show: { scale: 1 } }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-cream"
              variants={{ hidden: { y: 0 }, show: { y: "-100%" } }}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6 text-espresso/90"
          >
            <p className="text-lg leading-relaxed font-light">{c.p1}</p>
            <p className="text-lg leading-relaxed font-light">{c.p2}</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <span className="h-1 w-1 rounded-full bg-amber-gold" />
                  <span className="tracking-wide">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
