import { Link, Outlet } from "@remix-run/react";
import APP_ROUTES from "~/utils/appRoutes";

export default function AccountPage() {
  return (
    <>
      <h1>Contas</h1>
      <Link to={APP_ROUTES.addAccount}>Adicionar nova conta</Link>
      <Outlet />
    </>
  );
}
