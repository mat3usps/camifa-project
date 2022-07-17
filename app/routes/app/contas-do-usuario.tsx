import { Outlet } from "@remix-run/react";
import LinkButton from "~/components/button/LinkButton";
import APP_ROUTES from "~/utils/appRoutes";

export default function AccountPage() {
  return (
    <>
      <h1>Contas</h1>
      <LinkButton to={APP_ROUTES.addAccount} variant="ghost" isOutlined>
        Adicionar nova conta
      </LinkButton>
      <Outlet />
    </>
  );
}
