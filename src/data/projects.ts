export type Project = {
  title: string;
  description: string;
  tags: string[];
  video?: string;
  href: string;
  line: string;
};

export const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    description:
      "Plateforme d'analytics temps réel : visualisations WebGL, websockets et rendu incrémental.",
    tags: ["React", "TypeScript", "Node", "WebSocket"],
    video: "/project-nebula.mp4",
    href: "https://github.com/",
    line: "Voici Nebula Dashboard, mon analytics temps réel en WebGL !",
  },
  {
    title: "Orbit Commerce",
    description:
      "E-commerce headless haute performance, checkout optimisé et rendu côté serveur edge.",
    tags: ["Next", "Stripe", "Docker", "Redis"],
    video: "/project-orbit.mp4",
    href: "https://github.com/",
    line: "Orbit Commerce : une architecture e-commerce headless ultra rapide.",
  },
  {
    title: "Synapse AI",
    description:
      "Assistant conversationnel multimodal avec pipeline RAG et interface immersive 3D.",
    tags: ["React", "Python", "LLM", "Three.js"],
    video: "/project-synapse.mp4",
    href: "https://github.com/",
    line: "Synapse AI, un assistant multimodal avec pipeline RAG.",
  },
  {
    title: "Pulse Studio",
    description:
      "Expérience créative WebGL où typographie, son et mouvement composent une identité en temps réel.",
    tags: ["R3F", "GLSL", "Motion", "Audio"],
    video: "/project-pulse.mp4",
    href: "https://github.com/",
    line: "Pulse Studio transforme le mouvement et le son en identité vivante.",
  },
  {
    title: "Atlas Cloud",
    description:
      "Console d'infrastructure distribuée pensée pour surveiller, comparer et piloter les systèmes critiques.",
    tags: ["TypeScript", "Cloud", "Data", "UX"],
    video: "/project-atlas.mp4",
    href: "https://github.com/",
    line: "Atlas Cloud rend les infrastructures complexes immédiatement lisibles.",
  },
];

/** Texte de la bulle pour les 4 grands panneaux du portfolio */
export const panelLines: string[] = [
  "Salut ! Je suis Abdoulaye. Scrolle pour visiter mes projets 🚀",
  "Je conçois des architectures solides et des interfaces qui marquent.",
  "Explore mes projets récents ! Utilise les flèches pour changer de projet.",
  "On construit quelque chose ensemble ? Mes liens sont juste là !",
];
