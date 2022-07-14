import { Form } from "@remix-run/react";
import { VFC } from "react";
import { useUser } from "~/hooks/useUser";
import UserThumbnail from "../userThumbnail/UserThumbnail";
import AppMenu from "./AppMenu";

const Navbar: VFC = () => {
  const user = useUser();

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <AppMenu type="vertical" />
        </div>
        <a className="btn btn-ghost text-xl normal-case">Camifa</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <AppMenu type="horizontal" />
      </div>
      <div className="navbar-end">
        <div className="dropdown-end dropdown">
          <UserThumbnail email={user.email} />
          {renderUserThumbnailMenu()}
        </div>
      </div>
    </div>
  );

  function renderUserThumbnailMenu() {
    return (
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 bg-base-100 p-2 shadow"
      >
        <Form action="/logout" method="post">
          <li>
            <button type="submit">Logout</button>
          </li>
        </Form>
      </ul>
    );
  }
};

export default Navbar;
