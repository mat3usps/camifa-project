import type { LoaderFunction } from "@remix-run/node";
import Navbar from "~/components/navbar/Navbar";
import { redirectToLoginIfNotLoggedIn } from "~/middleware/redirects";

export const loader: LoaderFunction = async ({ request }) => {
  return redirectToLoginIfNotLoggedIn(request);
};

export default function BanksPage() {
  return (
    <>
      <Navbar />
    </>
  );
}
