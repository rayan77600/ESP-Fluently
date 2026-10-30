"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ParticipationStatus } from "@/types";
import { joinEvent } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { getToken } from "@/lib/session";

const STATUS_LABELS: Record<ParticipationStatus, { text: string; className: string }> = {
  ACCEPTED: { text: "✓ Vous participez", className: "bg-success/10 text-success" },
  PENDING: { text: "Demande envoyée — en attente de l'hôte", className: "bg-brand-soft text-brand" },
  DECLINED: { text: "Votre participation a été refusée", className: "bg-danger/10 text-danger" },
};

export function JoinEventButton({
  eventId,
  isFull,
  status,
  onJoined,
}: {
  eventId: string;
  isFull: boolean;
  status: ParticipationStatus | null;
  onJoined: (status: ParticipationStatus) => void;
}) {
  const router = useRouter();
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status) {
    const label = STATUS_LABELS[status];
    return (
      <p role="status" className={`rounded-lg px-4 py-2.5 text-center font-semibold ${label.className}`}>
        {label.text}
      </p>
    );
  }

  async function handleJoin() {
    setError(null);
    if (!getToken()) {
      router.push("/register");
      return;
    }
    setJoining(true);
    try {
      const participation = await joinEvent(eventId);
      onJoined(participation.status);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        router.push("/register");
        return;
      }
      setError(e instanceof ApiError ? e.message : "Impossible de rejoindre l'événement. Réessayez.");
    } finally {
      setJoining(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleJoin}
        disabled={isFull || joining}
        className="w-full rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFull ? "Complet" : joining ? "Inscription…" : "Rejoindre"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
