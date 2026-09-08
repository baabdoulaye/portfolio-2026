import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export type { Project };

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="neon-card group w-[86vw] max-w-xl overflow-hidden sm:w-[62vw] lg:w-[34vw]"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-secondary/40">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="scanlines h-full w-full bg-[image:var(--gradient-neon)] opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-fade)]" />
        <span className="absolute left-4 top-4 rounded-full border border-accent/50 bg-background/60 px-3 py-1 font-display text-[11px] tracking-[0.28em] text-accent backdrop-blur-md">
          0{index + 1}
        </span>
      </div>

      <div className="p-7">
        <h3 className="text-glow font-display text-3xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag-neon">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
