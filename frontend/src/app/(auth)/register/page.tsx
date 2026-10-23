import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Inscription",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-start justify-center px-4 py-10 sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">Rejoignez Fluently</h1>
        <p className="mt-1 mb-6 text-sm text-muted">
          Créez votre compte pour participer à des rencontres linguistiques près de chez vous.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
