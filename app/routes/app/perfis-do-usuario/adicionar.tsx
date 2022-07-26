import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";
import Button from "~/components/button/Button";
import LinkButton from "~/components/button/LinkButton";
import Input from "~/components/form/Input";
import Modal from "~/components/modal/Modal";
import AccountServer from "~/server/account.server";
import { requireUserId, setAccountSession } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

interface ActionData {
  errors?: {
    name?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return json<ActionData>(
      { errors: { name: "Nome é inválido" } },
      { status: 400 }
    );
  }

  const account = await AccountServer.create({
    currencyCode: "BRL",
    name,
    userId,
  });

  return setAccountSession({ accountId: account.id, request });
};

export default function AddAccountPage() {
  const nameRef = useRef<HTMLInputElement>(null);

  const actionData = useActionData<ActionData>();

  return (
    <Form method="post">
      <Modal
        buttons={
          <>
            <LinkButton to={APP_ROUTES.accounts} variant="ghost">
              Cancelar
            </LinkButton>
            <Button type="submit">Salvar</Button>
          </>
        }
        isOpen={true}
        onCloseLinkTo={APP_ROUTES.accounts}
        title="Novo perfil"
      >
        <div className="space-y-6">
          <Input
            autoFocus={true}
            id="name"
            isRequired
            errorMessage={actionData?.errors?.name}
            placeholder="Pessoal, Empresa XYZ, Conta de Investimento, etc"
            helperMessage="Qual perfil financeiro que você quer gerenciar?"
            label="Nome do perfil"
            ref={nameRef}
          />
        </div>
      </Modal>
    </Form>
  );
}
