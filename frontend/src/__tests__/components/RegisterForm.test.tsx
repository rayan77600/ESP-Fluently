import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { register } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { getToken } from "@/lib/session";

const push = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
jest.mock("@/lib/api/auth", () => ({ register: jest.fn() }));

const registerMock = register as jest.MockedFunction<typeof register>;

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Adresse e-mail"), "milan@fluently.app");
  await user.type(screen.getByLabelText("Mot de passe"), "motdepasse1");
  await user.type(screen.getByLabelText("Confirmer le mot de passe"), "motdepasse1");
  await user.click(screen.getByLabelText("Anglais"));
  await user.click(screen.getByRole("checkbox", { name: /conditions d'utilisation/ }));
  return user;
}

describe("RegisterForm (FRONT-01)", () => {
  beforeEach(() => {
    push.mockReset();
    registerMock.mockReset();
    window.localStorage.clear();
  });

  it("affiche les erreurs de validation sans appeler l'API", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(screen.getByText("L'adresse e-mail est obligatoire.")).toBeInTheDocument();
    expect(screen.getByText("Choisissez au moins une langue.")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse e-mail")).toHaveAttribute("aria-invalid", "true");
    expect(registerMock).not.toHaveBeenCalled();
  });

  it("efface l'erreur d'un champ dès sa modification", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));
    await user.type(screen.getByLabelText("Adresse e-mail"), "a");
    expect(screen.queryByText("L'adresse e-mail est obligatoire.")).not.toBeInTheDocument();
  });

  it("inscrit l'utilisateur et redirige vers /profile/setup", async () => {
    registerMock.mockResolvedValue({ accessToken: "jwt" });
    render(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(registerMock).toHaveBeenCalledWith({
      email: "milan@fluently.app",
      password: "motdepasse1",
      languages: ["en"],
    });
    expect(getToken()).toBe("jwt");
    expect(push).toHaveBeenCalledWith("/profile/setup");
  });

  it("permet de désélectionner une langue", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    const english = screen.getByLabelText("Anglais");
    await user.click(english);
    expect(english).toBeChecked();
    await user.click(english);
    expect(english).not.toBeChecked();
  });

  it("affiche l'erreur renvoyée par l'API", async () => {
    registerMock.mockRejectedValue(new ApiError(409, "Un compte existe déjà avec cette adresse e-mail."));
    render(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Un compte existe déjà");
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Créer mon compte" })).toBeEnabled();
  });

  it("affiche un message générique pour une erreur inconnue", async () => {
    registerMock.mockRejectedValue(new Error("boom"));
    render(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("erreur inattendue");
  });
});
