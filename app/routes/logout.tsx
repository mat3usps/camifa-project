import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import APP_ROUTES from "~/utils/appRoutes";

import { logout } from "~/server/session.server";

export async function action({ request }: ActionArgs) {
  return logout(request);
}

export async function loader() {
  return redirect(APP_ROUTES.home);
}
