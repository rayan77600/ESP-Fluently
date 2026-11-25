from pydantic import BaseModel
from typing import List, Optional

class MatchmakingRequest(BaseModel):
    city: Optional[str] = None
    language: Optional[str] = None
    date: Optional[str] = None
    level: Optional[str] = None  
    preferred_place_type: Optional[str] = None

class Event(BaseModel):
    eventId: int
    title: str
    city: str
    language: str
    date: str
    place_type: str
    level: str
    score: int = 0

class MatchmakingResponse(BaseModel):
    recommendations: List[Event]