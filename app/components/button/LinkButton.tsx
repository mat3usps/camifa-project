import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { IUseButtonBase } from "./useButtonBase";
import useButtonBase from "./useButtonBase";

interface ILinkButtonProps
  extends IUseButtonBase,
    Omit<LinkProps, "className"> {}

const LinkButton = ({
  children,
  type = "button",
  isOutlined,
  isFullWidth,
  isLoading,
  size,
  variant,
  ...rest
}: ILinkButtonProps) => {
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
