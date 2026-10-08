export type Project = {
  title: string;
  description: string;
  tags: string[];
  video?: string;
  href?: string;
  github?: string; // <-- Ajoute cette ligne ici !
  line?: string;
};

export const projects: Project[] = [
  {
    title: "Green Afreeca",
    description:
      "Co-fondateur de Green Afreeca, une platforme E-commerce full-stack (MERN & Docker) valorisant les superaliments bio d'Afrique avec une architecture moderne, fluide et sécurisée. ",
    tags: ["React", "MongoDB", "Node", "Express", "Docker", "Stripe", "Tailwind"],
    video: "/screenvideo_green_afreeca.mp4",
    href: "https://www.greenafreeca.com/",
    github: "https://github.com/baabdoulaye/green_afreeca", // <-- Ton lien GitHub ici
  },
  {
    title: "Orbit Commerce",
    description:
      "E-commerce headless haute performance, checkout optimisé et rendu côté serveur edge.",
    tags: ["Next", "Stripe", "Docker", "Redis"],
    video: "/project-orbit.mp4",
    href: "https://github.com/",
  },
  {
    title: "Thé Tip Top - Projet de fin d'année de Master",
    description:
      "Application web du jeu-concours Thé Tip Top : les clients participent via un code ticket obtenu en boutique et remportent des lots (thés, coffrets…). ",
    tags: [
      "React",
      "Tailwind",
      "Node",
      "Express",
      "Stripe",
      "JWT",
      "BCRYPT",
      "Docker",
      "Prometheus",
      "Grafana",
      "Jenkins",
      "POSTGRESQL",
      "Kibana",
    ],
    video: "/project-synapse.mp4",
    href: "http://dsp5-archi-024a-g3.fr/",
    github: "https://github.com/HilmiKeles/projet-fin-annee",
  },
  {
    title: "CONGEPIE - Platforme de gestion de congés",
    description:
      "Application de gestion des congés pour entreprises, permettant aux employés de soumettre des demandes de congés et aux managers de les approuver.",
    tags: ["REACT", "SHADCN UI", "TAILWIND", "NODE", "EXPRESS", "SQL", "JWT"],
    video: "/congepie.mp4",
    github: "https://github.com/baabdoulaye/congepiemanagement",
  },
  {
    title: "EPIE CONNECT",
    description:
      "Application intranet centralisant la gestion opérationnelle, les indicateurs clés  et les données essentielles d'un centre de formation.",
    tags: [
      "REACT ",
      "SHADCN UI",
      "TAILWIND",
      "NODE",
      "EXPRESS",
      "MONGODB",
      "JWT",
      "BCRYPT",
      "MONGOOSE",
    ],
    video: "/project-atlas.mp4",
    github: "https://github.com/baabdoulaye/epie-formation-hub",
  },
];

/** Texte de la bulle pour les 4 grands panneaux du portfolio */
export const panelLines: string[] = [
  "Salut ! Je suis Abdoulaye. Scrolle pour visiter mes projets 🚀",
  "Je conçois des architectures solides et des interfaces qui marquent.",
  "Explore mes projets récents ! Utilise les flèches pour changer de projet.",
  "On construit quelque chose ensemble ? Mes liens sont juste là !",
];
