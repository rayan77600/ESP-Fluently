import type {
  EventDetail,
  EventFilters,
  EventSummary,
  Paginated,
  Participation,
} from "@/types";
import { MOCK_EVENTS } from "@/lib/mocks/events";
import { MOCK_EVENT_DETAILS } from "@/lib/mocks/eventDetails";
import { getToken } from "@/lib/session";
import { ApiError, USE_MOCKS, apiFetch, buildQuery } from "./client";

export const DEFAULT_PAGE_SIZE = 12;

/** GET /events — liste filtrée et paginée (BACK-05). */
export function getEvents(
  filters: EventFilters = {},
  init?: RequestInit,
): Promise<Paginated<EventSummary>> {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? DEFAULT_PAGE_SIZE;

  if (USE_MOCKS) return mockGetEvents({ ...filters, page, limit });

  return apiFetch<Paginated<EventSummary>>(
    `/events${buildQuery({
      date: filters.date,
      city: filters.city,
      language: filters.language,
      type: filters.type,
      page,
      limit,
    })}`,
    init,
  );
}

/** Reproduit côté client le filtrage attendu du backend. */
export function filterEvents(events: EventSummary[], filters: EventFilters): EventSummary[] {
  const city = filters.city?.trim().toLowerCase();
  return events
    .filter((e) => !city || e.city.toLowerCase().includes(city))
    .filter((e) => !filters.language || e.languages.some((l) => l.code === filters.language))
    .filter((e) => !filters.type || e.type === filters.type)
    .filter((e) => !filters.date || toLocalDate(e.eventDate) === filters.date)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}

function toLocalDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function mockGetEvents(
  filters: EventFilters & { page: number; limit: number },
): Promise<Paginated<EventSummary>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = filterEvents(MOCK_EVENTS, filters);
  const start = (filters.page - 1) * filters.limit;
  return {
    data: all.slice(start, start + filters.limit),
    total: all.length,
    page: filters.page,
    limit: filters.limit,
  };
}

/** GET /events/:id — détail complet d'un événement. */
export function getEvent(id: string, init?: RequestInit): Promise<EventDetail> {
  if (USE_MOCKS) return mockGetEvent(id);
  return apiFetch<EventDetail>(`/events/${encodeURIComponent(id)}`, init);
}

/** POST /events/:id/join — rejoindre un événement (BACK-06). */
export function joinEvent(id: string): Promise<Participation> {
  if (USE_MOCKS) return mockJoinEvent(id);
  return apiFetch<Participation>(`/events/${encodeURIComponent(id)}/join`, { method: "POST" });
}

// Participations créées pendant la session en mode mock.
const mockJoined = new Set<string>();

async function mockGetEvent(id: string): Promise<EventDetail> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const event = MOCK_EVENT_DETAILS[id];
  if (!event) throw new ApiError(404, "Cet événement n'existe pas ou a été supprimé.");
  if (!mockJoined.has(id)) return event;
  return {
    ...event,
    participantsCount: event.participantsCount + 1,
    myParticipation: { status: "ACCEPTED" },
  };
}

async function mockJoinEvent(id: string): Promise<Participation> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!getToken()) throw new ApiError(401, "Connectez-vous pour rejoindre cet événement.");
  const event = MOCK_EVENT_DETAILS[id];
  if (!event) throw new ApiError(404, "Cet événement n'existe pas ou a été supprimé.");
  if (mockJoined.has(id)) throw new ApiError(409, "Vous participez déjà à cet événement.");
  if (event.participantsCount >= event.maxParticipants) {
    throw new ApiError(409, "Cet événement est complet.");
  }
  mockJoined.add(id);
  return { id: `p-${id}`, eventId: id, status: "ACCEPTED", joinedAt: new Date().toISOString() };
}
