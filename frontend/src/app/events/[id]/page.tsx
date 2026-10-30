import type { Metadata } from "next";
import { Suspense } from "react";
import { EventDetails } from "@/components/events/EventDetails";

export const metadata: Metadata = {
  title: "Événement",
};

export default function EventPage({ params }: PageProps<"/events/[id]">) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* L'id n'est connu qu'à la requête : son accès doit être sous Suspense (Cache Components). */}
      <Suspense>{params.then(({ id }) => <EventDetails id={id} />)}</Suspense>
    </div>
  );
}
