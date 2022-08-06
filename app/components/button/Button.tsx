import type { ReactNode } from "react";
import type { IUseButtonBase } from "./useButtonBase";
import useButtonBase from "./useButtonBase";

interface IButtonProps extends IUseButtonBase {
  children: ReactNode;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  isDisabled,
  type = "button",
  ...buttonBaseProps
}: IButtonProps) => {
  const { className } = useButtonBase(buttonBaseProps);

  return (
    <button className={className} disabled={isDisabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
