# Vagues bleu profond et micro-interactions

## Résultat attendu
- Remplacer tous les objets 3D par une surface ondulante plein écran, lente et majestueuse, exclusivement navy/midnight/cyan.
- Appliquer une loupe fluide lettre par lettre aux grands titres, avec une influence plus légère sur les lettres voisines.
- Rendre le bouton « Explorer mes projets » plus doux, légèrement expansif et accompagné d’un halo bleu profond.
- Préserver strictement le scroll horizontal cranté, les six liens de projets et la dernière slide Contact.

## Mise en œuvre
- Créer un shader R3F léger sur une `PlaneGeometry` suffisamment subdivisée, avec déplacement lent multi-vagues et éclairage calculé dans le shader pour souligner les crêtes.
- Créer `AnimatedText` avec `split("")`, un `motion.span` par caractère et un état d’index survolé pour animer la lettre ciblée et ses voisines.
- Remplacer les animations globales des grands titres par `AnimatedText` dans Accueil, À propos, Projets et Contact.
- Transformer le bouton d’accueil en contrôle Framer Motion avec ressort doux, halo animé et texte lumineux, tout en conservant son action actuelle.

## Vérifications
- Vérifier le rendu WebGL sur ordinateur et mobile, ainsi que l’absence d’objets flottants résiduels.
- Tester la loupe sur une lettre précise et ses voisines.
- Parcourir les neuf écrans par molette et confirmer que projets, redirections et Contact restent présents.
- Contrôler compilation, console, ressources réseau et chevauchements visuels.
