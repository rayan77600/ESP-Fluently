export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  languages: string[];
  acceptTerms: boolean;
}

export type RegisterErrors = Partial<Record<keyof RegisterFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

/** Validation côté client ; le backend reste la source de vérité (class-validator). */
export function validateRegister(values: RegisterFormValues): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!values.email.trim()) {
    errors.email = "L'adresse e-mail est obligatoire.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "L'adresse e-mail n'est pas valide.";
  }

  if (!values.password) {
    errors.password = "Le mot de passe est obligatoire.";
  } else if (
    values.password.length < PASSWORD_MIN_LENGTH ||
    !/[A-Za-z]/.test(values.password) ||
    !/\d/.test(values.password)
  ) {
    errors.password = `Au moins ${PASSWORD_MIN_LENGTH} caractères, dont une lettre et un chiffre.`;
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas.";
  }

  if (values.languages.length === 0) {
    errors.languages = "Choisissez au moins une langue.";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "Vous devez accepter les conditions d'utilisation.";
  }

  return errors;
}
