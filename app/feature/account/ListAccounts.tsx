import classNames from "classnames";
import Card from "~/components/card/Card";
import ListAsGridContainer from "~/components/ListAsGrid/ListAsGridContainer";
import type { Account, AccountId } from "~/models/Account";
import { getCurrencyName } from "~/models/CurrencyCode";
import APP_ROUTES from "~/utils/appRoutes";
import { plural } from "~/utils/stringUtils";

interface IListAccountsProps {
  activeAccounts: Account[];
  inactiveAccounts: Account[];
  onSelect: (id: AccountId) => void;
  selectedAccountId?: AccountId;
}

const ListAccounts = ({
  activeAccounts,
  inactiveAccounts,
  onSelect,
  selectedAccountId,
}: IListAccountsProps) => {
  return (
    <ListAsGridContainer<Account>
      activeList={activeAccounts}
      inactiveList={inactiveAccounts}
      inactiveTitle={plural({
        countFrom: inactiveAccounts,
        one: "Perfil inativo",
        other: "Perfis inativos",
      })}
      registerFirstItem={{
        buttonLabel: "Adicionar primeiro perfil",
        title: "Cadastre sua primeira conta para utilizar o app",
        to: APP_ROUTES.addAccount,
      }}
      renderItem={renderAccount}
    />
  );

  function renderAccount({ currencyCode, id, isActive, name }: Account) {
    const isDisabled = !isActive;
    const isSelected = !isDisabled && id === selectedAccountId;

    return (
      <Card
        aria-label={isSelected ? undefined : `Selecionar conta ${name}`}
        className={classNames({
          "line-through": isDisabled,
          "bg-primary-content text-primary-focus": isSelected,
        })}
        key={id}
        onClick={
          isSelected || isDisabled || activeAccounts.length < 2
            ? undefined
            : onSelectAccount(id)
        }
        title={isSelected ? `${name} (selecionada no momento)` : name}
      >
        <small>
          {getCurrencyName(currencyCode)} ({currencyCode})
        </small>
      </Card>
    );
  }

  function onSelectAccount(id: AccountId) {
    return () => {
      onSelect(id);
    };
  }
};

export default ListAccounts;
