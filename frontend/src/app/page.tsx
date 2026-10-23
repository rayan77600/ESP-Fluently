import { Suspense } from "react";
import { EventDiscovery } from "@/components/events/EventDiscovery";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Pratiquez une langue, en vrai.</h1>
      <p className="mt-2 mb-6 text-muted">
        Trouvez une rencontre linguistique près de chez vous et lancez-vous.
      </p>
      {/* useSearchParams nécessite une frontière Suspense pour garder la page statique. */}
      <Suspense>
        <EventDiscovery />
      </Suspense>
    </div>
  );
}
