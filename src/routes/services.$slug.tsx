import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SERVICES, type Service } from "@/data/site";
import { DetailLayout } from "@/components/site/DetailLayout";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name ?? "Service"} — Mileyn Events` },
      { name: "description", content: loaderData?.service.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream text-espresso">
      <div className="text-center">
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/" className="mt-6 inline-block text-amber-gold uppercase tracking-[0.25em] text-xs">← Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => {
    console.error("Services route error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-espresso px-6">
        <p className="text-center font-display text-xl">
          Something went wrong. Please try again or return home.
        </p>
      </div>
    );
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };

  return (
    <DetailLayout eyebrow="Service" title={service.name} heroImg={service.img}>
      <p className="font-display italic text-2xl md:text-3xl text-amber-gold font-light text-balance">
        {service.tagline}
      </p>
      <p className="mt-8 text-lg leading-relaxed text-espresso/85 font-light">{service.intro}</p>

      <div className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl">What's Included</h2>
        <ul className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-3">
          {service.whatsIncluded.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-3 text-espresso/85"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-gold" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl">Our Process</h2>
        <ol className="mt-8 space-y-8">
          {service.process.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 items-start"
            >
              <span className="font-display text-3xl text-amber-gold leading-none w-12">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-espresso/80 font-light leading-relaxed">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-16 border-t border-amber-gold/30 pt-8 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-taupe">Investment</p>
          <p className="font-display text-3xl mt-1 text-amber-gold">{service.starting}</p>
        </div>
        <p className="text-sm italic text-taupe max-w-sm">{service.signature}</p>
      </div>
    </DetailLayout>
  );
}
