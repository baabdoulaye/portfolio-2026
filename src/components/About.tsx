import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const skills = [
  "React",
  "NodeJS",
  "MongoDB",
  "Tailwind",
  "UX/UI Design",
  "Architecture",
  "Docker",
  "SQL",
  "Jenkins",
  "Prometheus",
  "Grafana",
];

function GlowingWavesCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Vélocité, inertie et coordonnées physiques du curseur
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      vx: 0,
      vy: 0,
      speed: 0,
      radius: 420,
    };

    let lastMouseX = width * 0.5;
    let lastMouseY = height * 0.5;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
      }
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);

    // Vagues massives avec viscosité et teintes néon lumineuses
    const waves = [
      {
        yBase: 0.44,
        amp: 410,
        freq: 0.0009,
        speed: 0.016,
        viscosity: 0.85,
        glowColor: "rgba(168, 85, 247, 0.75)", // Violet électrique saturé
        coreColor: "#f472b6", // Rose néon
        gradTop: "rgba(147, 51, 234, 0.65)",
        gradBot: "rgba(59, 130, 246, 0.0)",
        crestThickness: 16,
      },
      {
        yBase: 0.55,
        amp: 460,
        freq: 0.00075,
        speed: 0.012,
        viscosity: 1.15,
        glowColor: "rgba(6, 182, 212, 0.8)", // Cyan perçant ultra lumineux
        coreColor: "#99f6e4", // Menthe / blanc au cœur
        gradTop: "rgba(14, 165, 233, 0.7)",
        gradBot: "rgba(147, 51, 234, 0.0)",
        crestThickness: 20,
      },
      {
        yBase: 0.5,
        amp: 390,
        freq: 0.00115,
        speed: 0.02,
        viscosity: 0.95,
        glowColor: "rgba(236, 72, 153, 0.75)", // Magenta vibrant
        coreColor: "#ffffff", // Blanc pur incandescent
        gradTop: "rgba(219, 39, 119, 0.6)",
        gradBot: "rgba(15, 23, 42, 0.0)",
        crestThickness: 14,
      },
    ];

    // Particules de pétillement/écume générées par les gestes vifs
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
    }[] = [];

    const updateParticles = () => {
      if (mouse.speed > 4 && particles.length < 55) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 60,
          y: mouse.y + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 4 + mouse.vx * 0.1,
          vy: (Math.random() - 0.5) * 4 + mouse.vy * 0.1,
          alpha: 1,
          size: Math.random() * 2.8 + 1.2,
          color: Math.random() > 0.5 ? "#38bdf8" : "#c084fc",
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.024;
        if (p.alpha <= 0) particles.splice(i, 1);
      }
    };

    let t = 0;

    const render = () => {
      // Détection de vélocité
      mouse.vx = mouse.targetX - lastMouseX;
      mouse.vy = mouse.targetY - lastMouseY;
      mouse.speed = Math.hypot(mouse.vx, mouse.vy);
      lastMouseX = mouse.targetX;
      lastMouseY = mouse.targetY;

      // Inertie douce
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      updateParticles();

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#030408";
      ctx.fillRect(0, 0, width, height);

      // Mode d'addition lumineuse
      ctx.globalCompositeOperation = "screen";

      // Halo ambiant volumétrique réactif
      const auraRadius = Math.min(width * 0.65, 250 + mouse.speed * 8);
      const bgGlow = ctx.createRadialGradient(mouse.x, mouse.y, 30, mouse.x, mouse.y, auraRadius);
      bgGlow.addColorStop(0, "rgba(124, 58, 237, 0.22)");
      bgGlow.addColorStop(0.4, "rgba(14, 165, 233, 0.1)");
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      waves.forEach((w) => {
        const baseCy = height * w.yBase;
        const points: { x: number; y: number }[] = [];

        const step = 26;
        for (let x = -60; x <= width + 60; x += step) {
          const baseWaveY =
            baseCy +
            Math.sin(x * w.freq + t * w.speed) * w.amp +
            Math.cos(x * (w.freq * 0.5) - t * (w.speed * 0.7)) * (w.amp * 0.35);

          const dx = x - mouse.x;
          const dy = baseWaveY - mouse.y;
          const distToMouse = Math.hypot(dx, dy);

          let finalX = x;
          let finalY = baseWaveY;

          if (distToMouse < mouse.radius) {
            const normDist = distToMouse / mouse.radius;
            const bell = Math.cos((normDist * Math.PI) / 2);

            // Onde d'ondulation concentrique (ripple)
            const ripple = Math.sin(normDist * Math.PI * 3 - t * 0.08) * 35 * bell;

            // Déformation dynamique indexée sur la vélocité
            const dynamicImpulse = Math.min(mouse.speed * 1.8, 90) * bell;
            const angle = Math.atan2(dy, dx);

            finalX += Math.cos(angle) * (ripple * 0.4 + dynamicImpulse * 0.3) * w.viscosity;
            finalY +=
              (Math.sin(angle) * ripple + (mouse.y - baseWaveY) * bell * 0.65) * w.viscosity;
          }

          points.push({ x: finalX, y: finalY });
        }

        const firstPt = points[0];
        const lastPt = points[points.length - 1];
        if (!firstPt || !lastPt) return;

        // --- Remplissage de la vague avec interpolation par courbes de Bézier ---
        ctx.beginPath();
        ctx.moveTo(firstPt.x, height);
        ctx.lineTo(firstPt.x, firstPt.y);

        for (let i = 0; i < points.length - 1; i++) {
          const ptA = points[i];
          const ptB = points[i + 1];
          if (!ptA || !ptB) continue;
          const xc = (ptA.x + ptB.x) / 2;
          const yc = (ptA.y + ptB.y) / 2;
          ctx.quadraticCurveTo(ptA.x, ptA.y, xc, yc);
        }

        ctx.lineTo(lastPt.x, lastPt.y);
        ctx.lineTo(lastPt.x, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseCy - w.amp, 0, height);
        grad.addColorStop(0, w.gradTop);
        grad.addColorStop(0.4, "rgba(59, 130, 246, 0.35)");
        grad.addColorStop(0.8, w.gradBot);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fill();

        // --- Crête : Passe 1 (Large lueur diffuse liquide) ---
        ctx.beginPath();
        ctx.moveTo(firstPt.x, firstPt.y);

        for (let i = 0; i < points.length - 1; i++) {
          const ptA = points[i];
          const ptB = points[i + 1];
          if (!ptA || !ptB) continue;
          const xc = (ptA.x + ptB.x) / 2;
          const yc = (ptA.y + ptB.y) / 2;
          ctx.quadraticCurveTo(ptA.x, ptA.y, xc, yc);
        }

        ctx.lineWidth = w.crestThickness;
        ctx.strokeStyle = w.glowColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // --- Crête : Passe 2 (Cœur incandescent ultra net) ---
        ctx.lineWidth = 3.2;
        ctx.strokeStyle = w.coreColor;
        ctx.stroke();
      });

      // Particules lumineuses
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color === "#38bdf8" ? "56, 189, 248" : "192, 132, 252"}, ${p.alpha})`;
        ctx.fill();
      });

      // Point focal sous le curseur
      const impactBeam = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      impactBeam.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      impactBeam.addColorStop(0.3, "rgba(14, 165, 233, 0.22)");
      impactBeam.addColorStop(0.7, "rgba(168, 85, 247, 0.1)");
      impactBeam.addColorStop(1, "transparent");
      ctx.fillStyle = impactBeam;
      ctx.fillRect(0, 0, width, height);

      t += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-[#030408] will-change-transform"
    />
  );
}

export default function About({ active }: { active: boolean }) {
  return (
    <section className="relative isolate flex h-dvh w-screen shrink-0 items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
      {/* Vagues dynamiques optimisées */}
      <GlowingWavesCanvas active={active} />

      {/* Dégradé de lisibilité pour le texte et la photo */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/60 to-transparent" />

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
              src="/photo_de_profil.jpg"
              alt="Abdoulaye Ba"
              className="h-[380px] w-full rounded-2xl object-cover md:h-125"
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
            <p className="text-sm font-bold uppercase text-accent">À propos</p>
            <h2 className="mt-3 origin-left font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-6xl xl:text-7xl">
              <AnimatedText text="JE CONSTRUIS DES" className="block" />
              <AnimatedText text="EXPÉRIENCES QUI MARQUENT." className="block" />
            </h2>
          </motion.div>

          <p className="max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
            Bac+5 en poche. Actuellement disponible et résolu à viser l'excellence technique pour
            des projets qui marquent les esprits !
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
