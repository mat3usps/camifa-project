import { AccountId, AddAccount, EditAccount } from "~/models/Account";

import { UserId } from "~/models/User";
import { prisma } from "~/server/db.server";

class AccountServer {
  static getById = async (id: UserId) => {
    return prisma.account.findUnique({ where: { id } });
  };

  static create = async (data: AddAccount) => {
    return prisma.account.create({
      data,
    });
  };

  static update = async ({ id, ...data }: EditAccount) => {
    return prisma.account.update({
      where: { id },
      data,
    });
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
}

export default AccountServer;
