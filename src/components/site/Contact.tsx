import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldenThread } from "./GoldenThread";

const EVENT_TYPES = [
  "Wedding",
  "Corporate Gala",
  "Private Celebration",
  "Destination Event",
  "Other",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPulsing(true);
    setTimeout(() => {
      setSubmitted(true);
      setPulsing(false);
    }, 700);
  };

  return (
    <section id="contact" className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl text-balance">
            Let's Create Something <em className="font-light italic text-amber-gold">Exquisite</em> Together
          </h2>
          <div className="mt-5 flex justify-center"><GoldenThread width={48} /></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mt-16 bg-white p-8 md:p-14 shadow-[0_30px_80px_-40px_rgba(60,42,36,0.3)]"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-x-8 gap-y-6"
              >
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <SelectField label="Event Type" name="eventType" options={EVENT_TYPES} />
                <Field label="Message" name="message" textarea placeholder="Tell us about the experience you envision..." className="md:col-span-2" />

                <div className="md:col-span-2 mt-4">
                  <motion.button
                    type="submit"
                    animate={pulsing ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className="gold-sweep w-full md:w-auto bg-amber-gold text-cream px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors relative overflow-hidden"
                  >
                    Begin Your Vision
                    {pulsing && (
                      <motion.span
                        className="absolute inset-0 bg-amber-gold rounded-full"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 8, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
                className="text-center py-10"
              >
                <p className="font-display text-2xl md:text-3xl text-espresso text-balance leading-snug">
                  Your vision has been received.<br />We'll respond within 24 hours — usually sooner.<br />
                  <em className="text-amber-gold not-italic font-light italic">We're already excited.</em>
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="h-px bg-amber-gold mx-auto mt-8"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-espresso/80"
        >
          {[
            <a key="m" href="mailto:hello@mileynevents.com" className="thread-link">hello@mileynevents.com</a>,
            <a key="p" href="tel:+254726765010" className="thread-link">0726 765010</a>,
            <span key="a">By Appointment Only</span>,
            <span key="r">Western-Nyanza Region</span>,
          ].map((el, i, arr) => (
            <div key={i} className="flex items-center gap-6">
              {el}
              {i < arr.length - 1 && <span className="h-1 w-1 rounded-full bg-amber-gold" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const Cmp = textarea ? "textarea" : "input";
  return (
    <label className={`relative flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-taupe">{label}{required && " *"}</span>
      <Cmp
        name={name}
        type={textarea ? undefined : type}
        required={required}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b border-taupe/30 py-3 text-espresso placeholder:text-taupe/60 focus:outline-none transition-colors resize-none"
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px bg-amber-gold"
        animate={{ width: focused ? "100%" : 0, x: "-50%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="relative flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-taupe">{label}</span>
      <select
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b border-taupe/30 py-3 text-espresso focus:outline-none"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px bg-amber-gold"
        animate={{ width: focused ? "100%" : 0, x: "-50%" }}
        transition={{ duration: 0.3 }}
      />
    </label>
  );
}
