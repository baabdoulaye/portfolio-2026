# Refonte du portfolio horizontal

## Résultat attendu
- Transformer le portfolio en une expérience horizontale fixe de huit écrans : Accueil, À propos, puis six projets.
- Faire avancer ou reculer la molette d’exactement un écran, avec verrouillage pendant la transition et alignement magnétique strict.
- Garder les contrôles tactiles et le défilement horizontal natif sur mobile, avec snap obligatoire et barres invisibles.

## Mise en œuvre
- Remplacer le grand parcours vertical par un conteneur plein écran `overflow-x-scroll`, `flex` et `scroll-snap` mandatory.
- Ajouter une navigation à la molette qui calcule l’écran courant, défile de `100vw`, limite les doubles déclenchements et réaligne après un geste tactile.
- Conserver le Canvas 3D en fond global avec Bloom cyan/magenta/violet contrôlé, puis le faire disparaître uniquement lorsque l’écran À propos est actif.
- Ajouter `/about-coding.mp4` en vidéo plein écran dans À propos avec fondu entrant/sortant et voile de contraste.
- Passer les données à six projets et afficher chacun dans son propre écran. Chaque carte préparera sa vidéo fictive dédiée et la révélera au survol par fondu d’une seconde et zoom inversé.
- Agrandir le curseur Framer Motion avec ressort et `mix-blend-mode: difference`, tout en le désactivant sur appareils tactiles.
- Créer un composant de texte « éclaté » réutilisable : lettres ou mots se dispersent légèrement au survol, puis reviennent avec un ressort.
- Renforcer les halos néon via les variables du thème sans compromettre la lisibilité du contenu.

## Vérifications
- Tester les huit positions au clavier/molette et confirmer qu’aucune position intermédiaire ne subsiste.
- Vérifier sur desktop et mobile que les textes, cartes et vidéos restent cadrés et sans chevauchement.
- Vérifier le fondu 3D/vidéo sur À propos, les six révélations vidéo au survol, le curseur et les animations de texte.
- Contrôler les erreurs de compilation, de console et les ressources fictives manquantes attendues.
