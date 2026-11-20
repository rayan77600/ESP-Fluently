# Microservices IA : développement avec Docker

## Intégration continue

Le workflow GitHub Actions `Fluently AI services CI` teste les cinq services en
parallèle sur les push et pull requests qui modifient les services IA, le fichier
Compose ou le workflow. Il peut aussi être lancé depuis l'onglet **Actions** avec
**Run workflow**, lorsque le workflow est présent sur la branche par défaut.

Pour chaque service, la CI valide la configuration Compose, construit son
Dockerfile, démarre le conteneur et attend son healthcheck (120 secondes maximum).
Elle vérifie ensuite que `/` et `/health` renvoient HTTP 200, le bon nom de service
et les statuts `running` et `ok`. Les logs sont affichés en cas d'échec et les
conteneurs sont nettoyés à la fin. Aucun secret ni service PostgreSQL n'est requis.

Prérequis : Docker avec Docker Compose, moteur Linux démarré.
Toutes les commandes ci-dessous se lancent depuis la racine du dépôt.

## Premier service

```sh
docker compose -f backend/docker-compose.yml up -d --build --wait conversation-service
curl http://localhost:8001/health
```

La réponse doit contenir `"status":"ok"` et `"service":"conversation"`.

## Les cinq services

```sh
docker compose -f backend/docker-compose.yml up -d --build --wait conversation-service recommendation-service matchmaking-service event-generator-service feedback-analysis-service
```

| Service | Endpoint local | Adresse dans le réseau Compose |
|---|---|---|
| Conversation | http://localhost:8001/health | http://conversation-service:8000 |
| Recommandation | http://localhost:8002/health | http://recommendation-service:8000 |
| Matchmaking | http://localhost:8003/health | http://matchmaking-service:8000 |
| Génération d'événements | http://localhost:8004/health | http://event-generator-service:8000 |
| Analyse des feedbacks | http://localhost:8005/health | http://feedback-analysis-service:8000 |

Chaque image possède son propre Dockerfile, un utilisateur sans privilèges et
un healthcheck HTTP. Les ports publiés sont accessibles uniquement depuis la
machine locale. Les services IA actuels sont des squelettes avec `/` et `/health` ;
ils ne nécessitent pas PostgreSQL pour démarrer.

## État, logs et arrêt

```sh
docker compose -f backend/docker-compose.yml ps
docker compose -f backend/docker-compose.yml logs --tail=100 conversation-service recommendation-service matchmaking-service event-generator-service feedback-analysis-service
docker compose -f backend/docker-compose.yml stop conversation-service recommendation-service matchmaking-service event-generator-service feedback-analysis-service
```

Pour démarrer aussi le backend, PostgreSQL et pgAdmin :

```sh
docker compose -f backend/docker-compose.yml up -d --build
```

Cette dernière commande utilise la configuration de développement existante du backend.
Les appels du backend aux services IA restent à implémenter dans le code métier.
Après une modification Python ou de `requirements.txt`, relancer la commande
`up -d --build --wait` des services concernés pour reconstruire les images.
Les fichiers `.env`, environnements virtuels et caches sont exclus des images.
Les dépendances FastAPI et Uvicorn existantes sont conservées ; les fichiers
`requirements.txt` sont normalisés en UTF-8 pour être lisibles dans les images Linux.
