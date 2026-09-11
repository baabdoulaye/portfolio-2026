import { motion } from "framer-motion";

const links = [
  { label: "GitHub", href: "https://github.com/", hint: "Code & open source" },
  { label: "LinkedIn", href: "https://linkedin.com/", hint: "Parcours & réseau" },
  { label: "Email", href: "mailto:contact@example.com", hint: "Parlons de votre projet" },
];

export default function Contact() {
  return (
    <section className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden px-8 md:px-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      <div className="relative z-10 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl"
        >
          Construisons <span className="text-gradient-neon">la suite</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Développeur full-stack passionné par les interfaces immersives, la performance et
          l'architecture logicielle. Disponible pour des missions freelance et des collaborations.
        </motion.p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="glass-card block p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="font-display text-lg text-foreground">{l.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{l.hint}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <a href="/cv.pdf" download className="btn-glow inline-block">
            Télécharger mon CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
