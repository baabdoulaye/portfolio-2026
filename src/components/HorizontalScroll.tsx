import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scrolljacking fluide : le scroll vertical de la page (sur un conteneur
 * très haut) est traduit en translation X d'une piste flex géante.
 */
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const distance = Math.max(vw * (panels.length - 1), 0);
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <div ref={wrapperRef} style={{ height: `${panels.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <motion.div style={{ x, willChange: "transform" }} className="flex h-screen translate-z-0">
          {panels.map((panel, index) => (
            <div key={index} className="h-screen w-screen shrink-0">
              {panel}
            </div>
          ))}
        </motion.div>

        <motion.div
          style={{ scaleX: smooth, willChange: "transform" }}
          className="absolute bottom-0 left-0 z-50 h-1 w-full origin-left bg-[image:var(--gradient-neon)] shadow-[var(--shadow-progress)]"
        />
      </div>
    </div>
  );
}
