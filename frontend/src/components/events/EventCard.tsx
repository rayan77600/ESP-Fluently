import Link from "next/link";
import type { EventSummary } from "@/types";
import { EVENT_TYPE_LABELS } from "@/lib/languages";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function EventCard({ event }: { event: EventSummary }) {
  const isFull = event.participantsCount >= event.maxParticipants;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">
          {EVENT_TYPE_LABELS[event.type]}
        </span>
        <time dateTime={event.eventDate} className="text-muted capitalize">
          {dateFormatter.format(new Date(event.eventDate))}
        </time>
      </div>

      <h2 className="text-lg font-semibold leading-snug">
        <Link href={`/events/${event.id}`} className="hover:text-brand">
          {event.title}
        </Link>
      </h2>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{event.description}</p>

      <p className="mt-3 text-sm">
        📍 {event.location}, {event.city}
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Langues pratiquées">
        {event.languages.map((language) => (
          <li
            key={language.code}
            className="rounded-md border border-border px-2 py-0.5 text-xs font-medium"
          >
            {language.name}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-4 text-sm">
        <span className="text-muted">Hôte : {event.host.firstName}</span>
        <span className={isFull ? "font-semibold text-danger" : "font-medium"}>
          {isFull ? "Complet" : `${event.participantsCount}/${event.maxParticipants} participants`}
        </span>
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="h-56 animate-pulse rounded-2xl border border-border bg-surface p-5" aria-hidden>
      <div className="h-4 w-24 rounded bg-border" />
      <div className="mt-4 h-5 w-3/4 rounded bg-border" />
      <div className="mt-2 h-4 w-full rounded bg-border" />
      <div className="mt-6 h-4 w-1/2 rounded bg-border" />
    </div>
  );
}
