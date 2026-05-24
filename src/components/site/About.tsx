import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";
import aboutImg from "@/assets/about-editorial.jpg";

const BULLETS = [
  "Curated Design",
  "Precision Planning",
  "Seamless Execution",
  "Lasting Impressions",
];

export function About() {
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
            Exquisite Is Not A Word.<br />
            <em className="font-light italic text-amber-gold">It's Our Standard.</em>
          </h2>
          <div className="mt-6"><GoldenThread width={48} /></div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with silk reveal */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.img
              src={aboutImg}
              alt="Hands arranging white peonies on marble"
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
            <p className="text-lg leading-relaxed font-light">
              At Mileyn Events, we don't plan parties. We compose experiences. Every detail — from the weight of the cutlery to the angle of the lighting — is considered, refined, and executed with quiet precision.
            </p>
            <p className="text-lg leading-relaxed font-light">
              We've learned that true luxury isn't loud. It's the pause between moments. The breath a guest takes when they first enter a room. The silence before applause. We design for that silence.
            </p>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
              {BULLETS.map((b) => (
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
