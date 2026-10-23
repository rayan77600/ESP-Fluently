import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Configurer mon profil",
};

// Écran cible de la redirection après inscription (FRONT-01).
// Le formulaire complet (niveaux, ville, centres d'intérêt) arrivera avec le ticket profil.
export default function ProfileSetupPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 text-center">
      <h1 className="text-2xl font-bold">Bienvenue sur Fluently !</h1>
      <p className="mt-2 text-muted">
        Votre compte est créé. La configuration du profil sera bientôt disponible.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-hover"
      >
        Découvrir les événements
      </Link>
    </div>
  );
}
