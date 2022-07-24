import { faker } from "@faker-js/faker";

const USER_EMAIL = `${faker.internet.userName()}@example.com`.toLowerCase();
const USER_PASSWORD = faker.internet.password();

const REGISTER_ACCOUNT = /registre sua conta/i;

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register, logout, and then login again", () => {
    cy.then(() => ({ email: USER_EMAIL })).as("user");

    cy.visit("/");
    cy.findByRole("link", { name: REGISTER_ACCOUNT }).click();
    cy.url().should("include", "/registrar");

    // Register new user
    getEmailTextbox().type(USER_EMAIL);
    getPasswordTextbox().type(USER_PASSWORD);
    cy.findByRole("button", { name: REGISTER_ACCOUNT }).click();
    cy.url().should("include", "/app");

    // Logout
    cy.findByLabelText(/menu do perfil do usuário/i).click();
    cy.findByRole("button", { name: /sair/i }).click();
    getLoginLink().should("be.visible");
    cy.url().should("include", "/");

    // Login
    getLoginLink().click();
    cy.url().should("include", "/entrar");
    getEmailTextbox().type(USER_EMAIL);
    getPasswordTextbox().type(USER_PASSWORD);
    cy.findByRole("button", { name: /entrar/i }).click();
    cy.url().should("include", "/app");
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
