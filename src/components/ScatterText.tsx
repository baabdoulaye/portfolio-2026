import { motion } from "framer-motion";

type ScatterTextProps = {
  text: string;
  className?: string;
  by?: "letters" | "words";
};

function offset(index: number, axis: "x" | "y") {
  const seed = axis === "x" ? 17 : 29;
  return ((index * seed) % 19) - 9;
}

export default function ScatterText({ text, className, by = "letters" }: ScatterTextProps) {
  const pieces = by === "words" ? text.split(" ") : Array.from(text);

  return (
    <motion.span initial="rest" whileHover="scatter" className={className} data-cursor-focus>
      {pieces.map((piece, index) => (
        <motion.span
          key={`${piece}-${index}`}
          aria-hidden
          className="inline-block"
          variants={{
            rest: { x: 0, y: 0, rotate: 0 },
            scatter: {
              x: offset(index, "x"),
              y: offset(index, "y"),
              rotate: offset(index + 3, "x") * 0.65,
              transition: { type: "spring", stiffness: 520, damping: 20, mass: 0.45 },
            },
          }}
        >
          {piece === " " ? "\u00a0" : piece}
          {by === "words" && index < pieces.length - 1 ? "\u00a0" : null}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}