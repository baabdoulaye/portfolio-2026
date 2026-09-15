import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const skills = ["React", "TypeScript", "Three.js", "Node", "Motion", "Architecture"];

export default function About({ active }: { active: boolean }) {
  return (
    <section className="relative isolate flex h-dvh w-screen shrink-0 items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
      <motion.video
        src={active ? "/about-coding.mp4" : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        animate={{ opacity: active ? 0.72 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/95 via-background/75 to-background/25" />

      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[auto_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto lg:mx-0"
          data-cursor-focus
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="photo-frame relative w-[300px] rounded-2xl p-2 md:w-[400px]"
          >
            <img
              src="/ma-photo.jpg"
              alt="Abdoulaye Ba"
              className="h-[380px] w-full rounded-2xl object-cover md:h-[500px]"
              onError={(event) => {
                event.currentTarget.style.opacity = "0";
              }}
            />
            <span className="pointer-events-none absolute inset-2 -z-10 grid place-items-center rounded-2xl bg-card/60 font-display text-2xl font-bold uppercase tracking-widest text-muted-foreground">
              Votre photo
            </span>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-bold uppercase text-accent">02 / À propos</p>
            <h2 className="mt-3 origin-left font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-6xl xl:text-7xl">
              <AnimatedText text="JE CONSTRUIS DES" className="block" />
              <AnimatedText text="EXPÉRIENCES QUI MARQUENT." className="block" />
            </h2>
          </motion.div>

          <p className="max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
            Architecte web et développeur full-stack, je transforme la complexité technique en
            interfaces rapides, immersives et immédiatement lisibles.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="tag-neon">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
