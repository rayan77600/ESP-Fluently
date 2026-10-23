// Types partagés alignés sur le diagramme UML (BD_UML_Structure) et les tickets BACK-01 / BACK-05.

export type LanguageLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "NATIVE";

export interface Language {
  code: string;
  name: string;
}

export type EventType =
  | "LANGUAGE_CAFE"
  | "CONVERSATION_TABLE"
  | "OUTDOOR"
  | "CULTURE"
  | "GAMES";

/** Aperçu d'un événement tel que renvoyé par GET /events. */
export interface EventSummary {
  id: string;
  title: string;
  description: string;
  city: string;
  location: string;
  eventDate: string; // ISO 8601
  type: EventType;
  languages: Language[];
  maxParticipants: number;
  participantsCount: number;
  host: {
    id: string;
    firstName: string;
    avatarUrl?: string | null;
  };
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface EventFilters {
  date?: string; // YYYY-MM-DD
  city?: string;
  language?: string; // code langue (ex. "en")
  type?: EventType;
  page?: number;
  limit?: number;
}

/** Body de POST /auth/register (BACK-01). */
export interface RegisterPayload {
  email: string;
  password: string;
  languages: string[]; // codes langue
}

export interface AuthResponse {
  accessToken: string;
}
