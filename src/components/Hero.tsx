import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";

const MotionButton = motion.create(Button);

export default function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="relative flex h-dvh w-screen shrink-0 items-end overflow-hidden px-6 pb-16 pt-24 md:px-12 md:pb-20 lg:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      <div className="relative z-10 w-full translate-z-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 border border-accent/60 bg-card/40 px-4 py-2 text-xs font-bold uppercase text-accent backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {/* Portfolio 2026 */}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="hero-title max-w-full origin-left font-display text-[11vw] xs:text-5xl font-bold leading-[0.85] text-foreground sm:text-8xl md:text-9xl tracking-tight"
        >
          <AnimatedText text="ABDOULAYE" className="block whitespace-nowrap" />
          <AnimatedText text="BA" className="block whitespace-nowrap" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 max-w-2xl"
        >
          <p className="text-lg font-semibold text-foreground md:text-2xl">
            Architecte Web &amp; Développeur Full-Stack
          </p>
          <p className="mt-2 text-base text-foreground/80 md:text-lg">
            Je transforme vos visions en interfaces web tellement fluides qu'on en croirait de la
            magie.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-5"
        >
          <MotionButton
            onClick={onExplore}
            className="btn-glow h-auto"
            data-cursor-focus
            whileHover={{ scaleX: 1.045, scaleY: 1.025 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 170, damping: 20, mass: 0.75 }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 18px var(--letter-highlight)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Explorer mes projets
            </motion.span>
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
}
