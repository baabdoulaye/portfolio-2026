# Neon Scroll Portfolio

Agis en tant qu'Expert React, Spécialiste en UI/UX futuriste et développeur WebGL/Three.js. Je veux créer un portfolio personnel ultra-moderne, futuriste, avec un défilement horizontal (horizontal scrolling) fluide. Le site doit intégrer un environnement 3D en arrière-plan qui interagit avec le scroll de l'utilisateur.

​Contraintes Techniques Strictes :

​Framework : React.js (Vite) avec TypeScript.
​Style : Tailwind CSS.
​Animations 2D et Scroll : Framer Motion (ou GSAP) pour gérer le scroll horizontal et l'apparition des éléments (effet smooth, parallax).
​3D : react-three-fiber et @react-three/drei (Strictement).
​Backend : INTERDICTION ABSOLUE d'utiliser Supabase ou tout autre backend. C'est un site vitrine 100% statique/front-end.
​Design System & Ambiance :

​Thème : Futuriste, Dark Mode élégant, Cyberpunk subtil / Glassmorphism.
​Couleurs : Fond très sombre (presque noir), accents néon (Cyan, Violet ou Vert Impérial) pour les éléments interactifs.
​Typographie : Sans-serif géométrique et moderne (ex: Space Grotesk ou Inter).
​Structure de l'application (Défilement Horizontal) :

Le site doit être composé d'un container principal masquant le débordement (overflow-hidden) et transformant le scroll vertical de la souris en défilement horizontal fluide.

​Section 1 : Hero (Accueil)

​À gauche : Une typographie massive, accrocheuse. Mon nom "ABDOULAYE BA", et mon titre "Architecte Web & Développeur Full-Stack". Un bouton Call-to-Action "Explorer mes projets" avec un effet de brillance (glow hover).
​En arrière-plan 3D (prenant tout l'écran) : Prépare un composant 

 de React Three Fiber. À l'intérieur, prépare le code (avec useGLTF) pour charger deux modèles : /personnage.glb et /chambre.glb (je les ajouterai manuellement dans le dossier public plus tard). Ajoute un éclairage ambiant et un spot light stylé (couleurs néon) pointé sur le centre.
​Section 2 : Projets (Vidéos immersives)

​En défilant vers la droite, l'utilisateur découvre mes projets.
​Design des cartes : Cartes en Glassmorphism (fond semi-transparent flouté, bordures subtiles).
​Contenu des cartes : Chaque carte présente un projet. Au lieu d'une simple image, intègre une balise  (auto-play en boucle, sans le son muted, avec l'attribut playsInline) pour montrer le projet en action. Titre du projet, description courte, et badges des technos (React, Node, Docker, etc.).
​Effet au survol : La carte se soulève légèrement et la bordure s'illumine.
​Section 3 : Contact & À Propos

​Toujours plus à droite : Une section épurée avec des liens vers mon GitHub, LinkedIn, et un bouton pour télécharger mon CV.
​L'environnement 3D en fond doit avoir doucement tourné (rotation de la caméra via React Spring ou useFrame en fonction de la progression du scroll) pour montrer le personnage sous un autre angle à la fin du site.
​Instructions de démarrage :

​Génère la structure de base, le routing (si nécessaire) et le container pour le scroll horizontal.
​Crée les composants UI (Hero, ProjectCard, Contact).
​Crée un composant Scene3D.jsx dédié à React Three Fiber avec des mesh temporaires (comme des boîtes) en attendant que j'injecte mes fichiers .glb.
​Assure-toi que les transitions soient extrêmement fluides ("buttery smooth").

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/adf11a67-dc5d-4337-aecd-3cbd9cde79ca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
