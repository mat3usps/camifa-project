import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import AlertMessage from "~/components/alert/AlertMessage";
import LinkButton from "~/components/button/LinkButton";
import ListAccounts from "~/feature/account/ListAccounts";
import { useOptionalAccount } from "~/hooks/useOptionalAccount";
import type Account from "~/models/Account";
import type { AccountId } from "~/models/Account";
import AccountServer from "~/server/account.server";
import { requireUserId, setAccountSession } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";
import { safeRedirect } from "~/utils/utils";

type LoaderData = {
  accounts: Account[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accountId = formData.get("accountId");
  const redirectTo = safeRedirect(
    formData.get("redirectTo"),
    APP_ROUTES.accounts
  );

  if (typeof accountId === "string") {
    return setAccountSession({ accountId, request, redirectTo });
  }

  return json({});
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const accounts = await AccountServer.getAll(userId);
  return { accounts };
};

export default function AccountPage() {
  const { accounts } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const selectedAccount = useOptionalAccount();

  const activeAccounts = accounts.filter(({ isActive }) => isActive);
  const inactiveAccounts = accounts.filter(({ isActive }) => !isActive);

  return (
    <>
      {redirectTo && (
        <AlertMessage className="mb-8" type="warning">
          Selecione uma conta para continuar.
        </AlertMessage>
      )}
      <div className="flex justify-between	">
        <h1>Suas contas</h1>

        <LinkButton to={APP_ROUTES.addAccount} variant="primary" isOutlined>
          Adicionar nova conta
        </LinkButton>
      </div>
      <Outlet />

      <ListAccounts
        activeAccounts={activeAccounts}
        inactiveAccounts={inactiveAccounts}
        onSelect={onSelect}
        selectedAccountId={selectedAccount?.id}
      />
    </>
  );

  function onSelect(id: AccountId) {
    fetcher.submit(
      { accountId: id, redirectTo: redirectTo || APP_ROUTES.accounts },
      { method: "post" }
    );
  }
}
