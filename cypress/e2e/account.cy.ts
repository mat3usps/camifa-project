import APP_ROUTES from "~/utils/appRoutes";

const FIRST_ACCOUNT_SELECTED = /^conta 1 \(ativa no momento\)$/i;

describe("User accounts tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  beforeEach(() => {
    cy.login();
    cy.registerAccount();
    cy.visit(APP_ROUTES.app);
  });

  it("should allow to register new accounts and change the selected one", () => {
    cy.findByLabelText(/menu do perfil do usuário/i).click();
    cy.findByRole("link", { name: /suas contas/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    // Go to add account page
    clickOnAddAccountLink();
    cy.url().should("include", APP_ROUTES.addAccount);

    // Cancel it
    cy.findByRole("link", { name: /cancelar/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    // Add new account
    clickOnAddAccountLink();
    getNameTextbox().type("Conta 1");
    clickOnSaveLink();
    cy.url().should("include", APP_ROUTES.app);

    visitAccountsPage();
    headingShouldBeVisible(FIRST_ACCOUNT_SELECTED);

    // Add second account and select it
    clickOnAddAccountLink();
    getNameTextbox().type("Conta 2");
    clickOnSaveLink();

    visitAccountsPage();
    headingShouldBeVisible(/^conta 1$/i);
    headingShouldBeVisible(/^conta 2 \(ativa no momento\)$/i);

    // Select the first account
    cy.findByRole("button", { name: /selecionar conta conta 1/i }).click();

    visitAccountsPage();
    headingShouldBeVisible(FIRST_ACCOUNT_SELECTED);
    headingShouldBeVisible(/^conta 2$/i);
  });
});

function visitAccountsPage() {
  cy.visit(APP_ROUTES.accounts);
}

function clickOnAddAccountLink() {
  cy.findByRole("link", { name: /adicionar novo perfil/i }).click();
}

function getNameTextbox() {
  return cy.findByRole("textbox", { name: /nome/i });
}

function clickOnSaveLink() {
  cy.findByRole("button", { name: /salvar/i }).click();
}

function headingShouldBeVisible(regex: RegExp) {
  cy.findByRole("heading", { name: regex }).should("be.visible");
}
