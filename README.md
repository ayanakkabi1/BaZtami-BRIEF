# 💰 BaZtami - Gestionnaire de Budget Personnel

Une application web moderne et intuitive pour gérer vos finances personnelles. Suivez vos revenus et dépenses, visualisez votre solde en temps réel et prenez le contrôle de votre budget avec une interface élégante et minimaliste.

## ✨ Fonctionnalités

### 💳 Gestion des Transactions
- **Ajouter** des revenus et dépenses via une popup intuitive
- **Visualiser** l'historique complet dans une interface épurée
- **Supprimer** les transactions avec confirmation
- **Validation** en temps réel des formulaires

### 📊 Tableau de Bord Temps Réel
- **Revenus totaux** affichés en vert avec icône de croissance
- **Dépenses totales** affichées en rouge avec icône de diminution  
- **Solde actuel** calculé automatiquement
- **Mise à jour instantanée** après chaque opération

### 🎨 Interface Utilisateur
- **Design minimaliste** avec fond rose doux (`bg-pink-50`)
- **Header professionnel** avec logo et bouton d'ajout
- **Popup moderne** avec dégradé indigo-violet
- **Cartes statistiques** avec icônes SVG personnalisées
- **Responsive design** adapté mobile et desktop

### 💾 Persistance des Données
- **Sauvegarde automatique** dans le localStorage
- **Données sécurisées** localement
- **Accès hors ligne** complet

## 🚀 Installation et Utilisation

### Méthode Simple
1. **Téléchargez** les fichiers du projet
2. **Ouvrez** `index.html` dans votre navigateur
3. **Commencez** à ajouter vos transactions

### Structure des Fichiers
```
baztami/
├── index.html
├── style.css
├── assets/
│   └── logo.png
└── codes/
    └── js/
        ├── storage.js
        ├── calculations.js
        └── ui.js
```

## 🎯 Comment Utiliser BaZtami

### Ajouter une Transaction
1. Cliquez sur le bouton **"➕"** dans le header
2. Remplissez le formulaire dans la popup :
   - **Nom** (Salaire, Loyer, Courses...)
   - **Description** détaillée
   - **Montant** en MAD
   - **Type** (Revenu ou Dépense)
3. Validez pour sauvegarder automatiquement

### Consulter les Statistiques
- **Revenus** : Carte verte avec flèche ascendante
- **Dépenses** : Carte rouge avec flèche descendante  
- **Solde** : Carte blanche avec graphique
- Toutes les valeurs en **MAD (Dirham Marocain)**

### Gérer l'Historique
- Visualisez toutes les transactions dans la section dédiée
- Interface chronologique claire
- État vide élégant quand aucune transaction

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **Tailwind CSS** - Framework CSS utilitaire
- **JavaScript Vanilla** - Logique applicative
- **localStorage API** - Persistance des données

## 🎨 Design System

### Couleurs
- **Fond principal** : `bg-pink-50` (rose très clair)
- **Header** : Blanc avec texte violet (`text-purple-900`)
- **Bouton principal** : Blanc avec texte indigo
- **Popup** : Dégradé `from-indigo-500` vers `to-purple-600`
- **Statistiques** : Vert (#10B981), Rouge (#EF4444), Bleu (#3B82F6)

### Typographie
- **Titres** : `font-serif` pour une touche élégante
- **Interface** : `font-mono` pour les éléments techniques
- **Hiérarchie** : Tailles variables pour une lecture claire

## 🔧 Architecture Technique

### Modules JavaScript
- **storage.js** - Gestion CRUD et localStorage
- **calculations.js** - Calculs financiers et totaux
- **ui.js** - Rendu interface et mises à jour DOM

### Fonctionnalités Clés
- **Génération d'ID unique** avec `Date.now()`
- **Format de date français** avec `toLocaleDateString("fr-FR")`
- **Validation formulaire** avec messages d'erreur contextuels
- **Animations fluides** avec transitions Tailwind

## 🌐 Compatibilité

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+ 
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ✅ **Mobile** (iOS Safari, Android Chrome)

## 📱 Expérience Utilisateur

- **Interface épurée** sans distractions
- **Navigation intuitive** en un clic
- **Feedback immédiat** sur toutes les actions
- **Design accessible** avec contrastes optimisés

## 🔮 Améliorations Futures

- [ ] Graphiques de tendances financières
- [ ] Catégories personnalisables
- [ ] Export PDF des relevés
- [ ] Mode sombre/clair
- [ ] Synchronisation cloud
- [ ] Rappels de budget

## 📄 Licence

MIT License - libre d'utilisation pour tout projet.

---

**BaZtami** - *Maîtrisez le flux de votre argent, gérez mieux votre vie* 💫
