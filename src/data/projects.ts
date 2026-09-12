export type Project = {
  title: string;
  description: string;
  tags: string[];
  video?: string;
  /** Réplique affichée dans la bulle de dialogue du personnage 3D. */
  line: string;
};

export const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    description:
      "Plateforme d'analytics temps réel : visualisations WebGL, websockets et rendu incrémental.",
    tags: ["React", "TypeScript", "Node", "WebSocket"],
    video: "/project-nebula.mp4",
    line: "Voici Nebula Dashboard, mon analytics temps réel en WebGL !",
  },
  {
    title: "Orbit Commerce",
    description:
      "E-commerce headless haute performance, checkout optimisé et rendu côté serveur edge.",
    tags: ["Next", "Stripe", "Docker", "Redis"],
    video: "/project-orbit.mp4",
    line: "Orbit Commerce : une architecture e-commerce headless ultra rapide.",
  },
  {
    title: "Synapse AI",
    description:
      "Assistant conversationnel multimodal avec pipeline RAG et interface immersive 3D.",
    tags: ["React", "Python", "LLM", "Three.js"],
    video: "/project-synapse.mp4",
    line: "Synapse AI, un assistant multimodal avec pipeline RAG.",
  },
  {
    title: "Pulse Studio",
    description:
      "Expérience créative WebGL où typographie, son et mouvement composent une identité en temps réel.",
    tags: ["R3F", "GLSL", "Motion", "Audio"],
    video: "/project-pulse.mp4",
    line: "Pulse Studio transforme le mouvement et le son en identité vivante.",
  },
  {
    title: "Atlas Cloud",
    description:
      "Console d'infrastructure distribuée pensée pour surveiller, comparer et piloter les systèmes critiques.",
    tags: ["TypeScript", "Cloud", "Data", "UX"],
    video: "/project-atlas.mp4",
    line: "Atlas Cloud rend les infrastructures complexes immédiatement lisibles.",
  },
  {
    title: "Vanta Lab",
    description:
      "Laboratoire digital immersif mêlant narration interactive, modèles 3D et transitions cinématiques.",
    tags: ["Three.js", "React", "Cinema 4D", "WebGL"],
    video: "/project-vanta.mp4",
    line: "Vanta Lab est mon terrain d'expérimentation 3D et narrative.",
  },
];

/** Texte de la bulle pour chaque panneau (Hero, projets…, Contact). */
export const panelLines: string[] = [
  "Salut ! Je suis Abdoulaye. Scrolle pour visiter mes projets 🚀",
  ...projects.map((p) => p.line),
  "On construit quelque chose ensemble ? Mes liens sont juste là !",
];
