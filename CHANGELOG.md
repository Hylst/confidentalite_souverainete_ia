# Changelog

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.  
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [4.0.0] — 2026-04-14

### Résumé
Version majeure axée sur la **souveraineté numérique**, le retrait de toutes dépendances à des API externes, et le passage en **PWA offline-first** complète.

### Ajouté
- **PWA Offline-First** : Intégration de `vite-plugin-pwa` avec Service Worker autoUpdate et `localForage` pour la persistance IndexedDB.
- **Manifest PWA** : Fichier `manifest.webmanifest` configuré avec nom, couleurs, icônes et mode standalone.
- **Favicon et Apple Touch Icon** : Génération d'un favicon PNG sur-mesure (bouclier + neurones, palette EU bleu/or).
- **Image OG/Social Media** : Génération d'une image de prévisualisation `og-image.png` sur-mesure pour les partages réseaux sociaux (LinkedIn, Twitter/X, Facebook).
- **Fichier `todo.md`** : Feuille de route complète avec suggestions d'améliorations de contenu et de fonctionnalités, catégorisées par domaine.
- **README.md complet** : Documentation enrichie avec guide de déploiement Nginx/Coolify, configuration complète et structure du projet.
- **`.gitignore` complet** : Couverture des IDEs (VSCode, IntelliJ), logs npm/yarn/pnpm, cache Vite, fichiers PWA générés.
- **Créateur** : Signature explicite de Geoffroy Streit (Hylst) dans le cours, README et CHANGELOG.

### Modifié
- **Cours v4.0** : Mise à jour du titre vers "Édition Souveraineté & Éthique". Remplacement de "Google Gemini" par "Mistral API (Europe)" dans le tableau comparatif CGU. Mise à jour de la section opt-out TDM pour inclure les solutions open source (Mistral, Llama, Ollama). Signature du créateur ajoutée en fin de document.
- **`vite.config.ts`** : Retrait de la variable `GEMINI_API_KEY`. Ajout du plugin VitePWA. Mise à jour du commentaire HMR (référence "Hylst Studio" au lieu de "AI Studio").
- **`package.json`** : Retrait de la dépendance `@google/genai`. Ajout de `vite-plugin-pwa` et `localforage`.
- **Mentions Légales** : Remplacement de "Google Cloud Platform (Cloud Run)" par "Serveur VPS Hylst (Coolify - Architecture Souveraine, France, UE)".
- **`index.html`** : Mise à jour des liens favicon (`favicon.svg` → `favicon.png`), image OG (`.jpg` → `.png`).
- **`SEO.tsx`** : Mise à jour de l'image par défaut OG (`.jpg` → `.png`).

### Supprimé
- Dépendance `@google/genai` (et transitivement `google-auth-library`, `google-logging-utils`) — **Zéro appel à une IA ou une API tierce**.
- Référence `GEMINI_API_KEY` dans `vite.config.ts`.
- Référence à Google Cloud Platform dans les Mentions Légales.

---

## [3.0.0] — 2026-04-13 *(Version précédente)*

### Ajouté
- **Ateliers interactifs** : Simulateur de Prompt Injection, Jeu de classification des données, Simulateur de nettoyage de données, Jeu de rôle par métier.
- **Générateur de Charte IA** : Formulaire interactif multi-étapes générant un document Markdown personnalisé.
- **Glossaire dynamique** : Filtrage par tags (RGPD, Technique, Sécurité, Droit) et système de favoris persistants.
- **Checklist interactive** : Outil avec sauvegarde de l'état des cases à cocher et barre de progression.
- **Ressources enrichies** : Nouvelles catégories (Formations & Sensibilisation) et nouveaux liens (Data Act, OWASP Top 10 for LLMs, Giskard).
- **Onboarding multi-étapes** : Étape de bienvenue présentant les enjeux (Souveraineté, RGPD, Honnêteté intellectuelle) avant la sélection du profil.
- **Fichiers de documentation** : Création de `README.md`, `ABOUT.md`, `STRUCTURE.md` et `CHANGELOG.md`.

### Modifié
- **Titre de l'application** : Mise à jour pour "Conformité IA, RGPD & Souveraineté".
- **Page d'accueil** : Refonte de la section "Pourquoi c'est important ?" (Souveraineté, Cadre Légal, Honnêteté Intellectuelle).
- **Animation du titre** : Animation cyclique (fade in/out) pour les mots-clés.
- **Mentions légales et Footer** : Ajout du nom du créateur (Geoffroy Streit, alias Hylst).
- **Logique de progression** : Correction du calcul du pourcentage et ajout du marquage du générateur/examen comme terminés.
- **Bouton Continuer** : Redirige vers le prochain module non complété.
- **Recommandations par profil** : Mise à jour pour inclure les nouveaux ateliers interactifs.
- **Corrections TypeScript** : Résolution de divers problèmes d'importation et de typage.
