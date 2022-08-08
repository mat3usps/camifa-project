import type { Account } from "~/models/Account";
import { useOptionalAccount } from "./useOptionalAccount";

export function useAccount(): Account {
  const maybeAccount = useOptionalAccount();
  if (!maybeAccount) {
    throw new Error(
      "No account found in root loader, but account is required by useAccount. If account is optional, try useOptionalAccount instead."
    );
  }
  return maybeAccount;
}
