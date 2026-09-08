import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  video?: string;
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group w-[78vw] shrink-0 overflow-hidden sm:w-[52vw] lg:w-[30vw]"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-secondary/40">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="scanlines h-full w-full bg-[image:var(--gradient-neon)] opacity-30" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-fade)]" />
      </div>

      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 text-[11px] uppercase tracking-widest text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
