const APP = "/app";
const ACCOUNTS = `${APP}/perfis-do-usuario`;
const BANK_ACCOUNTS = `${APP}/contas-bancarias`;

const APP_ROUTES = {
  app: APP,
  accounts: ACCOUNTS,
  addAccount: `${ACCOUNTS}/adicionar`,
  addBankAccount: `${BANK_ACCOUNTS}/adicionar`,
  bankAccounts: BANK_ACCOUNTS,
  home: "/",
  join: "/registrar",
  login: "/entrar",
};

export default APP_ROUTES;
