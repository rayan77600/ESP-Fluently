"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { EventFilters, EventSummary, EventType, Paginated } from "@/types";
import { getEvents } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { EVENT_TYPE_LABELS } from "@/lib/languages";
import { EventCard, EventCardSkeleton } from "./EventCard";
import { EventFiltersBar } from "./EventFiltersBar";

type Result =
  | { status: "error"; message: string }
  | { status: "success"; result: Paginated<EventSummary> };

type State = { status: "loading" } | Result;

/** Lit les filtres depuis l'URL pour que la recherche soit partageable et survive au rechargement. */
export function parseFilters(params: URLSearchParams): EventFilters {
  const type = params.get("type");
  const page = Number(params.get("page"));
  return {
    city: params.get("city") || undefined,
    language: params.get("language") || undefined,
    date: params.get("date") || undefined,
    type: type && type in EVENT_TYPE_LABELS ? (type as EventType) : undefined,
    page: Number.isInteger(page) && page > 1 ? page : undefined,
  };
}

const CITY_DEBOUNCE_MS = 300;

export function EventDiscovery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));
  const queryKey = searchParams.toString();

  // La ville est saisie au clavier : on garde une valeur locale et on ne met l'URL à jour qu'après une pause.
  const [cityInput, setCityInput] = useState(filters.city ?? "");
  const [reloadKey, setReloadKey] = useState(0);
  // Le résultat est associé à la requête qui l'a produit : tant qu'il ne correspond
  // pas à la requête courante, on est en chargement (pas de setState synchrone dans l'effet).
  const requestKey = `${queryKey}#${reloadKey}`;
  const [response, setResponse] = useState<{ key: string; result: Result } | null>(null);
  const state: State =
    response?.key === requestKey ? response.result : { status: "loading" };

  function pushFilters(next: EventFilters) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(next)) {
      // La page 1 est implicite pour garder des URLs propres.
      if (value && !(key === "page" && value === 1)) params.set(key, String(value));
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  // Le debounce doit lire les filtres à jour au moment où il se déclenche, pas ceux de la frappe.
  const latestQuery = useRef(queryKey);
  useEffect(() => {
    latestQuery.current = queryKey;
  }, [queryKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = parseFilters(new URLSearchParams(latestQuery.current));
      const city = cityInput.trim() || undefined;
      if (city === current.city) return;
      pushFilters({ ...current, city, page: undefined });
    }, CITY_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seule la saisie déclenche le debounce
  }, [cityInput]);

  useEffect(() => {
    const controller = new AbortController();
    getEvents(parseFilters(new URLSearchParams(queryKey)), { signal: controller.signal })
      .then((result) => setResponse({ key: requestKey, result: { status: "success", result } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResponse({
          key: requestKey,
          result: {
            status: "error",
            message:
              error instanceof ApiError ? error.message : "Impossible de charger les événements.",
          },
        });
      });
    return () => controller.abort();
  }, [queryKey, requestKey]);

  const page = filters.page ?? 1;
  const totalPages =
    state.status === "success" ? Math.max(1, Math.ceil(state.result.total / state.result.limit)) : 1;

  return (
    <div className="space-y-6">
      <EventFiltersBar
        filters={{
          city: cityInput || undefined,
          language: filters.language,
          type: filters.type,
          date: filters.date,
        }}
        onChange={(next) => {
          if ((next.city ?? "") !== cityInput) {
            setCityInput(next.city ?? "");
            return;
          }
          pushFilters({ ...next, city: filters.city, page: undefined });
        }}
        onReset={() => {
          setCityInput("");
          pushFilters({});
        }}
      />

      <section aria-live="polite" aria-busy={state.status === "loading"}>
        {state.status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <EventCardSkeleton key={i} />
            ))}
            <span className="sr-only">Chargement des événements…</span>
          </div>
        )}

        {state.status === "error" && (
          <div role="alert" className="rounded-2xl border border-danger/40 bg-danger/10 p-6 text-center">
            <p className="text-danger">{state.message}</p>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="mt-3 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              Réessayer
            </button>
          </div>
        )}

        {state.status === "success" && state.result.data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-medium">Aucun événement ne correspond à votre recherche.</p>
            <p className="mt-1 text-sm text-muted">Essayez d&apos;élargir vos filtres.</p>
          </div>
        )}

        {state.status === "success" && state.result.data.length > 0 && (
          <>
            <p className="mb-3 text-sm text-muted">
              {state.result.total} événement{state.result.total > 1 ? "s" : ""}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {state.result.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-3 text-sm">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => pushFilters({ ...filters, page: page - 1 })}
                  className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40"
                >
                  Précédent
                </button>
                <span>
                  Page {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => pushFilters({ ...filters, page: page + 1 })}
                  className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40"
                >
                  Suivant
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}
