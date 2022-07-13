import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import APP_ROUTES from "~/utils/appRoutes";

import { logout } from "~/server/session.server";

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect(APP_ROUTES.home);
};
