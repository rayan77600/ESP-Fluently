from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

# Vérifie que le service est en ligne et répond correctement
def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "matchmaking"}

# Vérifie le filtrage combiné par ville et par langue
def test_filtrage_base():
    response = client.post("/matchmaking", json={"city": "Paris", "language": "fr"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert len(data) == 3

# Vérifie le filtrage par date uniquement (sans préciser la ville ni la langue)
def test_filtrage_date():
    response = client.post("/matchmaking", json={"date": "2027-01-22"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert len(data) == 3

# Vérifie le filtrage par ville uniquement (sans préciser la langue ni la date)
def test_filtrage_ville_seule():
    response = client.post("/matchmaking", json={"city": "Paris"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert len(data) == 5

# Vérifie le filtrage par langue uniquement (sans préciser la ville ni la date)
def test_filtrage_langue_seule():
    response = client.post("/matchmaking", json={"language": "fr"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert len(data) == 6

# Vérifie l'ajout du bonus de score quand le lieu préféré correspond
def test_score_lieu():
    response = client.post("/matchmaking", json={"city": "Paris", "preferred_place_type": "café"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert data[0]["score"] == 70
    assert data[0]["place_type"] == "café"

# Vérifie l'ajout du bonus de score quand le niveau correspond parfaitement
def test_score_niveau_parfait():
    response = client.post("/matchmaking", json={"city": "Paris", "level": "beginner"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert data[0]["score"] == 80
    assert data[0]["level"] == "beginner"

# Vérifie l'ajout d'un bonus partiel quand le niveau est proche
def test_score_niveau_proche():
    response = client.post("/matchmaking", json={"city": "Paris", "language": "en", "level": "beginner"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert data[0]["score"] == 65

# Vérifie que le score maximum est bien atteint quand tous les critères correspondent
def test_score_maximum():
    response = client.post("/matchmaking", json={"city": "Paris", "language": "fr", "level": "beginner", "preferred_place_type": "café"})
    assert response.status_code == 200
    data = response.json()["recommendations"]
    assert data[0]["score"] == 100
    assert data[0]["title"] in ["Café français", "Language Exchange"]

# Vérifie qu'une liste vide est renvoyée quand aucune correspondance n'est trouvée
def test_aucun_resultat():
    response = client.post("/matchmaking", json={"city": "Bordeaux"})
    assert response.status_code == 200
    assert len(response.json()["recommendations"]) == 0