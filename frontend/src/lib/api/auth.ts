import type { AuthResponse, RegisterPayload } from "@/types";
import { ApiError, USE_MOCKS, apiFetch } from "./client";

/** Adresse déjà utilisée dans le mode mock, pour tester le cas d'erreur 409. */
export const MOCK_TAKEN_EMAIL = "deja.inscrit@fluently.app";

/** POST /auth/register (BACK-01) — retourne un JWT. */
export function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (USE_MOCKS) return mockRegister(payload);

  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function mockRegister(payload: RegisterPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (payload.email.toLowerCase() === MOCK_TAKEN_EMAIL) {
    throw new ApiError(409, "Un compte existe déjà avec cette adresse e-mail.");
  }
  return { accessToken: "mock-jwt-token" };
}
