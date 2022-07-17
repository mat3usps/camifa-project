import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar/Navbar";
import { redirectToLoginIfNotLoggedIn } from "~/middleware/redirects";

export const loader: LoaderFunction = async ({ request }) => {
  return redirectToLoginIfNotLoggedIn(request);
};

export default function AppPage() {
  return (
    <>
      <Navbar />
      <div
        className="prose relative max-w-none p-6"
        style={{
          minHeight: "calc(100% - 4rem)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
