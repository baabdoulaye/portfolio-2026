import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectCard from "@/components/ProjectCard";
import HorizontalScroll from "@/components/HorizontalScroll";
import CustomCursor from "@/components/CustomCursor";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdoulaye Ba — Architecte Web & Développeur Full-Stack" },
      {
        name: "description",
        content:
          "Portfolio futuriste d'Abdoulaye Ba, architecte web et développeur full-stack : projets immersifs, interfaces 3D et produits haute performance.",
      },
      { property: "og:title", content: "Abdoulaye Ba — Architecte Web & Développeur Full-Stack" },
      {
        property: "og:description",
        content:
          "Portfolio futuriste : défilement horizontal, environnement 3D interactif et projets full-stack.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndexChange = useCallback((index: number) => setActiveIndex(index), []);
  const explore = () => {
    document
      .getElementById("portfolio-track")
      ?.scrollTo({ left: window.innerWidth * 2, behavior: "smooth" });
  };

  return (
    <main className="relative">
      <CustomCursor />
      <div
        className={`pointer-events-none fixed left-0 top-0 -z-20 h-screen w-screen transition-opacity duration-700 ${
          activeIndex === 1 ? "opacity-0" : "opacity-100"
        }`}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        <div className="absolute inset-0 bg-[image:var(--gradient-vignette)]" />
      </div>

      <header className="pointer-events-none fixed left-0 top-0 z-40 flex w-full items-center justify-between px-8 py-6 md:px-24">
        <span className="font-display text-sm uppercase tracking-[0.4em] text-foreground">
          A. BA
        </span>
      </header>

      <div className="relative z-20 h-dvh overflow-hidden">
        <HorizontalScroll onActiveIndexChange={handleActiveIndexChange}>
          <Hero onExplore={explore} />
          <About active={activeIndex === 1} />
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              active={activeIndex === index + 2}
            />
          ))}
          <Contact />
        </HorizontalScroll>
      </div>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            key={index}
            className={`h-1 transition-all duration-300 ${activeIndex === index ? "w-9 bg-accent" : "w-3 bg-foreground/25"}`}
          />
        ))}
      </div>
    </main>
  );
}
