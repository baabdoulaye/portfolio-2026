import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

export default function ProjectPanel({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="flex h-screen w-screen shrink-0 items-center justify-center gap-10 px-8 md:px-20">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="hidden w-[24vw] shrink-0 lg:block"
      >
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          0{index + 1} / 0{total} — Travaux
        </p>
        <h2 className="text-glow mt-4 font-display text-5xl font-bold leading-tight text-foreground">
          Projets <span className="text-gradient-neon">sélectionnés</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Des produits pensés pour la vitesse, la clarté et l&apos;émotion visuelle.
        </p>
      </motion.div>

      <ProjectCard project={project} index={index} />
    </section>
  );
}
