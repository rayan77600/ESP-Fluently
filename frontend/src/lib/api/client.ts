import { getToken } from "@/lib/session";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Les mocks sont actifs si demandés explicitement ou si aucune URL d'API n'est configurée. */
export const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === "true" || API_URL === "";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    /** Messages de validation détaillés renvoyés par NestJS (class-validator). */
    public readonly details: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type QueryValue = string | number | undefined | null;

export function buildQuery(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

/**
 * Appel JSON vers le backend NestJS. Ajoute le JWT s'il existe et normalise
 * les erreurs au format NestJS ({ statusCode, message: string | string[] }).
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body !== undefined) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, "Impossible de joindre le serveur. Vérifiez votre connexion.");
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const raw = body?.message;
    const details = Array.isArray(raw) ? raw.map(String) : [];
    const message =
      typeof raw === "string" ? raw : details[0] ?? `Erreur ${response.status}`;
    throw new ApiError(response.status, message, details);
  }

  return body as T;
}
