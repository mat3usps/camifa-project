import type { BankAccount as BankAccountFromPrisma } from "@prisma/client";

export type BankAccount = BankAccountFromPrisma;

export type BankAccountId = BankAccount["id"];

export type AddBankAccount = Omit<
  BankAccount,
  "id" | "isActive" | "isDeleted" | "createdAt" | "deletedAt" | "updatedAt"
>;

export type EditBankAccount = Omit<
  Partial<BankAccount>,
  "createdAt" | "deletedAt" | "updatedAt"
>;
