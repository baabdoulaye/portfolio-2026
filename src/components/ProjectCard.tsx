import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import type { Project } from "@/data/projects";
import AnimatedText from "@/components/AnimatedText";

export type { Project };

export default function ProjectCard({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative isolate flex h-dvh w-screen shrink-0 items-center overflow-hidden px-5 py-20 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
      <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="project-card group relative z-10 h-[68vh] w-full max-w-[1500px] overflow-hidden translate-z-0 md:h-[72vh]"
      data-cursor-focus
    >
      <Suspense fallback={<div className="scanlines absolute inset-0" />}>
        <div className={`project-visual project-visual-${index + 1} absolute inset-0 -z-20 opacity-35`} />
        <video
          src={active || hovered ? project.video : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover opacity-0 transition-all duration-1000 ease-out group-hover:scale-100 group-hover:opacity-75"
        />
      </Suspense>

      {/* Overlay de lisibilité (glassmorphism inversé) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/55 to-background/15" />

      <span className="absolute left-5 top-5 z-10 border border-accent/70 bg-background/70 px-3 py-1.5 font-display text-[11px] font-bold text-accent backdrop-blur-md">
        0{index + 1}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10 lg:p-14">
        <p className="mb-3 text-xs font-bold uppercase text-accent">Projet 0{index + 1} / 06</p>
        <h3 className="origin-left font-display text-4xl font-bold leading-none text-foreground sm:text-6xl lg:text-8xl">
          <AnimatedText text={project.title.toUpperCase()} />
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-lg">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag-neon">
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-cta mt-6"
          data-cursor-focus
        >
          Voir le projet <span aria-hidden>↗</span>
        </a>
      </div>
      </motion.article>
    </section>
  );
}
