import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const links = [
  { label: "Téléphone", href: "tel:+33 06 51 45 65 36", value: "+33 06 51 45 65 36" },
  { label: "E-mail", href: "abdoulaye_ba@outlook.com", value: "abdoulaye_ba@outlook.com" },
  {
    label: "GitHub",
    href: "https://github.com/baabdoulaye",
    value: "github.com/baabdoulaye",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdoulaye-ba-archhitecte-web/",
    value: "linkedin.com/in/abdoulaye-ba-archhitecte-web/",
  },
];

export default function Contact() {
  const [isCvHovered, setIsCvHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex h-dvh w-screen shrink-0 items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20" />
      <div className="relative z-10 w-full max-w-5xl">
        <p className="mb-4 text-xs font-bold uppercase text-accent">Contact</p>
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
          Egalement ouvert aux missions freelance. Je peux coder corps et âme jusqu'à en mourir de
          soif !
          <br />
          <br />( bon, prévoyez juste une bouteille d'eau ou un espresso pour éviter le drame. )
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
              <span className="mt-2 block truncate font-display text-sm text-foreground md:text-base">
                {l.value}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 inline-flex flex-col items-center"
          onMouseEnter={() => setIsCvHovered(true)}
          onMouseLeave={() => setIsCvHovered(false)}
        >
          <a
            href="/cv_abdoulaye_ba.pdf"
            download
            className="btn-glow inline-flex"
            data-cursor-focus
          >
            Télécharger mon CV
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            (ou survolez pour le visualiser)
          </p>
        </motion.div>
      </div>

      {/* Rendu téléporté hors du slider dans le <body> via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isCvHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
              >
                <div className="relative max-h-[92vh] max-w-[92vw]">
                  <img
                    src="/CV_Abdoulaye_Ba-1.png"
                    alt="Aperçu CV Abdoulaye Ba"
                    className="max-h-[88vh] max-w-[88vw] rounded-xl object-contain shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-cyan-400/30"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
