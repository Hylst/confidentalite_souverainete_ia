# Conformité IA, RGPD & Souveraineté

> **Formation interactive complète** sur la conformité de l'Intelligence Artificielle en entreprise : RGPD, IA Act européen, Éthique, Propriété Intellectuelle & Souveraineté Numérique.

**URL de production** : [https://hylst.fr/confidentalite_souverainete_ia/](https://hylst.fr/confidentalite_souverainete_ia/)  
**Créateur** : Geoffroy Streit (alias [Hylst](https://hylst.fr))  
**Version** : 4.0 — Édition Souveraineté & Éthique — Avril 2026

---

## 🎯 Fonctionnalités principales

- **Parcours personnalisé** : Recommandations de modules en fonction de votre profil (RH, Développeur, Juriste, DPO, etc.).
- **Modules de formation** : Contenu détaillé sur le RGPD, l'IA Act, la propriété intellectuelle, la confidentialité et la souveraineté numérique.
- **Ateliers pratiques interactifs** : Exercices immersifs (jeux de rôle, simulateur de prompt injection, nettoyage de données, classification des risques).
- **Générateur de Charte IA** : Outil interactif pour créer une charte d'utilisation de l'IA sur mesure pour votre entreprise.
- **Annexes dynamiques** : Glossaire avec système de favoris et filtrage par tags + Checklist interactive avec sauvegarde de progression.
- **Examen final** : Testez vos connaissances et obtenez un certificat de réussite.
- **Suivi de progression** : Visualisez votre avancement tout au long de la formation.
- **PWA Offline-First** : L'application fonctionne sans connexion après la première visite.

---

## 🏗 Architecture "Backend Ready" & PWA

L'application est conçue comme une **SPA (Single Page Application) 100% Front-end** + **PWA offline-first** :

| Couche | Technologie | Rôle |
|---|---|---|
| Service Layer | `src/services/api.ts` | API mockée asynchrone |
| State Management | React Contexts (`ProgressContext`) | État global asynchrone |
| Persistance | `localForage` (IndexedDB) | Données offline |
| PWA | `vite-plugin-pwa` | Cache service worker |
| UI/UX | Tailwind CSS v4 + Framer Motion | Design et animations |

> **Aucune API externe ou IA tierce n'est utilisée.** Toutes les données et fonctionnalités sont 100% locales / statiques.

---

## 🛠 Technologies utilisées

- **React 19** avec **TypeScript**
- **Vite 6** pour le build et le développement
- **Tailwind CSS v4** pour le style (avec variables CSS sémantiques)
- **React Router v7** pour la navigation et la protection des routes
- **Lucide React** pour les icônes
- **Framer Motion (Motion)** pour les animations
- **React Helmet Async** pour la gestion du SEO
- **vite-plugin-pwa** pour le mode PWA offline
- **localForage** pour la persistance IndexedDB

---

## 🚀 Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (port 3000)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🌐 Déploiement — Nginx statique (VPS / Coolify)

L'application se déploie comme un **site statique** à partir du dossier `dist/`.

### 1. Build

```bash
npm run build
# Résultat : dossier dist/
```

### 2. Configuration Nginx recommandée

```nginx
server {
    listen 80;
    server_name hylst.fr;
    root /var/www/html;

    # Sous-dossier de l'application
    location /confidentalite_souverainete_ia/ {
        alias /var/www/html/confidentalite_souverainete_ia/;
        try_files $uri $uri/ /confidentalite_souverainete_ia/index.html;

        # Cache agressif pour les assets versionnés Vite
        location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. Sur Coolify

1. Créer un service **Dockerfile** ou **Static Site** pointant vers ce dépôt
2. Build command : `npm install && npm run build`
3. Publish directory : `dist`
4. Définir la variable d'environnement `BASE_URL=/confidentalite_souverainete_ia/` si nécessaire

---

## 📁 Structure du projet

```
.
├── public/                 # Assets statiques (favicons, OG image)
├── src/
│   ├── components/         # Composants réutilisables (Layout, SEO, Modals...)
│   ├── contexts/           # Contextes React (ProgressContext)
│   ├── data/               # Données statiques des modules, ateliers, glossaire
│   ├── lib/                # Utilitaires partagés
│   ├── pages/              # Pages React (Home, Module, Atelier, Exam, Generateur...)
│   ├── services/           # Couche API mockée (api.ts)
│   └── types/              # Types TypeScript
├── cours.md                # Contenu pédagogique complet (v4.0)
├── todo.md                 # Feuille de route et suggestions d'amélioration
└── implementation_plan.md  # Plan d'architecture technique
```

---

## 📄 Licence & Crédits

- **Créateur** : Geoffroy Streit (alias Hylst) — [https://hylst.fr](https://hylst.fr)
- **Contenu pédagogique** : © Geoffroy Streit — Tous droits réservés
- **Code source** : Licence MIT (voir `LICENSE`)
- **Technologies** : React, Vite, Tailwind CSS, et bibliothèques open source associées
