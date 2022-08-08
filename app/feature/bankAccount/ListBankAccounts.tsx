import classNames from "classnames";
import Card from "~/components/card/Card";
import ListAsGridContainer from "~/components/ListAsGrid/ListAsGridContainer";
import { useAccount } from "~/hooks/useAccount";
import type { AccountId } from "~/models/Account";
import type { BankAccount } from "~/models/BankAccount";
import APP_ROUTES from "~/utils/appRoutes";
import { displayCurrency } from "~/utils/currencyUtils";
import { plural } from "~/utils/stringUtils";

interface IListBankAccountsProps {
  activeAccounts: BankAccount[];
  inactiveAccounts: BankAccount[];
  onSelect: (id: AccountId) => void;
}

const ListBankAccounts = ({
  activeAccounts,
  inactiveAccounts,
  onSelect,
}: IListBankAccountsProps) => {
  const account = useAccount();

  return (
    <ListAsGridContainer<BankAccount>
      activeList={activeAccounts}
      inactiveList={inactiveAccounts}
      inactiveTitle={plural({
        countFrom: inactiveAccounts,
        one: "Conta inativa",
        other: "Contas inativas",
      })}
      registerFirstItem={{
        buttonLabel: "Adicionar primeira conta",
        title: "Cadastre sua primeira conta bancária para utilizar o app",
        to: APP_ROUTES.addBankAccount,
      }}
      renderItem={renderAccount}
    />
  );

  function renderAccount({
    bankName,
    color,
    id,
    initialBalance,
    name,
    isActive,
  }: BankAccount) {
    return (
      <Card
        className={classNames({
          "line-through": !isActive,
        })}
        key={id}
        style={{ border: `1px solid ${color || "transparent"}` }}
        title={name}
      >
        <small>{bankName}</small>
        <small>{displayCurrency(initialBalance, account.currencyCode)}</small>
      </Card>
    );
  }
};

export default ListBankAccounts;
