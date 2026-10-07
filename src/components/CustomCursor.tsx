import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 520, damping: 34, mass: 0.25 });
  const y = useSpring(pointerY, { stiffness: 520, damping: 34, mass: 0.25 });
  const [active, setActive] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX - 42);
      pointerY.set(event.clientY - 42);
      setVisible(true);
    };

    const over = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Si on survole un élément avec data-cursor-shrink : petit rond et curseur système invisible
      const isShrink = Boolean(target.closest("[data-cursor-shrink]"));
      if (isShrink) {
        setShrink(true);
        setActive(false);
        document.documentElement.style.cursor = "none";
        return;
      }
      setShrink(false);

      // Grossissement normal pour les autres boutons/liens
      setActive(Boolean(target.closest("a, button, video, [data-cursor-focus]")));
      document.documentElement.style.cursor = "none";
    };

    const leave = () => {
      setVisible(false);
      document.documentElement.style.cursor = "";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.style.cursor = "";
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      animate={{
        scale: shrink ? 0.35 : active ? 1.72 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 360, damping: 24 },
        opacity: { duration: 0.15 },
      }}
      className="custom-cursor pointer-events-none"
    />
  );
}
