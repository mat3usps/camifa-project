import type { LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirectToLoginIfNotLoggedIn } from "~/middleware/redirects";

export const loader: LoaderFunction = async ({ request }) => {
  return redirectToLoginIfNotLoggedIn(request);
};

export default function BanksPage() {
  return (
    <>
      <h1>Camifa app</h1>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </>
  );
}
