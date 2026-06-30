# SejourTaxe - Calculateur de taxe de séjour en France

**SejourTaxe** (sejourtaxe.com) est un site web statique professionnel, rapide et optimisé pour le SEO, conçu pour simuler et calculer la taxe de séjour en France pour l'ensemble des communes et types d'hébergements touristiques.

Ce projet est entièrement codé en **React + TypeScript + Tailwind CSS** et est prêt à être déployé sur **Cloudflare Pages** en tant que site statique performant.

---

## 🚀 Caractéristiques principales

- **Calculateur conforme 2026** :
  - **Hébergements Classés** (avec étoiles, gîtes, chambres d'hôtes, palaces) : tarification fixe par adulte par nuit.
  - **Hébergements Non Classés** (sans étoiles) : calcul proportionnel au coût de la nuitée (pourcentage de 1% à 5%), avec application automatique du plafond.
- **Taxes Additionnelles** : Support complet des taxes départementales (10%), régionales (ex: 15% Grand Sud-Ouest) et de la taxe de transport d'Île-de-France (200%).
- **Exonérations Légales** : Exonération automatique des mineurs (enfants de moins de 18 ans).
- **Saisie simplifiée par Presets** : Remplissage instantané des paramètres réels pour des communes phares comme *Paris (75), Nice (06), Marseille (13), Lyon (69), Bordeaux (33), Strasbourg (67), Chamonix-Mont-Blanc (74)*.
- **Formules détaillées** : Détail complet de toutes les étapes de calcul intermédiaires dans un format visuel clair.
- **Intégration Google AdSense / Google Ads** : Encart publicitaire dynamique contrôlé à 100% par des variables d'environnement (si vides, aucun encart ne s'affiche).
- **RGPD Compliant** : Aucun transfert de données vers des serveurs tiers. Tout calcul mathématique s'effectue localement dans le navigateur de l'utilisateur.

---

## 🛠️ Installation et Exécution locale

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm (fourni avec Node.js)

### Étape 1 : Cloner le projet ou extraire l'archive
Ouvrez votre terminal dans le dossier du projet.

### Étape 2 : Installer les dépendances
```bash
npm install
```

### Étape 3 : Configurer l'environnement local
Vous pouvez modifier ou créer un fichier `.env` à la racine pour tester l'affichage de Google AdSense :
```env
PUBLIC_GOOGLE_ADSENSE_CLIENT_ID="ca-pub-1234567890"
PUBLIC_GOOGLE_ADS_SLOT_TOP="1111111"
PUBLIC_GOOGLE_ADS_SLOT_BOTTOM="2222222"
```

### Étape 4 : Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez votre navigateur sur `http://localhost:3000` pour voir le projet.

---

## ☁️ Déploiement sur Cloudflare Pages

Le projet est conçu pour être déployé en quelques clics de manière statique et sécurisée sur **Cloudflare Pages**.

### Étape 1 : Publier votre code sur GitHub/GitLab
Créez un dépôt privé ou public sur votre compte et poussez-y les fichiers de votre projet.

### Étape 2 : Connecter votre dépôt à Cloudflare Pages
1. Rendez-vous sur votre tableau de bord **Cloudflare**.
2. Dans le menu latéral de gauche, cliquez sur **Workers & Pages** > **Créer une application** > **Pages** > **Connecter au dépôt Git**.
3. Sélectionnez le dépôt de votre projet SejourTaxe.

### Étape 3 : Configurer les paramètres de build
Indiquez les paramètres de compilation suivants :
- **Framework Preset** (Configuration prédéfinie) : **Vite** ou **None / Other**
- **Build command** (Commande de compilation) : `npm run build`
- **Output directory** (Dossier de sortie) : `dist`

### Étape 4 : Configurer les variables d'environnement (Optionnel - AdSense)
Si vous souhaitez afficher des publicités, configurez les variables d'environnement directement dans l'interface de Cloudflare Pages :
1. Allez dans les **Settings** (Paramètres) de votre projet sur Cloudflare Pages.
2. Cliquez sur l'onglet **Environment Variables** (Variables d'environnement).
3. Cliquez sur **Add Variables** (Ajouter des variables) pour l'environnement de Production et de Preview :
   - `PUBLIC_GOOGLE_ADSENSE_CLIENT_ID` : Votre ID d'éditeur AdSense (ex: `ca-pub-1234567890`)
   - `PUBLIC_GOOGLE_ADS_SLOT_TOP` : ID du slot d'annonce supérieur
   - `PUBLIC_GOOGLE_ADS_SLOT_BOTTOM` : ID du slot d'annonce inférieur
4. Cliquez sur **Save** et relancez un déploiement (**Redeploy**).

*Si ces variables ne sont pas définies ou sont vides, le site n'affichera aucun encart publicitaire et l'espace restera propre et épuré.*

---

## 📂 Structure du Projet

```
/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Barre de navigation réactive
│   │   ├── Footer.tsx           # Pied de page avec avertissement réglementaire
│   │   ├── FaqSection.tsx       # Accordéons interactifs pour les questions fréquentes (FAQ)
│   │   ├── AdBanner.tsx         # Gestionnaire dynamique d'annonces Google AdSense
│   │   ├── HomeView.tsx         # Page d'accueil avec explication des critères
│   │   ├── CalculatorView.tsx   # Simulateur bicolonne avec calculs en temps réel
│   │   ├── GuideView.tsx        # Page d'explication détaillée des formules de calcul
│   │   ├── PrivacyView.tsx      # Politique de confidentialité conforme RGPD (calcul local)
│   │   ├── LegalView.tsx        # Mentions légales obligatoires (LCEN)
│   │   └── ContactView.tsx      # Formulaire de contact pour corrections de taux
│   ├── data/
│   │   └── communes.ts          # Base locale des taux et taxes additionnelles réelles (Paris, Nice, etc.)
│   ├── lib/
│   │   └── taxEngine.ts         # Moteur de calcul pur et découplé
│   ├── types.ts                 # Contrats d'interfaces TypeScript du domaine
│   ├── App.tsx                  # Routage client SPA et mise à jour dynamique du SEO (title / meta)
│   ├── index.css                # CSS Global intégrant les polices Inter & JetBrains Mono
│   └── main.tsx                 # Point d'entrée de l'application
├── package.json                 # Gestion des scripts et dépendances
├── vite.config.ts               # Configuration Vite (expose les variables avec préfixe PUBLIC_)
└── README.md                    # Cette documentation de référence
```

---

## ⚖️ Avertissement légal
Le site SejourTaxe est un outil d'aide au calcul et de simulation. Les montants officiels dépendent exclusivement des délibérations de chaque commune touristique ou de leur EPCI.
