import type { Account } from "~/models/Account";
import { useMatchesData } from "./useMatchesData";

export function useOptionalAccount(): Account | undefined {
  const data = useMatchesData("root");
  if (!data || !isAccount(data.account)) {
    return undefined;
  }
  return data.account;
}

function isAccount(account: any): account is Account {
  return (
    account && typeof account === "object" && typeof account.name === "string"
  );
}
