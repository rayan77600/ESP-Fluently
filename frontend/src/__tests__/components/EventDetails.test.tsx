import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventDetails } from "@/components/events/EventDetails";
import { getEvent, joinEvent } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { MOCK_EVENT_DETAILS } from "@/lib/mocks/eventDetails";
import { clearToken, setToken } from "@/lib/session";
import type { EventDetail } from "@/types";

const push = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
jest.mock("@/lib/api/events", () => ({ getEvent: jest.fn(), joinEvent: jest.fn() }));

const getEventMock = getEvent as jest.MockedFunction<typeof getEvent>;
const joinEventMock = joinEvent as jest.MockedFunction<typeof joinEvent>;

// Événement 1 : 8/12 participants, avec photos et messages.
const openEvent = MOCK_EVENT_DETAILS["1"];
// Événement 2 : complet.
const fullEvent = MOCK_EVENT_DETAILS["2"];

function withOverrides(overrides: Partial<EventDetail>): EventDetail {
  return { ...openEvent, ...overrides };
}

describe("EventDetails (FRONT-03)", () => {
  beforeEach(() => {
    push.mockReset();
    getEventMock.mockReset();
    joinEventMock.mockReset();
    clearToken();
  });

  it("affiche le détail : hôte, langues, participants, chat et album", async () => {
    getEventMock.mockResolvedValue(openEvent);
    render(<EventDetails id="1" />);
    expect(screen.getByText("Chargement de l'événement…")).toBeInTheDocument();

    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(openEvent.title);
    expect(getEventMock).toHaveBeenCalledWith("1", expect.objectContaining({ signal: expect.any(AbortSignal) }));
    expect(screen.getByText(openEvent.host.firstName)).toBeInTheDocument();
    expect(screen.getByText("Anglais")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Participants (8/12)" })).toBeInTheDocument();
    expect(screen.getByText("4 places restantes")).toBeInTheDocument();
    expect(screen.getByText(openEvent.recentMessages[0].content)).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(openEvent.photos.length);
  });

  it("affiche des états vides pour participants, chat et album", async () => {
    getEventMock.mockResolvedValue(
      withOverrides({ participants: [], participantsCount: 11, recentMessages: [], photos: [] }),
    );
    render(<EventDetails id="1" />);
    expect(await screen.findByText(/Soyez le premier/)).toBeInTheDocument();
    expect(screen.getByText("Aucun message pour le moment.")).toBeInTheDocument();
    expect(screen.getByText(/Aucune photo/)).toBeInTheDocument();
    expect(screen.getByText("1 place restante")).toBeInTheDocument();
  });

  it("affiche les avatars quand ils existent", async () => {
    getEventMock.mockResolvedValue(
      withOverrides({ host: { id: "h", firstName: "Sarah", avatarUrl: "/sarah.png" }, photos: [] }),
    );
    const { container } = render(<EventDetails id="1" />);
    await screen.findByRole("heading", { level: 1 });
    expect(container.querySelector('img[src="/sarah.png"]')).toBeInTheDocument();
  });

  it("désactive le bouton quand l'événement est complet", async () => {
    getEventMock.mockResolvedValue(fullEvent);
    render(<EventDetails id="2" />);
    const aside = (await screen.findByText("Places")).closest("div")!;
    expect(within(aside).getByRole("button", { name: "Complet" })).toBeDisabled();
  });

  it("renvoie vers l'inscription si l'utilisateur n'est pas connecté", async () => {
    getEventMock.mockResolvedValue(openEvent);
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    await user.click(await screen.findByRole("button", { name: "Rejoindre" }));
    expect(push).toHaveBeenCalledWith("/register");
    expect(joinEventMock).not.toHaveBeenCalled();
  });

  it("rejoint l'événement et met à jour l'affichage", async () => {
    setToken("jwt");
    getEventMock.mockResolvedValue(openEvent);
    joinEventMock.mockResolvedValue({
      id: "p1",
      eventId: "1",
      status: "ACCEPTED",
      joinedAt: new Date().toISOString(),
    });
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    await user.click(await screen.findByRole("button", { name: "Rejoindre" }));

    expect(joinEventMock).toHaveBeenCalledWith("1");
    expect(await screen.findByRole("status")).toHaveTextContent("Vous participez");
    expect(screen.getByRole("heading", { name: "Participants (9/12)" })).toBeInTheDocument();
  });

  it.each([
    ["PENDING", "en attente de l'hôte"],
    ["DECLINED", "refusée"],
  ] as const)("affiche le statut de participation %s", async (status, text) => {
    getEventMock.mockResolvedValue(withOverrides({ myParticipation: { status } }));
    render(<EventDetails id="1" />);
    expect(await screen.findByRole("status")).toHaveTextContent(text);
    expect(screen.queryByRole("button", { name: "Rejoindre" })).not.toBeInTheDocument();
  });

  it("affiche l'erreur de l'API quand l'inscription échoue", async () => {
    setToken("jwt");
    getEventMock.mockResolvedValue(openEvent);
    joinEventMock.mockRejectedValue(new ApiError(409, "Cet événement est complet."));
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    await user.click(await screen.findByRole("button", { name: "Rejoindre" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Cet événement est complet.");
    expect(screen.getByRole("button", { name: "Rejoindre" })).toBeEnabled();
  });

  it("affiche un message générique pour une erreur inconnue à l'inscription", async () => {
    setToken("jwt");
    getEventMock.mockResolvedValue(openEvent);
    joinEventMock.mockRejectedValue(new Error("boom"));
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    await user.click(await screen.findByRole("button", { name: "Rejoindre" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Impossible de rejoindre");
  });

  it("renvoie vers l'inscription si le token a expiré (401)", async () => {
    setToken("expired");
    getEventMock.mockResolvedValue(openEvent);
    joinEventMock.mockRejectedValue(new ApiError(401, "Unauthorized"));
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    await user.click(await screen.findByRole("button", { name: "Rejoindre" }));
    expect(push).toHaveBeenCalledWith("/register");
  });

  it("propose un retour à la liste si l'événement n'existe pas", async () => {
    getEventMock.mockRejectedValue(new ApiError(404, "Cet événement n'existe pas."));
    render(<EventDetails id="999" />);
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Cet événement n'existe pas.");
    expect(within(alert).getByRole("link", { name: "Retour aux événements" })).toHaveAttribute("href", "/");
  });

  it("permet de réessayer après une erreur réseau", async () => {
    getEventMock.mockRejectedValueOnce(new Error("offline"));
    getEventMock.mockResolvedValueOnce(openEvent);
    const user = userEvent.setup();
    render(<EventDetails id="1" />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Impossible de charger");
    await user.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(openEvent.title);
  });
});
