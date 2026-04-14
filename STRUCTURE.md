# Structure du projet

Voici une vue d'ensemble de l'architecture du projet :

```
/
├── index.html            # Point d'entrée HTML
├── package.json          # Dépendances et scripts
├── vite.config.ts        # Configuration de Vite
├── tailwind.config.js    # Configuration de Tailwind CSS (via Vite plugin)
├── tsconfig.json         # Configuration TypeScript
├── metadata.json         # Métadonnées de l'application
├── public/               # Fichiers statiques
└── src/                  # Code source
    ├── main.tsx          # Point d'entrée React
    ├── App.tsx           # Composant racine et routage
    ├── index.css         # Styles globaux
    ├── components/       # Composants réutilisables
    │   ├── ui/           # Composants UI de base et interactifs
    │   │   ├── DataClassificationGame.tsx
    │   │   ├── DataSanitizationSimulator.tsx
    │   │   ├── InteractiveEvaluationTable.tsx
    │   │   ├── PromptInjectionSimulator.tsx
    │   │   ├── RolePlayGame.tsx
    │   │   └── ...
    │   ├── Layout.tsx    # Structure de page (Sidebar, Header, Footer)
    │   ├── OnboardingModal.tsx # Modal d'accueil et choix de profil
    │   └── ...
    ├── contexts/         # Contextes React (ProgressContext)
    ├── data/             # Données statiques de l'application
    │   ├── courseData.tsx  # Contenu des modules
    │   ├── atelierData.tsx # Contenu des ateliers
    │   ├── examData.ts     # Questions de l'examen
    │   ├── navigation.ts   # Structure du menu
    │   └── profiles.ts     # Définition des profils utilisateurs
    ├── pages/            # Composants de page (Home, Module, Atelier, etc.)
    └── lib/              # Utilitaires (utils.ts)
```

## Concepts clés

- **Routage dynamique** : Les modules et ateliers utilisent des routes dynamiques (`/module/:id`, `/atelier/:id`) pour charger le contenu correspondant depuis les fichiers de données.
- **Gestion de l'état** : Le `ProgressContext` gère la progression de l'utilisateur, son profil et l'état de l'onboarding, en persistant ces données dans le `localStorage`.
- **Composants interactifs** : Les ateliers incluent des composants spécifiques (drag & drop, quiz, etc.) pour une expérience d'apprentissage active.
