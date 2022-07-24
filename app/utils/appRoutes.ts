const APP = "/app";
const ACCOUNTS = `${APP}/contas-do-usuario`;

const APP_ROUTES = {
  app: APP,
  accounts: ACCOUNTS,
  addAccount: `${ACCOUNTS}/adicionar`,
  home: "/",
  join: "/registrar",
  login: "/entrar",
};

export default APP_ROUTES;
