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

## Responsive

- **Mobile**: Design par défaut
- **Desktop**: Même design, utilise l'espace avec `max-w-2xl`
- Pas de breakpoints complexes
- Le design doit fonctionner de 320px à 1920px sans classes responsive

## À Éviter

❌ Dégradés  
❌ Ombres portées complexes  
❌ Animations élaborées  
❌ Couleurs vives autres que le cyan  
❌ Backgrounds avec images  
❌ Textures  
❌ Multiple niveaux d'opacité

## À Privilégier

✅ Contraste élevé  
✅ Espaces blancs généreux  
✅ Hiérarchie claire  
✅ Simplicité  
✅ Cohérence  
✅ Accessibilité
