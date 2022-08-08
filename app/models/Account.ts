import type { Account as AccountFromPrisma } from "@prisma/client";
import type { CurrencyCode } from "./CurrencyCode";

export type Account = Omit<AccountFromPrisma, "currencyCode"> & {
  currencyCode: CurrencyCode;
};

export type AccountId = Account["id"];

export type AddAccount = Omit<
  Account,
  "id" | "isActive" | "isDeleted" | "createdAt" | "deletedAt" | "updatedAt"
>;

export type EditAccount = Omit<
  Partial<Account>,
  "createdAt" | "deletedAt" | "updatedAt"
>;
