import { createTestEmail, createTestPassword } from "support/testUtils";
import APP_ROUTES from "~/utils/appRoutes";

const USER_EMAIL = createTestEmail();
const USER_PASSWORD = createTestPassword();

const REGISTER_ACCOUNT = /registre sua conta/i;

describe("Login & registration tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register, logout, and then login again", () => {
    cy.then(() => ({ email: USER_EMAIL })).as("user");

    cy.visitAndCheck(APP_ROUTES.home);
    cy.findByRole("link", { name: REGISTER_ACCOUNT }).click();
    cy.url().should("include", APP_ROUTES.join);

    // Register new user
    getEmailTextbox().type(USER_EMAIL);
    getPasswordTextbox().type(USER_PASSWORD);
    cy.findByRole("button", { name: REGISTER_ACCOUNT }).click();
    cy.url().should("include", APP_ROUTES.app);

    // Logout
    cy.findByLabelText(/menu do perfil do usuário/i).click();
    cy.findByRole("button", { name: /sair/i }).click();
    getLoginLink().should("be.visible");
    cy.url().should("include", APP_ROUTES.home);

    // Login
    getLoginLink().click();
    cy.url().should("include", APP_ROUTES.login);
    getEmailTextbox().type(USER_EMAIL);
    getPasswordTextbox().type(USER_PASSWORD);
    cy.findByRole("button", { name: /entrar/i }).click();
    cy.url().should("include", APP_ROUTES.app);
  });
});

function getLoginLink() {
  return cy.findByRole("link", { name: /entre em sua conta/i });
}

function getEmailTextbox() {
  return cy.findByRole("textbox", { name: /seu e-mail/i });
}

function getPasswordTextbox() {
  return cy.findByLabelText(/sua senha/i);
}
