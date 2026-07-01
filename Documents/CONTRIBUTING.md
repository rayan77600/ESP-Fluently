# Contributing to Fluently

Merci de contribuer à **Fluently**, la plateforme sociale d'apprentissage linguistique développée par l'équipe projet EPITECH Paris. Ce document décrit les règles à suivre pour contribuer au code dans de bonnes conditions, à 5 développeurs, sur frontend, backend et microservices IA.

## Sommaire

- [Équipe & périmètres](#équipe--périmètres)
- [Avant de commencer](#avant-de-commencer)
- [Workflow Git](#workflow-git)
- [Convention de nommage des branches](#convention-de-nommage-des-branches)
- [Convention de commits](#convention-de-commits)
- [Ouvrir une Pull Request](#ouvrir-une-pull-request)
- [Revue de code](#revue-de-code)
- [Définition of Done](#définition-of-done)
- [Style de code & linting](#style-de-code--linting)
- [Tests](#tests)
- [Documentation API](#documentation-api)
- [Sécurité](#sécurité)
- [Besoin d'aide ?](#besoin-daide-)

## Équipe & périmètres

| Membre | Rôle | Périmètre |
|---|---|---|
| Milan | Frontend Lead & Features | Next.js, UI/UX, Socket.io (client) |
| Fresnel | Backend Lead & Architecture | NestJS, PostgreSQL/Prisma, APIs, Admin Dashboard |
| Kenza | Backend IA & Matching | Python, FastAPI, microservices IA |
| Rayan | QA / DevOps Lead | CI/CD, Docker, tests, environnements |
| Adrien | DevOps & Sécurité Applicative | Sécurité, audits, hardening |

Avant d'ouvrir une tâche qui touche au périmètre d'un autre membre (ex. changement de contrat d'API), prévenez le responsable concerné sur Discord.

## Avant de commencer

1. Rejoignez le serveur Discord de l'équipe et le board GitHub Projects.
2. Vérifiez qu'une issue existe pour la tâche que vous comptez traiter. Si ce n'est pas le cas, créez-la avec un label approprié (`feature`, `bug`, `doc`, `devops`, `security`, `ia`, `frontend`, `backend`).
3. Assignez-vous l'issue et déplacez-la dans la colonne **En cours** du board.
4. Installez les dépendances du service concerné (voir le `README` de chaque service : frontend, backend, microservices Python).

## Workflow Git

Le dépôt utilise trois types de branches :

- **`main`** — branche de production, protégée. Aucun push direct.
- **`develop`** — branche d'intégration. Toutes les features y sont fusionnées avant de passer en production.
- **`feature/*`, `fix/*`, `hotfix/*`** — branches de travail, créées à partir de `develop` (ou de `main` pour un `hotfix/*` urgent).

Workflow standard :

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nom-de-la-feature
# ... travail ...
git push origin feature/nom-de-la-feature
# Ouvrir une Pull Request vers develop
```

## Convention de nommage des branches

| Préfixe | Usage | Exemple |
|---|---|---|
| `feature/` | Nouvelle fonctionnalité | `feature/chat-groupe-evenement` |
| `fix/` | Correction de bug (non urgente) | `fix/filtre-evenements-date` |
| `hotfix/` | Correction urgente sur `main` | `hotfix/auth-token-expire` |
| `chore/` | Tâche technique sans impact fonctionnel | `chore/upgrade-nestjs` |
| `docs/` | Documentation uniquement | `docs/swagger-matching` |

Utilisez des noms courts, en kebab-case, en français ou en anglais mais cohérents au sein d'une même branche.

## Convention de commits

Le projet suit les [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<périmètre optionnel>): <description courte>
```

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `style` | Formatage, sans changement de logique |
| `refactor` | Refactoring sans changement de comportement |
| `test` | Ajout ou modification de tests |
| `chore` | Maintenance, dépendances, configuration |
| `perf` | Amélioration de performance |
| `security` | Correctif ou renforcement de sécurité |

Exemples :

```
feat(matching): ajoute le calcul de score de compatibilité géolocalisé
fix(auth): corrige l'expiration prématurée du token JWT
docs(api): met à jour la doc Swagger du endpoint Événement
```

## Ouvrir une Pull Request

1. La PR cible **`develop`** (jamais `main` directement, sauf `hotfix/*` validé par les leads).
2. Le titre suit la convention de commits (`feat: ...`, `fix: ...`).
3. La description doit inclure :
   - Le lien vers l'issue concernée (`Closes #123`).
   - Un résumé du changement et, si pertinent, des captures d'écran (frontend) ou un exemple d'appel API (backend/IA).
   - La liste des tests ajoutés ou exécutés.
4. La PR ne doit pas être en brouillon (draft) au moment de demander une revue.
5. Le pipeline CI/CD (build, lint, tests) doit être au vert avant de demander une revue.

## Revue de code

- **Au moins 1 reviewer** est obligatoire avant de merger sur `develop`.
- **Au moins 1 reviewer désigné par le lead du pôle concerné** est obligatoire avant de merger sur `main` (Fresnel pour backend, Milan pour frontend, Kenza pour IA, Rayan/Adrien pour DevOps/sécurité).
- Le reviewer vérifie : respect de la Definition of Done, cohérence avec l'architecture existante, absence de régression évidente, qualité des tests.
- Les retours de revue doivent être traités ou discutés avant le merge ; un commentaire non résolu bloque la fusion.
- Soyez bienveillants et constructifs dans les commentaires de revue — l'objectif est la qualité du produit, pas la critique des personnes.

## Définition of Done

Un ticket n'est considéré comme terminé que si tous les critères du document **Critères de validation d'un ticket (DoD)** sont remplis, notamment :

- La fonctionnalité répond aux critères d'acceptation du ticket et a été testée manuellement.
- Le code respecte les normes du projet (ESLint pour TypeScript, PEP8 pour Python) et le principe DRY.
- Les tests unitaires passent avec une couverture minimale de 70 %, ainsi que les tests d'intégration et les tests E2E principaux.
- La documentation technique (Swagger) et le `README` sont à jour si nécessaire.
- Le code a été relu par au moins un autre membre de l'équipe et les retours ont été traités.
- Le pipeline CI/CD passe avec succès et l'application est fonctionnelle en staging.
- Le ticket a été validé par le responsable de projet.

Voir le document complet pour le détail de chaque critère.

## Style de code & linting

- **TypeScript (frontend Next.js, backend NestJS)** : ESLint + Prettier. Lancez `npm run lint` avant de pousser.
- **Python (microservices IA)** : PEP8, vérifié via `flake8` ou `ruff` selon la configuration du service. Lancez le linter avant de pousser.
- Évitez la duplication de code (principe DRY) ; mutualisez la logique commune dans des modules/services partagés.
- Commentez les fonctions complexes et les points d'intégration avec des API externes (OpenAI/Gemini, services tiers).

## Tests

| Type de test | Outil | Obligatoire pour merger |
|---|---|---|
| Tests unitaires | Jest (TS), pytest (Python) | Oui — couverture ≥ 70 % |
| Tests d'intégration (API) | Jest / Supertest, pytest | Oui sur les endpoints modifiés |
| Tests E2E | Playwright | Oui sur les parcours critiques impactés |
| Tests de sécurité | OWASP Top 10, scripts d'audit | Oui sur les zones sensibles (auth, upload, IA) |

Avant d'ouvrir une PR, exécutez localement la suite de tests concernée par votre changement.

## Documentation API

- Chaque nouvel endpoint NestJS ou FastAPI doit être documenté via les décorateurs Swagger (`@ApiOperation`, `@ApiProperty`, `@ApiResponse` côté NestJS ; équivalent FastAPI/Pydantic côté Python).
- Le contrat d'API (DTOs, schémas) doit être mis à jour avant que le frontend ne commence l'intégration, pour permettre le développement en parallèle sur mocks.

## Sécurité

- Ne committez **jamais** de secrets, clés d'API ou fichiers `.env`. Utilisez les GitHub Secrets pour la CI/CD.
- Tout changement touchant à l'authentification, aux rôles (RBAC) ou à la gestion des données personnelles doit être relu par Adrien ou Rayan.
- Signalez immédiatement sur Discord (canal dédié) toute vulnérabilité découverte, sans attendre l'ouverture d'une PR corrective.
- Respectez la conformité RGPD : pas de données personnelles dans les logs, droit à l'effacement et à l'export à préserver sur toute fonctionnalité touchant aux données utilisateur.

## Besoin d'aide ?

- Bloqué sur une tâche : signalez-le dans le canal Discord dédié plutôt que de rester bloqué en silence.
- Question d'architecture ou de périmètre : contactez le lead du pôle concerné.
- Doute sur une convention non couverte par ce document : proposez-la en réunion d'équipe hebdomadaire avant de l'appliquer, afin de garder une cohérence sur tout le projet.

---

*Fluently — CONTRIBUTING — EPITECH Paris 2024-2025*
