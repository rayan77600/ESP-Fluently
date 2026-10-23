# Fluently — Frontend

Application web Next.js (App Router) + TypeScript + Tailwind CSS.

## Démarrage

```bash
cd frontend
npm install
cp .env.example .env.local   # optionnel
npm run dev                  # http://localhost:3000
```

Sans `NEXT_PUBLIC_API_URL`, l'application tourne sur des **mocks** (`src/lib/mocks`) pour permettre
le développement en parallèle du backend. Renseignez l'URL du backend NestJS pour appeler la vraie API.

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests unitaires (Jest + Testing Library) |
| `npm run test:coverage` | Tests + couverture (seuil 70 %, cf. DoD) |

## Écrans

| Ticket | Route | Description |
|---|---|---|
| FRONT-01 | `/register` | Inscription : validation client, appel `POST /auth/register`, gestion des erreurs API, redirection vers `/profile/setup` |
| FRONT-02 | `/` | Découverte : liste d'événements, filtres (ville, langue, type, date) synchronisés dans l'URL, appel `GET /events`, états de chargement / erreur / vide, pagination |

En mode mock, l'adresse `deja.inscrit@fluently.app` simule une erreur 409 (compte existant).

## Contrat d'API attendu

- `POST /auth/register` — body `{ email, password, languages: string[] }` → `{ accessToken }`.
  Les erreurs suivent le format NestJS `{ statusCode, message: string | string[] }`.
- `GET /events?city=&language=&type=&date=YYYY-MM-DD&page=&limit=` →
  `{ data: EventSummary[], total, page, limit }` (voir `src/types/index.ts`).

## Structure

```
src/
  app/            routes (App Router)
  components/     composants UI par domaine (auth, events, ui)
  lib/api/        client HTTP + appels par ressource
  lib/mocks/      données de démonstration
  lib/validation/ validation des formulaires
  types/          types partagés (alignés sur l'UML)
  __tests__/      tests Jest
```
