import { motion } from "framer-motion";

export default function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="hero-universe relative flex h-screen w-screen shrink-0 snap-center items-end overflow-hidden px-6 pb-16 pt-24 md:px-12 md:pb-20 lg:px-20">
      <div className="relative z-10 w-full translate-z-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 border border-accent/60 bg-card/40 px-4 py-2 text-xs font-bold uppercase text-accent backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Portfolio 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="hero-title max-w-[12ch] font-display text-6xl font-bold leading-[0.78] text-foreground sm:text-8xl md:text-9xl"
        >
          <span className="block">ABDOULAYE</span>
          <span className="text-gradient-neon block">BA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 max-w-xl text-lg font-medium text-foreground/80 md:text-2xl"
        >
          Architecte Web &amp; Développeur Full-Stack
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-5"
        >
           <button onClick={onExplore} className="btn-glow" data-cursor-focus>
            Explorer mes projets
          </button>
          <span className="text-xs font-bold uppercase text-muted-foreground">
            Glissez vers la droite →
          </span>
        </motion.div>
      </div>
    </section>
  );
}
