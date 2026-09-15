import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const characters = text.split("");

  return (
    <span
      className={className}
      aria-label={text}
      onMouseLeave={() => setHoveredIndex(null)}
      data-cursor-focus
    >
      {characters.map((character, index) => {
        const distance = hoveredIndex === null ? Number.POSITIVE_INFINITY : Math.abs(hoveredIndex - index);
        const scale = distance === 0 ? 1.3 : distance === 1 ? 1.1 : 1;

        return (
          <motion.span
            key={`${character}-${index}`}
            aria-hidden="true"
            className="animated-letter inline-block origin-center"
            animate={{
              scale,
              color: distance === 0 ? "var(--letter-highlight)" : "var(--foreground)",
              y: distance === 0 ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22, mass: 0.55 }}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        );
      })}
    </span>
  );
}