import classNames from "classnames";
import type { FC, ReactNode } from "react";

interface ICardProps {
  "aria-label"?: string;
  buttons?: ReactNode;
  className?: string;
  "data-testid"?: string;
  onClick?: () => void;
  title?: string;
}

const Card: FC<ICardProps> = ({
  "aria-label": ariaLabel,
  buttons,
  children,
  className,
  "data-testid": testId = "Card",
  onClick,
  title,
}) => {
  return (
    <div
      aria-label={ariaLabel}
      className={classNames(
        "not-prose card my-4 shadow hover:shadow-md",
        className
      )}
      data-testid={testId}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {buttons && <div className="card-actions justify-end">{buttons}</div>}
      </div>
    </div>
  );
};

export default Card;
