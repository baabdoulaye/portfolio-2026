import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 520, damping: 34, mass: 0.25 });
  const y = useSpring(pointerY, { stiffness: 520, damping: 34, mass: 0.25 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX - 42);
      pointerY.set(event.clientY - 42);
      setVisible(true);
    };
    const over = (event: PointerEvent) => {
      const target = event.target;
      setActive(target instanceof Element && Boolean(target.closest("a, button, video, [data-cursor-focus]")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      animate={{ scale: active ? 1.65 : 1, opacity: visible ? 1 : 0 }}
      transition={{ scale: { type: "spring", stiffness: 360, damping: 24 }, opacity: { duration: 0.18 } }}
      className="custom-cursor"
    />
  );
}