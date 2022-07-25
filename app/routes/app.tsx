import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar/Navbar";
import { useOptionalAccount } from "~/hooks/useOptionalAccount";
import AccountServer from "~/server/account.server";
import { getAccountId, requireUserId } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const redirectTo = new URL(request.url).pathname;
  const accountId = await getAccountId(request);

  if (redirectTo !== APP_ROUTES.accounts && !accountId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`${APP_ROUTES.accounts}?${searchParams}`);
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
