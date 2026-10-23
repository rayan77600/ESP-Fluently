import type { EventType, Language } from "@/types";

// Liste locale en attendant un endpoint de référence (table Language du backend).
export const LANGUAGES: Language[] = [
  { code: "fr", name: "Français" },
  { code: "en", name: "Anglais" },
  { code: "es", name: "Espagnol" },
  { code: "de", name: "Allemand" },
  { code: "it", name: "Italien" },
  { code: "pt", name: "Portugais" },
  { code: "ja", name: "Japonais" },
  { code: "zh", name: "Chinois" },
  { code: "ar", name: "Arabe" },
];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  LANGUAGE_CAFE: "Café linguistique",
  CONVERSATION_TABLE: "Table de conversation",
  OUTDOOR: "Sortie en extérieur",
  CULTURE: "Culture",
  GAMES: "Jeux",
};
