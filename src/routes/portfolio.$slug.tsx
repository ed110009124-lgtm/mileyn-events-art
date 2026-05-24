import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PROJECTS, type Project } from "@/data/site";
import { DetailLayout } from "@/components/site/DetailLayout";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.name ?? "Project"} — Mileyn Events` },
      { name: "description", content: loaderData?.project.story ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream text-espresso">
      <div className="text-center">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link to="/" className="mt-6 inline-block text-amber-gold uppercase tracking-[0.25em] text-xs">← Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-cream text-espresso">
      <p>{error.message}</p>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };

  return (
    <DetailLayout eyebrow={project.type} title={project.name} heroImg={project.img}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-amber-gold/30 py-6 text-center">
        <Meta label="Location" value={project.location} />
        <Meta label="Guests" value={project.guests} />
        <Meta label="Date" value={project.date} />
        <Meta label="Type" value={project.type} />
      </div>

      <p className="mt-12 text-lg leading-relaxed text-espresso/85 font-light">{project.story}</p>

      <div className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">Highlights</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="px-4 py-2 border border-amber-gold/40 text-xs uppercase tracking-[0.2em] text-taupe"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6">
        {project.gallery.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`${project.name} ${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        ))}
      </div>

      {project.testimonial && (
        <blockquote className="mt-16 border-l-2 border-amber-gold pl-6 italic font-display text-2xl text-espresso/90">
          "{project.testimonial.quote}"
          <footer className="mt-4 not-italic text-xs uppercase tracking-[0.3em] text-taupe font-sans">
            — {project.testimonial.author}
          </footer>
        </blockquote>
      )}
    </DetailLayout>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">{label}</p>
      <p className="mt-1 font-display text-base">{value}</p>
    </div>
  );
}
