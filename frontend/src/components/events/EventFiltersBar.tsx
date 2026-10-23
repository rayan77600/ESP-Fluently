"use client";

import type { EventFilters, EventType } from "@/types";
import { EVENT_TYPE_LABELS, LANGUAGES } from "@/lib/languages";

type EditableFilters = Pick<EventFilters, "date" | "city" | "language" | "type">;

const controlClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

export function EventFiltersBar({
  filters,
  onChange,
  onReset,
}: {
  filters: EditableFilters;
  onChange: (next: EditableFilters) => void;
  onReset: () => void;
}) {
  const hasFilters = Object.values(filters).some(Boolean);

  function set<K extends keyof EditableFilters>(key: K, value: string) {
    onChange({ ...filters, [key]: value || undefined });
  }

  return (
    <form
      role="search"
      aria-label="Filtrer les événements"
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-4"
    >
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="filter-city" className="mb-1 block text-xs font-medium text-muted">
          Ville
        </label>
        <input
          id="filter-city"
          type="search"
          placeholder="Paris, Lyon…"
          className={controlClass}
          value={filters.city ?? ""}
          onChange={(e) => set("city", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filter-language" className="mb-1 block text-xs font-medium text-muted">
          Langue
        </label>
        <select
          id="filter-language"
          className={controlClass}
          value={filters.language ?? ""}
          onChange={(e) => set("language", e.target.value)}
        >
          <option value="">Toutes</option>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-type" className="mb-1 block text-xs font-medium text-muted">
          Type
        </label>
        <select
          id="filter-type"
          className={controlClass}
          value={filters.type ?? ""}
          onChange={(e) => set("type", e.target.value as EventType)}
        >
          <option value="">Tous</option>
          {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="filter-date" className="mb-1 block text-xs font-medium text-muted">
          Date
        </label>
        <div className="flex gap-2">
          <input
            id="filter-date"
            type="date"
            className={controlClass}
            value={filters.date ?? ""}
            onChange={(e) => set("date", e.target.value)}
          />
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="shrink-0 rounded-lg px-2 text-sm font-medium text-brand hover:bg-brand-soft"
            >
              Effacer
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
