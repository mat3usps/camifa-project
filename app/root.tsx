import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import AccountServer from "./server/account.server";

import { getUser } from "./server/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Camifa",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  account: Awaited<ReturnType<typeof AccountServer.getSelectedAccount>>;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const account = await AccountServer.getSelectedAccount(request);
  const user = await getUser(request);

  return json<LoaderData>({ account, user });
};

export default function App() {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
