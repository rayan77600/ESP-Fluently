import type { EventSummary } from "@/types";

// Données de démonstration utilisées tant que GET /events (BACK-05) n'est pas disponible.
// Les dates sont relatives à aujourd'hui pour que la liste reste pertinente.
function inDays(days: number, hour: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const MOCK_EVENTS: EventSummary[] = [
  {
    id: "1",
    title: "Afterwork English Speaking",
    description: "On se retrouve autour d'un verre pour parler anglais, tous niveaux bienvenus.",
    city: "Paris",
    location: "Le Comptoir Général, 10e",
    eventDate: inDays(1, 19),
    type: "LANGUAGE_CAFE",
    languages: [{ code: "en", name: "Anglais" }],
    maxParticipants: 12,
    participantsCount: 8,
    host: { id: "h1", firstName: "Sarah" },
  },
  {
    id: "2",
    title: "Tapas y conversación",
    description: "Soirée espagnol : petites tables de 4, rotation toutes les 20 minutes.",
    city: "Paris",
    location: "Bar Lolita, 11e",
    eventDate: inDays(2, 20),
    type: "CONVERSATION_TABLE",
    languages: [{ code: "es", name: "Espagnol" }],
    maxParticipants: 16,
    participantsCount: 16,
    host: { id: "h2", firstName: "Diego" },
  },
  {
    id: "3",
    title: "Balade au canal Saint-Martin",
    description: "Promenade bilingue français / allemand le long du canal.",
    city: "Paris",
    location: "Métro Jacques Bonsergent",
    eventDate: inDays(3, 15),
    type: "OUTDOOR",
    languages: [
      { code: "de", name: "Allemand" },
      { code: "fr", name: "Français" },
    ],
    maxParticipants: 10,
    participantsCount: 4,
    host: { id: "h3", firstName: "Lena" },
  },
  {
    id: "4",
    title: "Soirée jeux de société en japonais",
    description: "Découvrez des jeux japonais en pratiquant la langue. Niveau intermédiaire conseillé.",
    city: "Paris",
    location: "Le Dernier Bar avant la Fin du Monde, 1er",
    eventDate: inDays(5, 19),
    type: "GAMES",
    languages: [{ code: "ja", name: "Japonais" }],
    maxParticipants: 8,
    participantsCount: 3,
    host: { id: "h4", firstName: "Yuki" },
  },
  {
    id: "5",
    title: "Visite du Louvre en italien",
    description: "Visite guidée des salles italiennes, échanges en italien uniquement.",
    city: "Paris",
    location: "Musée du Louvre, Pyramide",
    eventDate: inDays(7, 11),
    type: "CULTURE",
    languages: [{ code: "it", name: "Italien" }],
    maxParticipants: 15,
    participantsCount: 9,
    host: { id: "h5", firstName: "Marco" },
  },
  {
    id: "6",
    title: "English Book Club",
    description: "Discussion autour du livre du mois. Ce mois-ci : « The Midnight Library ».",
    city: "Lyon",
    location: "Librairie Decitre, Bellecour",
    eventDate: inDays(4, 18),
    type: "CULTURE",
    languages: [{ code: "en", name: "Anglais" }],
    maxParticipants: 12,
    participantsCount: 6,
    host: { id: "h6", firstName: "Emma" },
  },
];
