import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar/Navbar";
import { useOptionalAccount } from "~/hooks/useOptionalAccount";
import AccountServer from "~/server/account.server";
import { requireUserId } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const pathname = new URL(request.url).pathname;
  const selectedAccount = await AccountServer.getSelectedAccount(
    request,
    userId
  );

  if (!pathname.includes(APP_ROUTES.accounts) && !selectedAccount) {
    return redirect(APP_ROUTES.accounts);
  }

  const accounts = await AccountServer.getAll(userId);
  return { accounts };
};

export default function AppPage() {
  const selectedAccount = useOptionalAccount();

  return (
    <>
      {selectedAccount && <Navbar />}
      <div
        className="prose relative max-w-none p-6"
        style={{ minHeight: "calc(100% - 4rem)" }}
      >
        <Outlet />
      </div>
    </>
  );
}
