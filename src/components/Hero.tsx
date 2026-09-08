import { motion } from "framer-motion";

export default function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-8 md:px-24">
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.32em] text-accent backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Portfolio 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-glow font-display text-6xl font-bold leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          ABDOULAYE
          <br />
          <span className="text-gradient-neon">BA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 max-w-lg text-lg text-muted-foreground md:text-xl"
        >
          Architecte Web &amp; Développeur Full-Stack
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <button onClick={onExplore} className="btn-glow">
            Explorer mes projets
          </button>
          <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Scroll →
          </span>
        </motion.div>
      </div>
    </section>
  );
}
