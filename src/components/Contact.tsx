import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const links = [
  { label: "Téléphone", href: "tel:+33000000000", value: "+33 • •• •• •• ••" },
  { label: "E-mail", href: "mailto:contact@example.com", value: "contact@example.com" },
  { label: "GitHub", href: "https://github.com/", value: "github.com/abdoulaye" },
  { label: "LinkedIn", href: "https://linkedin.com/", value: "linkedin.com/in/abdoulaye" },
];

export default function Contact() {
  return (
    <section className="relative flex h-dvh w-screen shrink-0 items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20" />
      <div className="relative z-10 w-full max-w-5xl">
        <p className="mb-4 text-xs font-bold uppercase text-accent">09 / Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="origin-left font-display text-5xl font-bold text-foreground md:text-7xl lg:text-8xl"
        >
          <AnimatedText text="Construisons la suite." />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Disponible pour des missions freelance, des collaborations et des produits numériques ambitieux.
        </motion.p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="glass-card block min-w-0 p-5"
              data-cursor-focus
            >
              <span className="text-[10px] font-bold uppercase text-accent">{l.label}</span>
              <span className="mt-2 block truncate font-display text-sm text-foreground md:text-base">{l.value}</span>
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
          <a href="/cv.pdf" download className="btn-glow inline-flex" data-cursor-focus>
            Télécharger mon CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
