import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";

const TEAM = [
  { name: "Sarah", role: "The Vision Weaver", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=70" },
  { name: "Michael", role: "The Calm Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=70" },
  { name: "Amara", role: "The Floral Poet", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=70" },
  { name: "David", role: "The Production Maestro", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70" },
];

export function Team() {
  return (
    <section id="team" className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">Meet The Curators</h2>
          <div className="mt-5"><GoldenThread width={48} /></div>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: "center" }}
              className="text-center"
            >
              <div className="aspect-[3/4] overflow-hidden bg-champagne mb-4 saturate-[0.9]">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-display text-xl text-espresso">{m.name}</h3>
              <p className="text-amber-gold text-xs uppercase tracking-[0.25em] mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="thread-link text-amber-gold text-xs uppercase tracking-[0.25em]">
            Meet The Full Team →
          </a>
        </div>
      </div>
    </section>
  );
}
