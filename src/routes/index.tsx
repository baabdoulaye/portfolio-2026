import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import HorizontalScroll from "@/components/HorizontalScroll";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export const Route = createFileRoute("/")({
  ssr: false,
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
  const explore = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * 0.42, behavior: "smooth" });
  };

  return (
    <main className="relative bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        <div className="absolute inset-0 bg-[image:var(--gradient-vignette)]" />
      </div>

      <header className="pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-between px-8 py-6 md:px-24">
        <span className="font-display text-sm uppercase tracking-[0.4em] text-foreground">
          A. BA
        </span>
        <span className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          Full-Stack / 3D
        </span>
      </header>

      <div className="relative z-10">
        <HorizontalScroll>
          <Hero onExplore={explore} />
          <Projects />
          <Contact />
        </HorizontalScroll>
      </div>
    </main>
  );
}
