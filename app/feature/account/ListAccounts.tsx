import classNames from "classnames";
import { VFC } from "react";
import LinkButton from "~/components/button/LinkButton";
import Card from "~/components/card/Card";
import Account, { AccountId } from "~/models/Account";
import { getCurrencyName } from "~/models/CurrencyCode";
import APP_ROUTES from "~/utils/appRoutes";
import { plural } from "~/utils/stringUtils";

interface IListAccountsProps {
  activeAccounts: Account[];
  inactiveAccounts: Account[];
  onSelect: (id: AccountId) => void;
  selectedAccountId?: AccountId;
}

const ListAccounts: VFC<IListAccountsProps> = ({
  activeAccounts,
  inactiveAccounts,
  onSelect,
  selectedAccountId,
}) => {
  return (
    <>
      {activeAccounts.length < 1 && (
        <>
          <p className="font-bold">
            Cadastre sua primeira conta para utilizar o app
          </p>
          <LinkButton to={APP_ROUTES.addAccount} size="lg">
            Adicionar primeiro perfil
          </LinkButton>
        </>
      )}
      {activeAccounts.map((account) => {
        const isSelected = account.id === selectedAccountId;
        return renderAccount({ account, isSelected });
      })}
      {inactiveAccounts.length > 0 && (
        <>
          <div className="divider mt-12" />
          <h2>
            {plural({
              countFrom: inactiveAccounts,
              one: "Perfil inativo",
              other: "Perfis inativos",
            })}
          </h2>
          {inactiveAccounts.map((account) =>
            renderAccount({ account, isDisabled: true })
          )}
        </>
      )}
    </>
  );

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
          isDisabled || activeAccounts.length < 2
            ? undefined
            : onSelectAccount(id)
        }
        title={isSelected ? `${name} (ativa no momento)` : name}
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
