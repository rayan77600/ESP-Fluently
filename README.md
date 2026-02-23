# Fluently – README en cours

## 🌍 Présentation du projet
Fluently est une plateforme web & mobile facilitant l’apprentissage des langues à travers des rencontres réelles et locales.  
Les utilisateurs peuvent créer ou rejoindre des événements pour pratiquer une langue avec d’autres passionnés.  
Axée sur l’expression orale, Fluently simplifie la mise en relation, la participation et le partage autour des langues.

---

## 🎯 Objectifs
- Faciliter la pratique réelle des langues
- Structurer la participation aux événements
- Offrir une expérience sociale motivante et mesurable

---

## 🏗 Architecture technique prévue
**Frontend** : Next.js (Web Mobile)  
**Backend** : Node.js + NestJS (TypeScript)  
**Base de données** : PostgreSQL  
**ORM** : Prisma  

### Pourquoi ces choix
- **Next.js** : performance + rendu serveur + cohérence avec le backend  
- **NestJS** : architecture modulaire, scalable, APIs propres  
- **PostgreSQL** : robuste, adapté aux relations complexes  
- **Prisma** : typage TypeScript + sécurité SQL  

---

## 🧱 Product Breakdown Structure (PBS) simplifié

### Frontend
- Authentification / Profil utilisateur  
- Découverte des événements (filtres, cartes, liste)  
- Création et participation à des événements  
- Feedback / Chat / Album photo  

### Backend
- Gestion utilisateurs  
- Gestion événements  
- Matching & recommandations  
- Notifications  

### Admin Dashboard
- Modération événements  
- Gestion utilisateurs  
- Analytics (engagement, rétention)

---

## 🛠 Work Breakdown Structure (WBS) simplifié
- Planification & management de projet  
- UI/UX design et prototypes  
- Développement frontend  
- Développement backend & APIs  
- Dashboard admin  
- QA / Tests fonctionnels & sécurité  

---

## 👥 Organisation de l’équipe
- **Frontend Lead – Milan** : UI, navigation, intégration API  
- **Backend Lead – Fresnel** : DB schema, APIs, auth  
- **Backend Feature – Matching** : recommandations, scoring  
- **Admin Dashboard / Cybersécurité – Adrien** : modération & analytics  
- **DevOps / QA – Rayan** : CI/CD, tests, monitoring  

---

## 🚀 Roadmap
**Phase 1 : Conception**  
Définir vision, PBS, WBS, structure de l’équipe et outils.

**Phase 2 : Setup environnement**  
Initialisation GitHub, repos, Docker, dépendances front & back.

**Phase 3 : Authentification**  
Création des comptes utilisateurs, profils, JWT / permissions.

**Phase 4 : CRUD principal**  
Création, lecture, modification et suppression des événements, participation et feedback.

**Phase 5 : Tests & déploiement**  
Tests fonctionnels, sécurité, performance et déploiement staging.

---

## 📊 KPIs Clés (indicatif)
- Nombre d’événements créés  
- Taux de participation  
- Rétention utilisateur  
- Engagement par ville  
- Croissance hebdomadaire

---

## 🔐 Sécurité & Conformité
- Auth JWT & rôles (user/host/admin)  
- Protection XSS / CSRF  
- RGPD : consentement, export, suppression compte  

---

## 🧪 Communication & Outils
- **GitHub** : repository initialisé + tickets P1/P2/P3  
- **Discord** : canaux Frontend / Backend / Admin / QA  
- **Documents** : PBS / WBS / guides de spécifications



