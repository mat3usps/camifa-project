import { json, redirect } from "@remix-run/node";
import APP_ROUTES from "~/appRoutes";
import { getUserId } from "~/session.server";

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
