import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import LinkButton from "~/components/button/LinkButton";
import ListBankAccounts from "~/feature/bankAccount/ListBankAccounts";
import type { AccountId } from "~/models/Account";
import type { BankAccount } from "~/models/BankAccount";
import AccountServer from "~/server/account.server";
import BankAccountServer from "~/server/bankAccount.server";
import APP_ROUTES from "~/utils/appRoutes";

type LoaderData = {
  bankAccounts: BankAccount[];
};

export async function loader({ request }: LoaderArgs) {
  const accountId = await AccountServer.requireAccountId(request);
  const bankAccounts = await BankAccountServer.getAll(accountId);
  console.log("bankAccounts", bankAccounts);
  return { bankAccounts };
}

export default function BankAccountsPage() {
  const { bankAccounts } = useLoaderData<LoaderData>();

  const activeAccounts = bankAccounts.filter(({ isActive }) => isActive);
  const inactiveAccounts = bankAccounts.filter(({ isActive }) => !isActive);

  return (
    <>
      <div className="flex justify-between	">
        <h1>Suas contas</h1>

        <LinkButton to={APP_ROUTES.addBankAccount} variant="primary" isOutlined>
          Adicionar nova conta
        </LinkButton>
      </div>
      <Outlet />

      <ListBankAccounts
        activeAccounts={activeAccounts}
        inactiveAccounts={inactiveAccounts}
        onSelect={onSelect}
      />
    </>
  );

  function onSelect(id: AccountId) {
    // TODO:
  }
}
