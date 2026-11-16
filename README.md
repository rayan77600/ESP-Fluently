# Fluently

An Epitech team project exploring local language practice through in-person events.

## Repository status

The `main` branch contains planning and design documents. Backend implementation and container work are on [`chore/devops-docker-ia`](https://github.com/rayan77600/ESP-Fluently/tree/chore/devops-docker-ia), not merged into `main`.

## Architecture on the development branch

```text
NestJS REST API -> TypeORM -> PostgreSQL
Docker Compose: backend | PostgreSQL | pgAdmin | five FastAPI service scaffolds
```

| Component | Verified source |
| --- | --- |
| Backend | TypeScript, NestJS 11, TypeORM, PostgreSQL, Swagger, Passport/JWT and bcrypt dependencies |
| API modules | Authentication, users, events, participations and languages |
| Service scaffolds | Conversation, recommendation, matchmaking, event generation and feedback analysis |
| Containers | Backend Dockerfile, five per-service Dockerfiles and Docker Compose |

The five Python/FastAPI services currently expose `/` and `/health` only. They have non-root container users, HTTP health checks and loopback-bound ports 8001–8005. AI inference and backend-to-AI business integration are not implemented in these services.

The original design mentions Next.js and Prisma. These are design choices, not the inspected backend stack, which uses TypeORM. No implemented frontend was found on the inspected backend branch.

## Source and documentation

- [`Documents`](Documents): specifications, quality planning and contribution guidance on `main`.
- [`BD_UML_Structure`](BD_UML_Structure): design and data modeling material.
- [Backend source](https://github.com/rayan77600/ESP-Fluently/tree/chore/devops-docker-ia/backend/src): modules, entities, guards and DTOs.
- [AI services](https://github.com/rayan77600/ESP-Fluently/tree/chore/devops-docker-ia/backend/ai-services): service scaffolds and container documentation.
- [Compose configuration](https://github.com/rayan77600/ESP-Fluently/blob/chore/devops-docker-ia/backend/docker-compose.yml): development orchestration.

## Execution and tests

There is no application to start from `main`. Container instructions exist on the development branch, but container startup and full-stack integration were not executed during this review. NestJS unit and end-to-end test files are present there; no passing result or coverage figure is claimed.

## Team context

Collaborative academic project. The original project plan assigns frontend work to Milan, backend leadership to Fresnel, administration/security to Adrien, and DevOps/QA to Rayan. These are planned responsibilities, not evidence of sole authorship or completion. See commit history for individual contributions.
