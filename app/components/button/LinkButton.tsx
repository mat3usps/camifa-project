import { Link, LinkProps } from "@remix-run/react";
import { FC } from "react";
import useButtonBase, { IUseButtonBase } from "./useButtonBase";

interface ILinkButtonProps
  extends IUseButtonBase,
    Omit<LinkProps, "className"> {}

const LinkButton: FC<ILinkButtonProps> = ({
  children,
  type = "button",
  isOutlined,
  isFullWidth,
  isLoading,
  size,
  variant,
  ...rest
}) => {
  const { className } = useButtonBase({
    isOutlined,
    isFullWidth,
    isLoading,
    size,
    variant,
  });

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
};

export default LinkButton;
