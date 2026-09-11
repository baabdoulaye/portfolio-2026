import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <section className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden px-6 pb-10 pt-20 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/90 to-transparent" />
      <motion.div
        animate={{ opacity: focused === null ? 0 : 0.55 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-10 bg-background"
      />

      <div className="relative z-20 mb-6 flex shrink-0 items-end justify-between gap-8">
        <div>
          <p className="text-xs font-bold uppercase text-accent">03 / Projets</p>
          <h2 className="mt-1 font-display text-4xl font-bold leading-none text-foreground md:text-6xl">
            SELECTED <span className="text-gradient-neon">WORK</span>
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm text-muted-foreground lg:block">
          Interfaces, systèmes et produits numériques conçus pour sortir du cadre.
        </p>
      </div>

      <div className="relative z-20 grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`min-h-0 transition-all duration-300 ${
              focused !== null && focused !== index ? "scale-[0.98] opacity-50" : "opacity-100"
            }`}
          >
            <ProjectCard
              project={project}
              index={index}
              onFocus={(value) => setFocused(value ? index : null)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
