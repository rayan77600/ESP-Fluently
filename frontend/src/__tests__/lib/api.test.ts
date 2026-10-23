import { ApiError, apiFetch, buildQuery } from "@/lib/api/client";
import { MOCK_TAKEN_EMAIL, register } from "@/lib/api/auth";
import { filterEvents, getEvents } from "@/lib/api/events";
import { MOCK_EVENTS } from "@/lib/mocks/events";
import { setToken, clearToken, getToken } from "@/lib/session";

function mockFetch(status: number, body: unknown) {
  const fn = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
  global.fetch = fn as unknown as typeof fetch;
  return fn;
}

describe("buildQuery", () => {
  it("ignore les valeurs vides", () => {
    expect(buildQuery({ city: "Paris", language: "", type: undefined, page: 2 })).toBe(
      "?city=Paris&page=2",
    );
    expect(buildQuery({})).toBe("");
  });
});

describe("apiFetch", () => {
  afterEach(() => clearToken());

  it("envoie le JWT et renvoie le JSON", async () => {
    setToken("abc");
    const fetchMock = mockFetch(200, { ok: true });
    await expect(apiFetch("/users/me")).resolves.toEqual({ ok: true });
    const headers = fetchMock.mock.calls[0][1].headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer abc");
  });

  it("normalise les erreurs de validation NestJS", async () => {
    mockFetch(400, { statusCode: 400, message: ["email must be an email", "password too short"] });
    const error = await apiFetch<never>("/auth/register", { method: "POST", body: "{}" }).catch(
      (e: ApiError) => e,
    );
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(400);
    expect(error.message).toBe("email must be an email");
    expect(error.details).toHaveLength(2);
  });

  it("utilise le message texte ou un message générique", async () => {
    mockFetch(409, { message: "Email déjà utilisé" });
    await expect(apiFetch("/x")).rejects.toThrow("Email déjà utilisé");
    mockFetch(500, null);
    await expect(apiFetch("/x")).rejects.toThrow("Erreur 500");
  });

  it("signale une erreur réseau", async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError("offline")) as unknown as typeof fetch;
    await expect(apiFetch("/x")).rejects.toMatchObject({ status: 0 });
  });
});

describe("session", () => {
  it("stocke et efface le token", () => {
    setToken("t");
    expect(getToken()).toBe("t");
    clearToken();
    expect(getToken()).toBeNull();
  });
});

describe("mocks (aucune NEXT_PUBLIC_API_URL)", () => {
  it("register renvoie un token ou une 409", async () => {
    await expect(
      register({ email: "new@fluently.app", password: "x", languages: ["en"] }),
    ).resolves.toHaveProperty("accessToken");
    await expect(
      register({ email: MOCK_TAKEN_EMAIL, password: "x", languages: ["en"] }),
    ).rejects.toMatchObject({ status: 409 });
  });

  it("getEvents pagine les résultats", async () => {
    const first = await getEvents({ limit: 2 });
    expect(first.data).toHaveLength(2);
    expect(first.total).toBe(MOCK_EVENTS.length);
    const last = await getEvents({ limit: 4, page: 2 });
    expect(last.data).toHaveLength(MOCK_EVENTS.length - 4);
  });
});

describe("filterEvents", () => {
  it("filtre par ville, langue et type", () => {
    expect(filterEvents(MOCK_EVENTS, { city: "lyon" }).map((e) => e.id)).toEqual(["6"]);
    expect(filterEvents(MOCK_EVENTS, { language: "de" }).map((e) => e.id)).toEqual(["3"]);
    expect(filterEvents(MOCK_EVENTS, { type: "CULTURE" })).toHaveLength(2);
  });

  it("filtre par date locale et trie chronologiquement", () => {
    const target = MOCK_EVENTS[0];
    const d = new Date(target.eventDate);
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    expect(filterEvents(MOCK_EVENTS, { date }).map((e) => e.id)).toEqual([target.id]);

    const sorted = filterEvents(MOCK_EVENTS, {});
    expect(sorted.map((e) => e.eventDate)).toEqual([...sorted.map((e) => e.eventDate)].sort());
  });
});
