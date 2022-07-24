import { getUserId, logout } from "~/server/session.server";

export const getUserIdOrRedirect = async (request: Request) => {
  const userId = await getUserId(request);
  if (userId) {
    return userId;
  }

  throw await logout(request);
};
