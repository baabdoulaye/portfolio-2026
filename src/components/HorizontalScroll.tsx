import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { scrollProgress } from "./Scene3D";

/**
 * Convertit le scroll vertical en défilement horizontal fluide.
 * La page réserve une hauteur égale à la largeur du rail, le rail est fixé
 * à l'écran et translaté sur X avec un ressort (buttery smooth).
 */
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  useMotionValueEvent(smooth, "change", (v) => {
    scrollProgress.current = v;
  });

  return (
    <div style={{ height: `${distance + (typeof window !== "undefined" ? window.innerHeight : 0)}px` }}>
      <div className="fixed inset-0 overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-screen w-max will-change-transform">
          {children}
        </motion.div>
      </div>

      {/* barre de progression néon */}
      <motion.div
        style={{ scaleX: smooth }}
        className="fixed bottom-0 left-0 z-30 h-[2px] w-full origin-left bg-[image:var(--gradient-neon)]"
      />
    </div>
  );
}
