import type { AddBankAccount, EditBankAccount } from "~/models/BankAccount";

import type { AccountId } from "~/models/Account";
import { prisma } from "~/server/db.server";

class BankAccountServer {
  static getById = async (id: AccountId) => {
    return prisma.bankAccount.findUnique({ where: { id } });
  };

  static getAll = async (accountId: AccountId) => {
    return prisma.bankAccount.findMany({
      orderBy: { name: "asc" },
      where: { accountId },
    });
  };

  static getAllActive = async (accountId: AccountId) => {
    return prisma.bankAccount.findMany({
      orderBy: { name: "asc" },
      where: { isActive: true, accountId },
    });
  };

  static create = async (data: AddBankAccount) => {
    return prisma.bankAccount.create({ data });
  };

  static update = async ({ id, ...data }: EditBankAccount) => {
    return prisma.bankAccount.update({ where: { id }, data });
  };

  static inactive = async (id: AccountId) => {
    return BankAccountServer.update({ id, isActive: false });
  };

  static active = async (id: AccountId) => {
    return BankAccountServer.update({ id, isActive: true });
  };

  static delete = async (id: AccountId) => {
    return BankAccountServer.update({ id, isDeleted: true });
  };
}

export default BankAccountServer;
