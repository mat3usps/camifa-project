import { AccountId, AddAccount, EditAccount } from "~/models/Account";

import { UserId } from "~/models/User";
import { prisma } from "~/server/db.server";
import { getAccountId } from "./session.server";

class AccountServer {
  static getById = async (id: UserId) => {
    return prisma.account.findUnique({ where: { id } });
  };

  static getAll = async () => {
    return prisma.account.findMany({ orderBy: { name: "asc" } });
  };

  static getAllActive = async () => {
    return prisma.account.findMany({
      orderBy: { name: "asc" },
      where: { isActive: true },
    });
  };

  static create = async (data: AddAccount) => {
    return prisma.account.create({ data });
  };

  static update = async ({ id, ...data }: EditAccount) => {
    return prisma.account.update({ where: { id }, data });
  };

  static inactive = async (id: AccountId) => {
    return AccountServer.update({ id, isActive: false });
  };

  static active = async (id: AccountId) => {
    return AccountServer.update({ id, isActive: true });
  };

  static delete = async (id: AccountId) => {
    return AccountServer.update({ id, isDeleted: true });
  };

  static getSelectedAccount = async (request: Request) => {
    const accountId = await getAccountId(request);
    if (accountId) {
      const account = await AccountServer.getById(accountId);
      if (account) {
        return account;
      }
    }

    const accounts = await AccountServer.getAllActive();
    if (accounts.length === 1) {
      return accounts[0];
    }

    return null;
  };
}

export default AccountServer;
