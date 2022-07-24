import classNames from "classnames";
import { FC } from "react";
import Icon from "../icon/Icon";

interface IAlertMessageProps {
  className?: string;
  type?: "error" | "info" | "success" | "warning";
}

const AlertMessage: FC<IAlertMessageProps> = ({
  className,
  children,
  type = "info",
}) => {
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
