import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsCarousel({ active }: { active: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const project = projects[currentIndex];

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Navigation clavier locale quand la section est active
  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  if (!project) return null;

  return (
    <section className="relative flex h-dvh w-screen shrink-0 items-center justify-center overflow-hidden px-6 py-16 md:px-12 lg:px-20">
      {/* 1. Aperçu vidéo dynamique en arrière-plan */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#03050a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.38, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-tr from-cyan-950/40 via-purple-950/30 to-black" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dégradés d'ambiance et lisibilité */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/80" />
      </div>

      {/* 2. Contenu central du carrousel */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-between gap-8">
        {/* Entête */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            03 / Projets sélectionnés
          </p>
          <span className="font-mono text-sm text-muted-foreground">
            <strong className="text-foreground">0{currentIndex + 1}</strong> / 0{projects.length}
          </span>
        </div>

        {/* Flottaison continue optimisée GPU */}
        <motion.div
          animate={active ? { y: [0, -12, 0] } : { y: 0 }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="w-full transform-gpu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-md md:p-12"
            >
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Projet 0{currentIndex + 1}
                </span>
                <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-neon rounded-full px-3 py-1 text-xs font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bouton Live / Code */}
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2"
                    data-cursor-focus
                  >
                    <span>Voir le projet</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 3. Barre de navigation & sélecteur */}
        <div className="flex items-center justify-between pt-2">
          {/* Indicateurs / Puces */}
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 bg-accent shadow-[0_0_12px_var(--color-accent)]"
                    : "w-3 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Aller au projet ${idx + 1}`}
                data-cursor-focus
              />
            ))}
          </div>

          {/* Boutons Suivant / Précédent */}
          <div className="flex items-center gap-3">
            <button
              data-cursor-shrink
              onClick={prevProject}
              style={{ cursor: "none" }}
              className="flex h-11 w-11 cursor-none items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/15"
              aria-label="Projet précédent"
            >
              ←
            </button>
            <button
              data-cursor-shrink
              onClick={nextProject}
              style={{ cursor: "none" }}
              className="flex h-11 w-11 cursor-none items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/15"
              aria-label="Projet suivant"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
