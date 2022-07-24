import type { LinkTo } from "~/types/LinkTo";

export type Menu = {
  label: string;
  to?: LinkTo;
  subMenus?: Menu[];
};

const APP_MENUS: Menu[] = [
  {
    label: "Single link",
    to: {
      pathname: "/app",
      search: "?foo=bar",
    },
  },
  {
    label: "Single item without to",
  },
  {
    label: "Item with sub-menus",
    subMenus: [
      {
        label: "Submenu 1",
        to: "/submenu1",
      },
      {
        label: "Submenu 2",
      },
    ],
  },
];

export default APP_MENUS;
