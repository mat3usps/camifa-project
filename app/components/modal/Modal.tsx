import { Link } from "@remix-run/react";
import { FC, ReactNode } from "react";
import { LinkTo } from "~/types/LinkTo";

interface IModalProps {
  buttons?: ReactNode;
  isOpen: boolean;
  onCloseLinkTo?: LinkTo;
  title?: string;
}

const Modal: FC<IModalProps> = ({
  buttons,
  children,
  isOpen,
  onCloseLinkTo,
  title,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby={title ? "modal-title" : undefined}
      className="modal modal-open modal-bottom sm:modal-middle"
      role="dialog"
    >
      <div className="modal-box relative">
        {onCloseLinkTo && (
          <Link
            aria-label="Fechar"
            className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
            to={onCloseLinkTo}
          >
            ✕
          </Link>
        )}
        {title && (
          <h2
            id="modal-title"
            className="text-lg font-bold"
            style={{ marginTop: 0 }}
          >
            {title}
          </h2>
        )}
        <div className="py-4">{children}</div>
        {buttons && <div className="modal-action">{buttons}</div>}
      </div>
    </div>
  );
};

export default Modal;
