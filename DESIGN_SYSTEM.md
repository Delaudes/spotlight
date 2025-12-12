# Spotlight - Design System

## Direction Artistique

**Thème**: Minimaliste et sobre avec focus sur la lumière  
**Ambiance**: Sombre et élégante avec accents lumineux

## Palette de Couleurs

### Couleurs Principales

- **Noir**: `bg-black` - Fond principal
- **Blanc**: `text-white` - Titres principaux
- **Bleu Glacial**: `text-cyan-400` / `bg-cyan-400` - Accents et CTAs (représente la lumière)

### Couleurs Secondaires

- **Gris Clair**: `text-gray-300` - Textes de contenu
- **Cyan avec Opacité**: `border-cyan-400/20` - Bordures subtiles

## Typographie

### Hiérarchie

- **Titre principal**: `text-6xl font-bold text-white`
- **Sous-titre**: `text-2xl text-cyan-400`
- **Corps de texte**: `text-gray-300`
- **Bouton**: `text-black font-semibold`

### Principes

- Police système par défaut
- Pas d'italique
- Contraste élevé pour la lisibilité

## Composants

### Boutons Principaux (CTA)

```html
<button
  class="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-12 py-4 rounded-full"
></button>
```

- Fond bleu glacial
- Texte noir pour contraste maximal
- Forme pilule (`rounded-full`)
- Grand padding pour faciliter le clic

### Boutons Icône (compacts)

```html
<!-- Bouton icône primaire -->
<button
  class="w-12 h-12 flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-black rounded-full transition-colors"
>
  <span class="material-symbols-outlined">play_arrow</span>
</button>

<!-- Bouton icône secondaire -->
<button
  class="w-12 h-12 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-cyan-400 rounded-full transition-colors border border-cyan-400/20"
>
  <span class="material-symbols-outlined">home</span>
</button>
```

- Taille fixe 48x48px (`w-12 h-12`)
- Forme ronde (`rounded-full`)
- Icône centrée
- Utiliser pour la navigation secondaire

### Cellules de Jeu

Les cellules du jeu utilisent 3 niveaux de lumière pour représenter l'état du jeu :

```html
<!-- Cellule éteinte (niveau 0) -->
<button class="bg-gray-800 border-gray-600 hover:bg-gray-700"></button>

<!-- Cellule partiellement allumée (niveau 1) -->
<button class="bg-cyan-400/50 border-cyan-400/50 hover:bg-cyan-400/60"></button>

<!-- Cellule complètement allumée (niveau 2) -->
<button class="bg-cyan-400 border-cyan-400 hover:bg-cyan-300"></button>
```

- Coins très arrondis (`rounded-2xl`)
- Aspect carré (`aspect-square`)
- Transitions sur hover

**Note** : C'est la seule exception à la règle "Éviter les multiples niveaux d'opacité", justifiée par la mécanique de jeu qui nécessite 3 états visuellement distincts.

### Cartes de Contenu

```html
<div class="border border-cyan-400/20 rounded-2xl p-8"></div>
```

- Bordure subtile bleu glacial
- Coins très arrondis
- Pas de fond ou fond transparent

## Espacements

- **Entre sections**: `space-y-12`
- **Padding conteneurs**: `p-8`
- **Padding boutons**: `px-12 py-4`
- **Padding page**: `p-4`

## Layout

### Structure de Page

```html
<div class="min-h-screen bg-black flex items-center justify-center p-4">
  <div class="max-w-2xl space-y-12 text-center">
    <!-- Contenu -->
  </div>
</div>
```

### Principes

- **Mobile-first**: Design adapté mobile par défaut
- **Centrage**: Contenu centré verticalement et horizontalement
- **Largeur max**: `max-w-2xl` pour éviter que le contenu soit trop large sur desktop
- **Alignement**: `text-center` pour la sobriété

## Effets et Interactions

### Principe Minimaliste

- Pas d'animations complexes
- Pas d'ombres portées sauf pour les CTAs si nécessaire
- Pas d'effets de blur
- Transitions simples sur les hovers

### États Interactifs

- **Hover sur CTA**: Changement de couleur uniquement (`hover:bg-cyan-300`)
- **Focus**: Utiliser les styles par défaut du navigateur

## Iconographie

- Pas d'icônes décoratives
- Icônes fonctionnelles uniquement si nécessaire
- Style simple et géométrique
- Utiliser **Google Material Symbols Outlined**
- Classe: `material-symbols-outlined`
- Taille par défaut: 24px (intégrée dans le lien CDN)

### Icônes utilisées

| Icône | Nom            | Usage               |
| ----- | -------------- | ------------------- |
| ▶️    | `play_arrow`   | Bouton jouer        |
| 🏆    | `emoji_events` | Bouton trophées     |
| 🏠    | `home`         | Bouton accueil      |
| 🎉    | `celebration`  | Message de victoire |

### Exemple d'utilisation

```html
<span class="material-symbols-outlined">emoji_events</span>
```

### Boutons Secondaires (avec icône)

```html
<button
  class="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-cyan-400 font-semibold px-12 py-4 rounded-full transition-colors border border-cyan-400/20"
>
  <span class="material-symbols-outlined">emoji_events</span>
  Trophées
</button>
```

- Fond gris foncé
- Texte cyan pour cohérence
- Bordure subtile cyan
- Icône alignée avec le texte via `flex` et `gap-2`

## Responsive

- **Mobile**: Design par défaut
- **Desktop**: Même design, utilise l'espace avec `max-w-2xl`
- Le design doit fonctionner de 320px à 1920px
- Navigation unifiée : boutons icône compacts sous le titre

### Navigation Responsive

- **Mobile** : Barre de navigation fixe en bas de l'écran (`fixed bottom-0`)
- **Desktop** : Boutons centrés dans le flux principal (`flex gap-4`)

## À Éviter

❌ Dégradés  
❌ Ombres portées complexes  
❌ Animations élaborées  
❌ Couleurs vives autres que le cyan  
❌ Backgrounds avec images  
❌ Textures  
❌ Multiple niveaux d'opacité (sauf cellules de jeu)

## À Privilégier

✅ Contraste élevé  
✅ Espaces blancs généreux  
✅ Hiérarchie claire  
✅ Simplicité  
✅ Cohérence  
✅ Accessibilité
