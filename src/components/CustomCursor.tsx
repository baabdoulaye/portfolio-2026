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

      // 1. Si on survole un élément avec data-cursor-default : on masque le rond et on affiche la main
      const isDefault = Boolean(target.closest("[data-cursor-default]"));
      if (isDefault) {
        setActive(false);
        setShrink(false);
        setVisible(false); // masque le rond custom
        document.documentElement.style.cursor = "pointer";
        return;
      }

      // Remet le curseur système caché pour le reste du site
      document.documentElement.style.cursor = "none";

      // 2. Si l'élément demande un mini curseur
      const isShrink = Boolean(target.closest("[data-cursor-shrink]"));
      if (isShrink) {
        setShrink(true);
        setActive(false);
        return;
      }
      setShrink(false);

      // 3. Grossissement normal pour les autres boutons / liens
      setActive(Boolean(target.closest("a, button, video, [data-cursor-focus]")));
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
