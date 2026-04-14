# Règles Personnalisées & Architecture du Projet (custom_rules.md)

Ce fichier sert de référence pour l'agent IA (et les développeurs) afin de maintenir la cohérence de l'application "Conformité IA, RGPD & Souveraineté".

## 1. Architecture "Backend Ready" (Front-end Pur)
- **Application 100% Client-Side (SPA)** : L'application est servie statiquement. Il n'y a pas de serveur Node.js/Express en production.
- **Couche de Service (Service Layer)** : Tous les accès aux données se font via `src/services/api.ts`.
- **API Mockée Asynchrone** : Les fonctions de l'API retournent des `Promises` avec un délai artificiel (`delay(500)`) pour simuler la latence réseau.
- **Base de données locale** : Les données sont stockées dans le `localStorage` via `src/lib/db.ts` sous une clé unique (`app_database_v1`) avec une structure JSON stricte (définie dans `src/types/models.ts`).
- **State Management** : L'état global (Profil, Progression) est géré via des Contextes React (`ProgressContext`, `ToastContext`). Les composants UI ne doivent **jamais** appeler directement le `localStorage`.

## 2. Design System & UI/UX
- **Tailwind CSS v4** : Utilisation exclusive de Tailwind pour le style.
- **Variables CSS Sémantiques** : Les couleurs principales sont définies dans `src/index.css` via des variables CSS (`--color-primary-*`, `--background`, `--foreground`) pour faciliter la création de thèmes (marque blanche).
- **Dark Mode** : Support natif du mode sombre (`dark:`). L'application doit toujours être testée et stylisée pour les deux modes.
- **Composants UI** : Utilisation de composants réutilisables (ex: `Card`, `Button` si existants).
- **Icônes** : Utilisation exclusive de `lucide-react`.
- **Animations** : Utilisation de `framer-motion` (`motion/react`) pour les transitions de pages et les micro-interactions.
- **Optimistic UI & Feedback** : 
  - Mise à jour immédiate de l'interface lors des actions utilisateur (ex: cocher un module).
  - Utilisation de `useToast()` pour notifier l'utilisateur du succès ou de l'échec d'une opération asynchrone.
  - Affichage de `Loader2` (spinners) pendant les chargements longs.

## 3. Règles de Code (TypeScript & React)
- **Typage Strict** : Tous les modèles de données doivent être définis dans `src/types/models.ts` (ex: `UserProfile`, `UserRole`). Pas de `any`.
- **Composants Fonctionnels** : Utilisation exclusive de composants fonctionnels et de Hooks React.
- **Imports** : Les imports absolus utilisent l'alias `@/` (ex: `@/src/components/...`).

## 4. Ton, Style et Public Cible
- **Public Cible** : Professionnels (RH, Développeurs, Juristes, DPO, Dirigeants).
- **Ton** : Pédagogique, professionnel, rassurant et clair. Éviter le jargon technique inutile ou l'expliquer (dans le glossaire).
- **Langue** : Français (orthographe et grammaire soignées).
- **Finalité** : Sensibiliser et former à l'utilisation éthique et légale de l'IA (RGPD, IA Act, Propriété Intellectuelle, Shadow IT).

## 5. SEO & Déploiement
- **URL de production** : `https://hylst.fr/confidentalite_souverainete_ia/`
- **Base Path** : Le paramètre `base` dans `vite.config.ts` doit être configuré sur `/confidentalite_souverainete_ia/` pour que les assets se chargent correctement dans le sous-dossier.
- **Balises Meta** : Les balises Open Graph, Twitter Cards et Canonical doivent refléter l'URL finale et utiliser des descriptions optimisées pour le SEO.
- **React Helmet** : Utilisation de `react-helmet-async` pour gérer dynamiquement les balises `<title>` et `<meta>` dans les différentes pages.
