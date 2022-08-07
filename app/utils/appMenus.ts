import type { LinkTo } from "~/types/LinkTo";
import APP_ROUTES from "./appRoutes";

export type Menu = {
  label: string;
  to?: LinkTo;
  subMenus?: Menu[];
};

const APP_MENUS: Menu[] = [
  {
    label: "Contas bancárias",
    to: APP_ROUTES.bankAccounts,
  },
];

export default APP_MENUS;
