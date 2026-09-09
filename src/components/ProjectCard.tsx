import { motion } from "framer-motion";
import { Suspense } from "react";
import type { Project } from "@/data/projects";

export type { Project };

export default function ProjectCard({
  project,
  index,
  onFocus,
}: {
  project: Project;
  index: number;
  onFocus?: (focused: boolean) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => onFocus?.(true)}
      onHoverEnd={() => onFocus?.(false)}
      className="project-card group relative h-[68vh] min-h-[430px] overflow-hidden translate-z-0"
      data-cursor-focus
    >
      <Suspense fallback={<div className="scanlines h-full w-full" />}>
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={`project-visual project-visual-${index + 1} h-full w-full transition-transform duration-500 ease-out group-hover:scale-105`} />
        )}
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-project)]" />
      <span className="absolute left-5 top-5 border border-accent/70 bg-background/70 px-3 py-1.5 font-display text-[11px] font-bold text-accent backdrop-blur-md">
          0{index + 1}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="text-glow font-display text-4xl font-bold leading-none text-foreground md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
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
