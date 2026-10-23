import { validateRegister, type RegisterFormValues } from "@/lib/validation/register";

const valid: RegisterFormValues = {
  email: "milan@fluently.app",
  password: "motdepasse1",
  confirmPassword: "motdepasse1",
  languages: ["en"],
  acceptTerms: true,
};

describe("validateRegister", () => {
  it("accepte un formulaire valide", () => {
    expect(validateRegister(valid)).toEqual({});
  });

  it("exige un e-mail valide", () => {
    expect(validateRegister({ ...valid, email: "" }).email).toMatch(/obligatoire/);
    expect(validateRegister({ ...valid, email: "pas-un-email" }).email).toMatch(/pas valide/);
  });

  it.each(["court1", "sanschiffre", "12345678"])("refuse le mot de passe faible %s", (password) => {
    expect(validateRegister({ ...valid, password, confirmPassword: password }).password).toBeDefined();
  });

  it("exige un mot de passe", () => {
    expect(validateRegister({ ...valid, password: "" }).password).toMatch(/obligatoire/);
  });

  it("vérifie la confirmation du mot de passe", () => {
    expect(validateRegister({ ...valid, confirmPassword: "autre1234" }).confirmPassword).toBeDefined();
  });

  it("exige au moins une langue et l'acceptation des CGU", () => {
    const errors = validateRegister({ ...valid, languages: [], acceptTerms: false });
    expect(errors.languages).toBeDefined();
    expect(errors.acceptTerms).toBeDefined();
  });
});
