import { Link } from "@remix-run/react";
import classnames from "classnames";
import type { Menu } from "~/utils/appMenus";
import APP_MENUS from "~/utils/appMenus";

interface IAppMenuProps {
  type: "horizontal" | "vertical";
}

const AppMenu = ({ type }: IAppMenuProps) => {
  const isVertical = type === "vertical";
  const isHorizontal = type === "horizontal";

  return (
    <ul
      tabIndex={0}
      className={classnames("menu", {
        "menu-horizontal p-0": isHorizontal,
        "dropdown-content rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow":
          isVertical,
      })}
    >
      {APP_MENUS.map(renderMenu)}
    </ul>
  );

  function renderMenu({ label, subMenus, to }: Menu) {
    if (subMenus) {
      return (
        <li key={label} tabIndex={0}>
          <span className="justify-between">
            {label}
            {renderWithSubMenuIcon()}
          </span>
          {renderSubMenus(subMenus)}
        </li>
      );
    }
    if (to) {
      return (
        <li key={label}>
          <Link tabIndex={0} to={to}>
            {label}
          </Link>
        </li>
      );
    }
    return null;
  }

  function renderSubMenus(subMenus: Menu[]) {
    return (
      <ul className="bg-base-100 p-2 shadow">
        {subMenus.map(({ label, to }) => {
          if (to) {
            return (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  }

  function renderWithSubMenuIcon() {
    if (isVertical) {
      return (
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      );
    }
    return (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    );
  }
};

export default AppMenu;
