from fastapi import FastAPI
from models import MatchmakingRequest, MatchmakingResponse, Event

app = FastAPI(title="Matchmaking Service", version="1.0")

EVENTS = [
    Event(eventId=1, title="Café français", city="Paris", language="fr", date="2027-01-15", place_type="café", level="beginner"),
    Event(eventId=2, title="English Meetup", city="Paris", language="en", date="2027-01-20", place_type="bar", level="intermediate"),
    Event(eventId=3, title="Spanish Night", city="Lyon", language="es", date="2027-02-01", place_type="bar", level="beginner"),
    Event(eventId=4, title="Ciné-club français", city="Paris", language="fr", date="2027-01-18", place_type="cinéma", level="advanced"),
    Event(eventId=5, title="Language Exchange", city="Paris", language="fr", date="2027-01-22", place_type="café", level="beginner"),
    Event(eventId=6, title="Pique-nique anglais", city="Paris", language="en", date="2027-02-05", place_type="parc", level="intermediate"),
    Event(eventId=7, title="Atelier de conversation", city="Paris", language="fr", date="2027-02-10", place_type="bibliothèque", level="advanced"),
    Event(eventId=8, title="Soirée française Marseille", city="Marseille", language="fr", date="2027-01-22", place_type="bar", level="beginner"),
    Event(eventId=9, title="Café philo Marseille", city="Marseille", language="fr", date="2027-01-22", place_type="café", level="advanced"),
]

@app.get("/")
def root():
    return {"service": "matchmaking", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "matchmaking"}

@app.post("/matchmaking", response_model=MatchmakingResponse)
def matchmaking(request: MatchmakingRequest):
    results = []
    
    for e in EVENTS:
        # 1. Filtrage dynamique (Ville, Langue, Date)
        if request.city and e.city != request.city:
            continue
        if request.language and e.language != request.language:
            continue
        if request.date and e.date != request.date:
            continue
                
        # 2. Calcul du score pondéré (Système de points)
        score = 50  # Base (Ville + Langue)
        
        # Bonus Lieu (+20)
        if request.preferred_place_type and e.place_type == request.preferred_place_type:
            score += 20
            
        # Bonus Niveau (+30, +15 ou 0)
        if request.level:
            if request.level == e.level:
                score += 30  # Match parfait
            elif (request.level == "intermediate" and e.level in ["beginner", "advanced"]) or \
                 (request.level == "beginner" and e.level == "intermediate") or \
                 (request.level == "advanced" and e.level == "intermediate"):
                score += 15  # Match partiel (niveau proche)
            # Si le niveau est trop éloigné (ex: beginner vs advanced), on n'ajoute rien (0)
            
        e.score = score
        results.append(e)
    
    # 3. Tri par score décroissant
    results.sort(key=lambda x: x.score, reverse=True)
    
    return MatchmakingResponse(recommendations=results)