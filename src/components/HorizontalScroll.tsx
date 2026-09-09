import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Défilement horizontal « cranté » : le scroll vertical est converti en
 * translation X, et le CSS scroll-snap (mandatory) verrouille la vue au
 * centre de chaque panneau.
 */
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 180, damping: 28, mass: 0.35 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = () => {
      const max = Math.max(node.scrollWidth - node.clientWidth, 1);
      progress.set(node.scrollLeft / max);
    };
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      node.scrollBy({ left: event.deltaY, behavior: "smooth" });
    };
    node.addEventListener("scroll", update, { passive: true });
    node.addEventListener("wheel", wheel, { passive: false });
    update();
    return () => {
      node.removeEventListener("scroll", update);
      node.removeEventListener("wheel", wheel);
    };
  }, [progress]);

  return (
    <div ref={containerRef} className="horizontal-stage translate-z-0">
      {panels.map((panel, index) => (
        <div key={index} className="h-screen w-screen shrink-0 snap-center">
          {panel}
        </div>
      ))}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed bottom-0 left-0 z-50 h-1 w-full origin-left bg-[image:var(--gradient-neon)] shadow-[var(--shadow-progress)]"
      />
    </div>
  );
}
