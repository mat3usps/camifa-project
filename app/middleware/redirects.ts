import { json, redirect } from "@remix-run/node";
import { getUserId } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

export const redirectToAppIfLoggedIn = async (request: Request) => {
  const userId = await getUserId(request);
  if (userId) return redirect(APP_ROUTES.app);
  return json({});
};

export const redirectToLoginIfNotLoggedIn = async (request: Request) => {
  const userId = await getUserId(request);
  if (!userId) return redirect(APP_ROUTES.login);
  return json({});
};
