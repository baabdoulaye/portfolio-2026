import { motion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    description:
      "Plateforme d'analytics temps réel : visualisations WebGL, websockets et rendu incrémental.",
    tags: ["React", "TypeScript", "Node", "WebSocket"],
  },
  {
    title: "Orbit Commerce",
    description:
      "E-commerce headless haute performance, checkout optimisé et rendu côté serveur edge.",
    tags: ["Next", "Stripe", "Docker", "Redis"],
  },
  {
    title: "Synapse AI",
    description:
      "Assistant conversationnel multimodal avec pipeline RAG et interface immersive 3D.",
    tags: ["React", "Python", "LLM", "Three.js"],
  },
];

export default function Projects() {
  return (
    <section className="flex h-screen shrink-0 items-center gap-8 px-8 md:gap-12 md:px-24">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-[60vw] shrink-0 sm:w-[34vw] lg:w-[22vw]"
      >
        <p className="text-xs uppercase tracking-[0.32em] text-accent">02 — Travaux</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
          Projets <span className="text-gradient-neon">sélectionnés</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Des produits pensés pour la vitesse, la clarté et l'émotion visuelle.
        </p>
      </motion.div>

      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
    </section>
  );
}
