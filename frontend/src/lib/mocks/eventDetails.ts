import type { EventDetail, EventSummary, UserPreview } from "@/types";
import { MOCK_EVENTS } from "./events";

const PEOPLE = ["Inès", "Tom", "Aïcha", "Lucas", "Mei", "Hugo", "Sofia", "Karim", "Julie", "Nathan",
  "Chloé", "Yanis", "Léa", "Omar", "Camille", "Rafael"];

const PHOTO_COLORS = ["#c7d2fe", "#fbcfe8", "#bbf7d0", "#fde68a", "#bae6fd", "#ddd6fe"];

function person(index: number): UserPreview {
  return { id: `u${index}`, firstName: PEOPLE[index % PEOPLE.length] };
}

/** Image de remplacement en SVG inline, pour éviter toute dépendance réseau en mode mock. */
function placeholderPhoto(color: string, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#334155" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function toDetail(event: EventSummary): EventDetail {
  const participants = Array.from({ length: event.participantsCount }, (_, i) =>
    person(i + Number(event.id) * 3),
  );
  const photoCount = Number(event.id) % 3 === 0 ? 0 : Math.min(participants.length, 4);

  return {
    ...event,
    participants,
    photos: Array.from({ length: photoCount }, (_, i) => ({
      id: `${event.id}-p${i}`,
      url: placeholderPhoto(PHOTO_COLORS[i % PHOTO_COLORS.length], `Photo ${i + 1}`),
      uploadedBy: participants[i],
    })),
    recentMessages: participants.slice(0, 3).map((user, i) => ({
      id: `${event.id}-m${i}`,
      content: ["Hâte d'y être !", "Quelqu'un vient en vélo ?", "Je serai un peu en retard."][i],
      createdAt: new Date(Date.now() - (3 - i) * 3_600_000).toISOString(),
      user,
    })),
    myParticipation: null,
  };
}

export const MOCK_EVENT_DETAILS: Record<string, EventDetail> = Object.fromEntries(
  MOCK_EVENTS.map((event) => [event.id, toDetail(event)]),
);
