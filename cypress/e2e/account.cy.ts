import APP_ROUTES from "~/utils/appRoutes";

const FIRST_ACCOUNT_SELECTED = /^conta 1 \(selecionada no momento\)$/i;

describe.skip("User accounts tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  beforeEach(() => {
    cy.login();

    cy.visitAndCheck(APP_ROUTES.accounts);

    cy.findAllByRole("link", { name: /adicionar primeiro perfil/i }).click();
    getNameTextbox().type("Conta 1");
    clickOnSaveLink();
    cy.url().should("include", APP_ROUTES.app);
  });

  it("should allow to register new accounts and change the selected one", () => {
    cy.findByLabelText(/menu do perfil do usuário/i).click();
    cy.findByRole("link", { name: /suas contas/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    headingShouldExist(FIRST_ACCOUNT_SELECTED);

    // Go to add account page
    clickOnAddAccountLink();
    cy.url().should("include", APP_ROUTES.addAccount);

    // Cancel it
    cy.findByRole("link", { name: /cancelar/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    // Add second account and select it
    clickOnAddAccountLink();
    getNameTextbox().type("Conta 2");
    clickOnSaveLink();
    cy.url().should("include", APP_ROUTES.app);

    visitAccountsPage();
    headingShouldExist(/^conta 1$/i);
    headingShouldExist(/^conta 2 \(selecionada no momento\)$/i);

    // Select the first account
    cy.findByRole("button", { name: /selecionar conta conta 1/i }).click();
    cy.url().should("include", APP_ROUTES.app);

    visitAccountsPage();
    headingShouldExist(FIRST_ACCOUNT_SELECTED);
    headingShouldExist(/^conta 2$/i);
  });
});

function visitAccountsPage() {
  cy.visitAndCheck(APP_ROUTES.accounts);
}

function clickOnAddAccountLink() {
  cy.findAllByRole("link", { name: /adicionar novo perfil/i }).click();
}

function getNameTextbox() {
  return cy.findByRole("textbox", { name: /nome/i });
}

function clickOnSaveLink() {
  cy.findByRole("button", { name: /salvar/i }).click();
}

function headingShouldExist(regex: RegExp) {
  cy.findByRole("heading", { name: regex }).should("exist");
}
