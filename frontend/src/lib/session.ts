// Stockage du JWT côté client. Isolé ici pour pouvoir basculer vers un cookie
// httpOnly posé par le backend sans toucher au reste de l'application.

const TOKEN_KEY = "fluently.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Stockage indisponible (navigation privée) : la session ne survivra pas au rechargement.
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignoré
  }
}
