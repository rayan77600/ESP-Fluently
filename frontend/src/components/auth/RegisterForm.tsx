"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { LANGUAGES } from "@/lib/languages";
import { setToken } from "@/lib/session";
import {
  validateRegister,
  type RegisterErrors,
  type RegisterFormValues,
} from "@/lib/validation/register";

const INITIAL_VALUES: RegisterFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  languages: [],
  acceptTerms: false,
};

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-danger";

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleLanguage(code: string) {
    update(
      "languages",
      values.languages.includes(code)
        ? values.languages.filter((c) => c !== code)
        : [...values.languages, code],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const validation = validateRegister(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const { accessToken } = await register({
        email: values.email.trim(),
        password: values.password,
        languages: values.languages,
      });
      setToken(accessToken);
      router.push("/profile/setup");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? [error.message, ...error.details.slice(1)].join(" ")
          : "Une erreur inattendue est survenue. Réessayez.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      {submitError && (
        <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {submitError}
        </p>
      )}

      <Field id="email" label="Adresse e-mail" error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field id="password" label="Mot de passe" error={errors.password}>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
      </Field>

      <Field id="confirmPassword" label="Confirmer le mot de passe" error={errors.confirmPassword}>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={values.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
        />
      </Field>

      <fieldset aria-describedby={errors.languages ? "languages-error" : undefined}>
        <legend className="mb-2 text-sm font-medium">Langues que vous souhaitez pratiquer</legend>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => {
            const checked = values.languages.includes(language.code);
            return (
              <label
                key={language.code}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40 ${
                  checked
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-surface hover:border-brand"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleLanguage(language.code)}
                />
                {language.name}
              </label>
            );
          })}
        </div>
        {errors.languages && <ErrorText id="languages-error">{errors.languages}</ErrorText>}
      </fieldset>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-brand"
            checked={values.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
            aria-invalid={!!errors.acceptTerms}
            aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
          />
          <span>
            J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
            (traitement de mes données conformément au RGPD).
          </span>
        </label>
        {errors.acceptTerms && <ErrorText id="acceptTerms-error">{errors.acceptTerms}</ErrorText>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Création du compte…" : "Créer mon compte"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-sm text-danger">
      {children}
    </p>
  );
}
