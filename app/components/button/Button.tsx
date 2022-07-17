import { FC } from "react";
import useButtonBase, { IUseButtonBase } from "./useButtonBase";

interface IButtonProps extends IUseButtonBase {
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<IButtonProps> = ({
  children,
  isDisabled,
  type = "button",
  ...buttonBaseProps
}) => {
  const { className } = useButtonBase(buttonBaseProps);

  return (
    <button className={className} disabled={isDisabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
