import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Children, useEffect, useRef, type ReactNode } from "react";
import { motionState, setUiState } from "@/lib/scroll-store";

/**
 * Défilement horizontal « cranté » : le scroll vertical est converti en
 * translation X, et le CSS scroll-snap (mandatory) verrouille la vue au
 * centre de chaque panneau.
 */
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const count = Math.max(panels.length, 1);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);
  const velocity = useVelocity(smooth);

  const skidTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tadaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const running = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add("snap-page");
    return () => {
      document.documentElement.classList.remove("snap-page");
      if (skidTimer.current) clearTimeout(skidTimer.current);
      if (tadaTimer.current) clearTimeout(tadaTimer.current);
    };
  }, []);

  useMotionValueEvent(smooth, "change", (v) => {
    motionState.progress = v;
    setUiState({ index: Math.round(v * (count - 1)) });
  });

  useMotionValueEvent(velocity, "change", (v) => {
    motionState.velocity = v;
    const moving = Math.abs(v) > 0.03;

    if (moving) {
      if (skidTimer.current) clearTimeout(skidTimer.current);
      if (tadaTimer.current) clearTimeout(tadaTimer.current);
      if (!running.current) {
        running.current = true;
        setUiState({ phase: "run" });
      }
      return;
    }

    if (running.current && !skidTimer.current) {
      skidTimer.current = setTimeout(() => {
        running.current = false;
        skidTimer.current = null;
        setUiState({ phase: "skid" });
        tadaTimer.current = setTimeout(() => setUiState({ phase: "tada" }), 650);
      }, 90);
    }
  });

  return (
    <div>
      {/* Piste horizontale fixée à l'écran */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div style={{ x }} className="pointer-events-auto flex h-screen w-max will-change-transform">
          {panels.map((panel, i) => (
            <div key={i} className="h-screen w-screen shrink-0">
              {panel}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Points d'ancrage verticaux : un par panneau (scroll-snap) */}
      {panels.map((_, i) => (
        <div key={i} className="h-screen w-full snap-start" aria-hidden />
      ))}

      {/* barre de progression néon */}
      <motion.div
        style={{ scaleX: smooth }}
        className="fixed bottom-0 left-0 z-30 h-[3px] w-full origin-left bg-[image:var(--gradient-neon)] shadow-[0_0_18px_var(--neon-cyan),0_0_36px_var(--neon-magenta)]"
      />
    </div>
  );
}
