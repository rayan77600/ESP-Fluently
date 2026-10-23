import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventDiscovery, parseFilters } from "@/components/events/EventDiscovery";
import { getEvents } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { MOCK_EVENTS } from "@/lib/mocks/events";

const replace = jest.fn();
let searchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/",
  useSearchParams: () => searchParams,
}));
jest.mock("@/lib/api/events", () => ({ getEvents: jest.fn() }));

const getEventsMock = getEvents as jest.MockedFunction<typeof getEvents>;

function page(data = MOCK_EVENTS.slice(0, 3), total = data.length, pageNumber = 1, limit = 12) {
  return { data, total, page: pageNumber, limit };
}

describe("parseFilters", () => {
  it("lit les filtres valides et ignore les autres", () => {
    expect(
      parseFilters(new URLSearchParams("city=Paris&language=en&type=GAMES&date=2026-11-01&page=2")),
    ).toEqual({ city: "Paris", language: "en", type: "GAMES", date: "2026-11-01", page: 2 });
    expect(parseFilters(new URLSearchParams("type=INCONNU&page=abc"))).toEqual({
      city: undefined,
      language: undefined,
      date: undefined,
      type: undefined,
      page: undefined,
    });
  });
});

describe("EventDiscovery (FRONT-02)", () => {
  beforeEach(() => {
    replace.mockReset();
    getEventsMock.mockReset();
    searchParams = new URLSearchParams();
  });

  it("affiche un état de chargement puis la liste des événements", async () => {
    getEventsMock.mockResolvedValue(page());
    render(<EventDiscovery />);
    expect(screen.getByText("Chargement des événements…")).toBeInTheDocument();
    expect(await screen.findByText("3 événements")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText(MOCK_EVENTS[0].title)).toBeInTheDocument();
  });

  it("indique les événements complets", async () => {
    const full = MOCK_EVENTS.find((e) => e.participantsCount >= e.maxParticipants)!;
    getEventsMock.mockResolvedValue(page([full]));
    render(<EventDiscovery />);
    const card = await screen.findByRole("article");
    expect(within(card).getByText("Complet")).toBeInTheDocument();
  });

  it("transmet les filtres de l'URL à l'API", async () => {
    searchParams = new URLSearchParams("language=es&page=2");
    getEventsMock.mockResolvedValue(page([], 0));
    render(<EventDiscovery />);
    expect(await screen.findByText(/Aucun événement/)).toBeInTheDocument();
    expect(getEventsMock).toHaveBeenCalledWith(
      expect.objectContaining({ language: "es", page: 2 }),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("met à jour l'URL quand on choisit une langue", async () => {
    getEventsMock.mockResolvedValue(page());
    const user = userEvent.setup();
    render(<EventDiscovery />);
    await user.selectOptions(screen.getByLabelText("Langue"), "en");
    expect(replace).toHaveBeenCalledWith("/?language=en", { scroll: false });
  });

  it("applique la ville après une pause de saisie", async () => {
    jest.useFakeTimers();
    try {
      getEventsMock.mockResolvedValue(page());
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<EventDiscovery />);
      await user.type(screen.getByLabelText("Ville"), "Lyon");
      expect(replace).not.toHaveBeenCalled();
      act(() => jest.advanceTimersByTime(300));
      expect(replace).toHaveBeenCalledWith("/?city=Lyon", { scroll: false });
    } finally {
      jest.useRealTimers();
    }
  });

  it("efface tous les filtres", async () => {
    searchParams = new URLSearchParams("language=en&type=GAMES");
    getEventsMock.mockResolvedValue(page());
    const user = userEvent.setup();
    render(<EventDiscovery />);
    await user.click(screen.getByRole("button", { name: "Effacer" }));
    expect(replace).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("affiche une erreur et permet de réessayer", async () => {
    getEventsMock.mockRejectedValueOnce(new ApiError(503, "Service indisponible"));
    getEventsMock.mockResolvedValueOnce(page());
    const user = userEvent.setup();
    render(<EventDiscovery />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Service indisponible");
    await user.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(await screen.findByText("3 événements")).toBeInTheDocument();
  });

  it("affiche un message générique pour une erreur inconnue", async () => {
    getEventsMock.mockRejectedValue(new Error("boom"));
    render(<EventDiscovery />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Impossible de charger");
  });

  it("pagine les résultats", async () => {
    searchParams = new URLSearchParams("page=2");
    getEventsMock.mockResolvedValue(page(MOCK_EVENTS.slice(0, 2), 6, 2, 2));
    const user = userEvent.setup();
    render(<EventDiscovery />);
    expect(await screen.findByText("Page 2 / 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Suivant" }));
    expect(replace).toHaveBeenLastCalledWith("/?page=3", { scroll: false });
    await user.click(screen.getByRole("button", { name: "Précédent" }));
    expect(replace).toHaveBeenLastCalledWith("/", { scroll: false });
  });
});
