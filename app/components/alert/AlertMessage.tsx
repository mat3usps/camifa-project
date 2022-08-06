import classNames from "classnames";
import type { ReactNode } from "react";
import Icon from "../icon/Icon";

interface IAlertMessageProps {
  children: ReactNode;
  className?: string;
  type?: "error" | "info" | "success" | "warning";
}

const AlertMessage = ({
  className,
  children,
  type = "info",
}: IAlertMessageProps) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className={classNames(
        "alert shadow-lg",
        {
          "alert-error": type === "error",
          "alert-success": type === "success",
          "alert-warning": type === "warning",
        },
        className
      )}
      role="alert"
    >
      <div>
        <Icon display={type} />
        {children}
      </div>
    </div>
  );
};

export default AlertMessage;
