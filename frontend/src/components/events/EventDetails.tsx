"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EventDetail, ParticipationStatus, UserPreview } from "@/types";
import { getEvent } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { EVENT_TYPE_LABELS } from "@/lib/languages";
import { JoinEventButton } from "./JoinEventButton";

type Result =
  | { status: "error"; code: number; message: string }
  | { status: "success"; event: EventDetail };

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

export function EventDetails({ id }: { id: string }) {
  const [reloadKey, setReloadKey] = useState(0);
  // Même principe que la page de découverte : le résultat est lié à la requête qui l'a produit.
  const requestKey = `${id}#${reloadKey}`;
  const [response, setResponse] = useState<{ key: string; result: Result } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getEvent(id, { signal: controller.signal })
      .then((event) => setResponse({ key: requestKey, result: { status: "success", event } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResponse({
          key: requestKey,
          result: {
            status: "error",
            code: error instanceof ApiError ? error.status : 0,
            message:
              error instanceof ApiError ? error.message : "Impossible de charger l'événement.",
          },
        });
      });
    return () => controller.abort();
  }, [id, requestKey]);

  if (response?.key !== requestKey) return <EventDetailsSkeleton />;

  const { result } = response;

  if (result.status === "error") {
    return (
      <div role="alert" className="rounded-2xl border border-danger/40 bg-danger/10 p-8 text-center">
        <p className="text-danger">{result.message}</p>
        {result.code === 404 ? (
          <Link href="/" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
            Retour aux événements
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-3 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Réessayer
          </button>
        )}
      </div>
    );
  }

  const { event } = result;

  function handleJoined(status: ParticipationStatus) {
    setResponse({
      key: requestKey,
      result: {
        status: "success",
        event: {
          ...event,
          participantsCount: event.participantsCount + 1,
          myParticipation: { status },
        },
      },
    });
  }

  const remaining = Math.max(0, event.maxParticipants - event.participantsCount);
  const isFull = remaining === 0;

  return (
    <article className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <header className="lg:col-start-1">
        <Link href="/" className="text-sm font-medium text-brand hover:underline">
          ← Tous les événements
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">
            {EVENT_TYPE_LABELS[event.type]}
          </span>
          {event.languages.map((language) => (
            <span key={language.code} className="rounded-md border border-border px-2 py-0.5">
              {language.name}
            </span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{event.title}</h1>
        <p className="mt-2 text-muted first-letter:uppercase">
          <time dateTime={event.eventDate}>{dateFormatter.format(new Date(event.eventDate))}</time>
        </p>
        <p className="mt-1">
          📍 {event.location}, {event.city}
        </p>
      </header>

      {/* Sur mobile, la carte « Rejoindre » suit directement le titre. */}
      <aside className="space-y-4 lg:sticky lg:top-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="mb-1 text-sm text-muted">Places</p>
          <p className="mb-4 text-lg font-semibold">
            {isFull
              ? "Complet"
              : remaining > 1
                ? `${remaining} places restantes`
                : "1 place restante"}
          </p>
          <JoinEventButton
            eventId={event.id}
            isFull={isFull}
            status={event.myParticipation?.status ?? null}
            onJoined={handleJoined}
          />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="mb-2 text-sm text-muted">Organisé par</p>
          <div className="flex items-center gap-3">
            <Avatar user={event.host} size="lg" />
            <span className="font-semibold">{event.host.firstName}</span>
          </div>
        </div>
      </aside>

      <div className="space-y-6 lg:col-start-1">
        <Section title="Description">
          <p className="whitespace-pre-line">{event.description}</p>
        </Section>

        <Section title={`Participants (${event.participantsCount}/${event.maxParticipants})`}>
          {event.participants.length === 0 ? (
            <p className="text-sm text-muted">Soyez le premier à rejoindre cet événement !</p>
          ) : (
            <ul className="flex flex-wrap gap-3">
              {event.participants.map((participant) => (
                <li key={participant.id} className="flex items-center gap-2 text-sm">
                  <Avatar user={participant} />
                  {participant.firstName}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Chat du groupe">
          {event.recentMessages.length === 0 ? (
            <p className="text-sm text-muted">Aucun message pour le moment.</p>
          ) : (
            <ul className="space-y-3">
              {event.recentMessages.map((message) => (
                <li key={message.id} className="flex gap-3 text-sm">
                  <Avatar user={message.user} />
                  <div>
                    <p>
                      <span className="font-semibold">{message.user.firstName}</span>{" "}
                      <time dateTime={message.createdAt} className="text-xs text-muted">
                        {timeFormatter.format(new Date(message.createdAt))}
                      </time>
                    </p>
                    <p>{message.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted">Le chat en temps réel sera bientôt disponible.</p>
        </Section>

        <Section title="Album photo">
          {event.photos.length === 0 ? (
            <p className="text-sm text-muted">
              Aucune photo pour l&apos;instant. Les participants pourront en ajouter après
              l&apos;événement.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {event.photos.map((photo) => (
                <li key={photo.id}>
                  {/* Les photos viennent du stockage objet (domaine non fixé) : pas de next/image. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={`Photo partagée par ${photo.uploadedBy.firstName}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Avatar({ user, size = "md" }: { user: UserPreview; size?: "md" | "lg" }) {
  const dimension = size === "lg" ? "size-11 text-base" : "size-8 text-xs";
  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={user.avatarUrl} alt="" className={`${dimension} shrink-0 rounded-full object-cover`} />
    );
  }
  return (
    <span
      aria-hidden
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand`}
    >
      {user.firstName.charAt(0).toUpperCase()}
    </span>
  );
}

function EventDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-busy>
      <span className="sr-only">Chargement de l&apos;événement…</span>
      <div className="h-4 w-32 rounded bg-border" />
      <div className="h-8 w-2/3 rounded bg-border" />
      <div className="h-4 w-1/3 rounded bg-border" />
      <div className="h-40 rounded-2xl bg-border" />
      <div className="h-32 rounded-2xl bg-border" />
    </div>
  );
}
