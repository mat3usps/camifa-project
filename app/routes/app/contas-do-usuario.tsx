import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import LinkButton from "~/components/button/LinkButton";
import Card from "~/components/card/Card";
import { useOptionalAccount } from "~/hooks/useOptionalAccount";
import { getUserIdOrRedirect } from "~/middleware/getUserIdOrRedirect";
import type Account from "~/models/Account";
import type { AccountId } from "~/models/Account";
import { getCurrencyName } from "~/models/CurrencyCode";
import AccountServer from "~/server/account.server";
import { setAccountSession } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

type LoaderData = {
  accounts: Account[];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const accountId = formData.get("accountId");

  if (typeof accountId === "string") {
    return setAccountSession({ accountId, request });
  }

  return json({});
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserIdOrRedirect(request);
  const accounts = await AccountServer.getAll(userId);
  return { accounts };
}

export default function AccountPage() {
  const { accounts } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const selectedAccount = useOptionalAccount();

  const activeAccounts = accounts.filter(({ isActive }) => isActive);
  const inactiveAccounts = accounts.filter(({ isActive }) => !isActive);

  return (
    <>
      <div className="flex justify-between	">
        <h1>Suas contas</h1>
        <LinkButton to={APP_ROUTES.addAccount} variant="primary" isOutlined>
          Adicionar nova conta
        </LinkButton>
      </div>
      <Outlet />
      {activeAccounts.map((account) => {
        const isSelected = account.id === selectedAccount?.id;
        return renderAccount({ account, isSelected });
      })}

      {inactiveAccounts.length > 0 && (
        <>
          <div className="divider mt-12" />
          <h2>Contas inativas</h2>
          {inactiveAccounts.map((account) =>
            renderAccount({ account, isDisabled: true })
          )}
        </>
      )}
    </>
  );

  function onSelect(id: AccountId) {
    return () => {
      fetcher.submit({ accountId: id }, { method: "post" });
    };
  }

  function renderAccount({
    account: { currencyCode, id, name },
    isDisabled,
    isSelected,
  }: {
    account: Account;
    isDisabled?: boolean;
    isSelected?: boolean;
  }) {
    return (
      <Card
        aria-label={`Selecionar conta ${name}`}
        className={classNames({
          "line-through": isDisabled,
          "bg-primary-content text-primary-focus": isSelected,
        })}
        key={id}
        onClick={
          isDisabled || activeAccounts.length < 2 ? undefined : onSelect(id)
        }
        title={isSelected ? `${name} (ativa no momento)` : name}
      >
        {id}
        <small>
          {getCurrencyName(currencyCode)} ({currencyCode})
        </small>
      </Card>
    );
  }
}
