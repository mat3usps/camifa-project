import { ActionFunction, json } from "@remix-run/node";

import { Form, Link, useActionData } from "@remix-run/react";
import { useRef } from "react";
import Modal from "~/components/modal/Modal";
import APP_ROUTES from "~/utils/appRoutes";

interface ActionData {
  errors?: {
    name?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");

  return json<ActionData>(
    { errors: { name: "Invalid name" } },
    { status: 400 }
  );
};

export default function AddAccountPage() {
  const nameRef = useRef<HTMLInputElement>(null);

  const actionData = useActionData<ActionData>();

  return (
    <Form method="post">
      <Modal
        buttons={
          <>
            <Link className="btn btn-ghost" to={APP_ROUTES.accounts}>
              Cancelar
            </Link>
            <button className="btn btn-primary" type="submit">
              Salvar
            </button>
          </>
        }
        isOpen={true}
        onCloseLinkTo={APP_ROUTES.accounts}
        title="Nova conta"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                required
                autoFocus={true}
                name="name"
                type="text"
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-describedby="name-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.name && (
                <div className="pt-1 text-red-700" id="name-error">
                  {actionData.errors.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </Form>
  );
}
