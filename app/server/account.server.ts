import { userPreferences } from "~/cookies";
import type { AccountId, AddAccount, EditAccount } from "~/models/Account";

import { redirect } from "@remix-run/server-runtime";
import type { UserId } from "~/models/User";
import { prisma } from "~/server/db.server";
import APP_ROUTES from "~/utils/appRoutes";

const ACCOUNT_KEY = "accountId";

class AccountServer {
  static getById = async (id: UserId) => {
    return prisma.account.findUnique({ where: { id } });
  };

  static getAll = async (userId: UserId) => {
    return prisma.account.findMany({
      orderBy: { name: "asc" },
      where: { userId },
    });
  };

  static getAllActive = async (userId: UserId) => {
    return prisma.account.findMany({
      orderBy: { name: "asc" },
      where: { isActive: true, userId },
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

  static requireAccountId = async (request: Request) => {
    const userId = await AccountServer.getAccountId(request);
    if (!userId) {
      throw redirect(APP_ROUTES.accounts);
    }
    return userId;
  };

  static getSelectedAccount = async (
    request: Request,
    userId: UserId | undefined
  ) => {
    if (!userId) {
      return null;
    }

    const accountId = await AccountServer.getAccountId(request);
    if (accountId) {
      const account = await AccountServer.getById(accountId);
      if (account?.isActive) {
        return account;
      }
    }

    const accounts = await AccountServer.getAllActive(userId);
    if (accounts.length === 1) {
      return accounts[0];
    }

    return null;
  };

  static setAccountSession = async ({
    request,
    accountId,
  }: {
    request: Request;
    accountId: string;
  }) => {
    const cookie = await AccountServer.getUserPreferencesCookie(request);
    cookie[ACCOUNT_KEY] = accountId;

    return redirect(APP_ROUTES.app, {
      headers: {
        "Set-Cookie": await userPreferences.serialize(cookie),
      },
    });
  };

  private static getAccountId = async (
    request: Request
  ): Promise<AccountId | undefined> => {
    const cookie = await AccountServer.getUserPreferencesCookie(request);

    return cookie[ACCOUNT_KEY];
  };

  private static getUserPreferencesCookie = async (request: Request) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPreferences.parse(cookieHeader)) || {};
    return cookie;
  };
}

export default AccountServer;
