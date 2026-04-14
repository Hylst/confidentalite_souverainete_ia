# 📋 TODO — Conformité IA, RGPD & Souveraineté

> Suggestions d'améliorations de contenu et de fonctionnalités — Version 4.0  
> Créé par : Geoffroy Streit (Hylst) — Avril 2026

---

## 🎯 Améliorations de Contenu

### Modules pédagogiques
- [ ] **Module 9 (Nouveau)** — Souveraineté numérique & cloud souverain : SecNumCloud, Scaleway, OVH, Outscale — Comparer les offres certifiées et guider le choix d'un cloud conforme pour les PME/ETI
- [ ] **Module 10 (Nouveau)** — Cybersécurité des systèmes IA : attaques adversariales, jailbreaking, data poisoning, model inversion — avec cas pratiques et contre-mesures
- [ ] **Module 11 (Nouveau)** — IA & relations de travail : impact RH, obligation de consultation via le CSE, cadre légal de surveillance des salariés, droit à la déconnexion vs monitoring IA
- [ ] **Mise à jour M2** — Ajouter les décrets d'application IA Act de 2025-2026 au fur et à mesure des publications officielles
- [ ] **Mise à jour M6** — Intégrer les lignes directrices CNIL IA publiées en 2025 (recommandations sur les systèmes de recommandation, chatbots, scoring)
- [ ] **Glossaire** — Ajouter : Hallucination LLM, Shadow AI, AI Governance, GPAI Registry, Conformité By Design, Data Lineage

### Contenu des Ateliers
- [ ] **Atelier 7 (Nouveau)** — Mise en place d'une Politique d'Utilisation de l'IA (PUA) : formulaire guidé, modèle Word/PDF téléchargeable
- [ ] **Atelier 8 (Nouveau)** — Audit de Shadow IT IA : méthodologie de recensement des outils non déclarés, fiche de risque par outil
- [ ] **Atelier 9 (Nouveau)** — Simulateur de DPIA/AIPD IA : remplissage guidé d'une Analyse d'Impact pour un cas concret de système IA
- [ ] **Atelier Prompt Red Teaming** — Tester la résistance d'un système LLM à des attaques de prompt injection avec scénarios et score de robustesse
- [ ] Enrichir l'atelier 4 (sécurisation cloud) avec des exemples concrets de providerless LLM (Ollama + Mistral en local)

### Quiz & Évaluation
- [ ] Ajouter une banque de questions (50+) pour un mode tirage aléatoire à chaque tentative
- [ ] Implémenter des questions à réponses multiples (QCM niveau 2)
- [ ] Créer des **quiz sectoriels** par profil (Quiz DPO, Quiz Juriste, Quiz Dev, Quiz RH) en plus du quiz général
- [ ] Ajouter des explications détaillées après chaque réponse (mode pédagogique avancé)
- [ ] Ajouter un **mode révision** : refaire uniquement les questions ratées

---

## 🛠 Fonctionnalités Techniques

### PWA & Offline
- [ ] Ajouter une détection en ligne/hors ligne avec un banner UI discret informant l'utilisateur
- [ ] Implémenter un système de cache intelligent pour les ressources pédagogiques avec `localForage`
- [ ] Ajouter un bouton "Installer l'application" visible sur desktop et mobile
- [ ] Permettre l'exportation du journal de progression en JSON ou PDF

### Progression & Personalisation
- [ ] Implémenter un **profil persistant** avec avatar et statistiques sur plusieurs sessions
- [ ] Ajouter un **tableau de bord de compétences** par domaine (RGPD, IA Act, PI, Éthique, Confidentialité) avec radar chart dynamique
- [ ] Permettre de **réinitialiser sélectivement** la progression (par module uniquement)
- [ ] Ajouter un mode "**Révision rapide**" — résumés des modules en 5 minutes avec bullets essentiels

### Générateur de Charte IA
- [ ] Ajouter l'export PDF fonctionnel (via `jsPDF` ou `html2canvas`)
- [ ] Ajouter l'export Word/DOCX (via `docx` npm package)
- [ ] Permettre de sauvegarder plusieurs brouillons de charte dans le localStorage
- [ ] Ajouter un **mode Comparaison** pour visualiser l'évolution de la charte entre deux versions
- [ ] Ajouter des modèles pré-remplis sectoriels : Santé, Cabinet Comptable, Start-up Tech, Industrie

### UX & Accessibilité
- [ ] Améliorer l'**accessibilité WCAG 2.1 AA** : focus visible, order logique, ARIA labels complets, rôles landmark
- [ ] Ajouter un mode **lecture simplifiée** pour les personnes dyslexiques (police Dyslexie, interlignage augmenté)
- [ ] Ajouter un bouton "**Imprimer / PDF**" sur chaque module et atelier
- [ ] Rendre le **mode sombre** 100% cohérent et améliorer les contrastes dans toutes les pages
- [ ] Ajouter un raccourci clavier (`?`) pour afficher l'aide contextuelle et les shortcuts
- [ ] Améliorer la mobilité : interface responsive mobile (menu hamburger, cards adaptatives)

### Social & Partage
- [ ] Ajouter un bouton de **partage de badge** de certification sur LinkedIn / Twitter (image PNG générée côté client)
- [ ] Permettre de générer un lien de **partage de progression** (deeplink encodé dans l'URL)
- [ ] Ajouter un widget "Résultat d'examen" partageable (score + modules complétés + date)

---

## 🏗 Architecture & DevOps

### Optimisation du Build
- [ ] Analyser le bundle avec `vite-bundle-visualizer` et optimiser les dépendances lourdes
- [ ] Implémenter le **lazy-loading** pour tous les composants de pages (actuellement centralisé)
- [ ] Ajouter une politique de cache-busting robuste sur les assets statiques dans le header Nginx
- [ ] Ajouter un script CI/CD GitHub Actions pour le build et déploiement automatique sur Coolify

### Infrastructure VPS / Nginx
- [ ] Créer un `nginx.conf` complet optimisé : gzip, brotli, headers sécurité (HSTS, CSP, X-Frame-Options), cache statique
- [ ] Ajouter un `Dockerfile` multi-stage optimisé (build `node:alpine` + serve `nginx:alpine`)
- [ ] Ajouter un `docker-compose.yml` de test local avec le bon contexte de sous-dossier
- [ ] Configurer le fichier `.coolify.json` ou les variables d'environnement Coolify pour le build automatique

### Tests
- [ ] Ajouter des tests unitaires pour les services (`api.ts`, `progressService`) avec Vitest
- [ ] Ajouter des tests E2E pour les parcours utilisateurs principaux avec Playwright
- [ ] Mettre en place un linter strict (ESLint + Prettier + Husky pre-commit hooks)

---

## 🔐 Sécurité & Conformité du Projet Lui-Même

- [ ] Ajouter une **Content Security Policy (CSP)** stricte en header Nginx pour bloquer les XSS
- [ ] Passer les polices Google Fonts en **auto-hébergement** (télécharger Inter et servir localement) pour ne plus dépendre d'un CDN externe
- [ ] Ajouter une **Politique de Confidentialité** complète et à jour sur la page dédiée
- [ ] Ajouter une bannière de **consentement cookies** si des analytics sont ajoutés ultérieurement
- [ ] Mettre en place un test de sécurité automatisé (`npm audit`) dans la CI

---

## 📊 Analytiques & Monitoring (Souverain)

- [ ] Ajouter une instance **Umami** ou **Plausible** self-hosted sur le même VPS pour les statistiques d'usage RGPD-compatibles et sans cookies
- [ ] Créer un tableau de bord de **monitoring des erreurs JS** avec Sentry self-hosted ou un logger interne

---

*Document généré le 14 Avril 2026 — Auteur : Geoffroy Streit (Hylst)*
