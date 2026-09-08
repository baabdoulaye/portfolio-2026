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
    line: "Voici Nebula Dashboard, mon analytics temps réel en WebGL !",
  },
  {
    title: "Orbit Commerce",
    description:
      "E-commerce headless haute performance, checkout optimisé et rendu côté serveur edge.",
    tags: ["Next", "Stripe", "Docker", "Redis"],
    line: "Orbit Commerce : une architecture e-commerce headless ultra rapide.",
  },
  {
    title: "Synapse AI",
    description:
      "Assistant conversationnel multimodal avec pipeline RAG et interface immersive 3D.",
    tags: ["React", "Python", "LLM", "Three.js"],
    line: "Synapse AI, un assistant multimodal avec pipeline RAG.",
  },
];

/** Texte de la bulle pour chaque panneau (Hero, projets…, Contact). */
export const panelLines: string[] = [
  "Salut ! Je suis Abdoulaye. Scrolle pour visiter mes projets 🚀",
  ...projects.map((p) => p.line),
  "On construit quelque chose ensemble ? Mes liens sont juste là !",
];
