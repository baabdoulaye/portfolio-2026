import { motion } from "framer-motion";

const skills = ["React", "TypeScript", "Three.js", "Node", "Motion", "Architecture"];

export default function About() {
  return (
    <section className="about-universe relative flex h-screen w-screen shrink-0 snap-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
      <div className="about-grid relative z-10 grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.figure
          initial={{ opacity: 0, y: 80, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          animate={{ y: [0, -12, 0] }}
          className="about-photo group relative min-h-0 overflow-hidden"
          data-cursor-focus
        >
          <div className="absolute inset-0 grid place-items-center font-display text-7xl font-bold text-about-muted md:text-9xl">
            PHOTO
          </div>
          <img
            src="/photo.jpg"
            alt="Portrait d’Abdoulaye Ba"
            className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <figcaption className="absolute bottom-5 left-5 bg-about px-4 py-2 text-xs font-bold uppercase text-about-foreground">
            Portrait / 2026
          </figcaption>
        </motion.figure>

        <div className="flex min-h-0 flex-col justify-between py-1 lg:py-4">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.45 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-bold uppercase text-about-accent">02 / À propos</p>
            <h2 className="mt-4 max-w-5xl font-display text-5xl font-bold leading-[0.9] text-about-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
              JE CONSTRUIS DES EXPÉRIENCES QUI <span className="text-about-accent">MARQUENT.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <p className="max-w-2xl text-base font-medium leading-relaxed text-about-foreground md:text-xl">
              Architecte web et développeur full-stack, je transforme la complexité technique en
              interfaces rapides, immersives et immédiatement lisibles.
            </p>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {skills.map((skill) => (
                <span key={skill} className="about-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}