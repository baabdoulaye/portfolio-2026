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
    <section className="relative flex h-dvh w-screen shrink-0 items-center justify-center overflow-hidden px-6 pt-16 pb-12 md:pt-20 md:px-12 lg:px-20">
      {" "}
      {/* 1. Aperçu vidéo dynamique en arrière-plan */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#03050a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.9, scale: 1 }}
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
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-tr from-cyan-950/40 via-purple-950/30 to-black" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Voile sombre d'ambiance pour bien détacher la carte */}
        <div className="pointer-events-none absolute inset-0 bg-black/70" />

        {/* Dégradé doux vertical */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
      </div>
      {/* 2. Contenu central du carrousel */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-between gap-8">
        {/* Entête */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Projets sélectionnés
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
              className="glass-card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6 shadow-2xl backdrop-blur-md md:p-10 h-[400px] md:h-[440px]"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="max-w-2xl">
                  <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-white md:text-6xl line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg line-clamp-3">
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
                </div>

                {/* Bouton Live / Code */}
                <div className="flex items-center gap-4 pt-4">
                  {project.href && (
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
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                      data-cursor-focus
                      aria-label="Voir le code source sur GitHub"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
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
              data-cursor-default
              onClick={prevProject}
              style={{ cursor: "pointer" }}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/15"
              aria-label="Projet précédent"
            >
              ←
            </button>
            <button
              data-cursor-default
              onClick={nextProject}
              style={{ cursor: "pointer" }}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/15"
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
