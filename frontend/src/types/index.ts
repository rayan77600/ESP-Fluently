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

export type ParticipationStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export interface UserPreview {
  id: string;
  firstName: string;
  avatarUrl?: string | null;
}

export interface EventPhoto {
  id: string;
  url: string;
  uploadedBy: UserPreview;
}

export interface EventMessage {
  id: string;
  content: string;
  createdAt: string; // ISO 8601
  user: UserPreview;
}

/** Détail complet d'un événement (GET /events/:id). */
export interface EventDetail extends EventSummary {
  participants: UserPreview[];
  photos: EventPhoto[];
  /** Derniers messages du chat de groupe (le temps réel arrive avec FRONT-05). */
  recentMessages: EventMessage[];
  /** Participation de l'utilisateur connecté, null s'il n'a pas rejoint ou n'est pas connecté. */
  myParticipation: { status: ParticipationStatus } | null;
}

/** Réponse de POST /events/:id/join (BACK-06). */
export interface Participation {
  id: string;
  eventId: string;
  status: ParticipationStatus;
  joinedAt: string;
}
