import type { ReactNode } from "react";
import ListAsGrid from "../ListAsGrid/ListAsGrid";

interface IInactiveItemsListProps {
  children: ReactNode;
  count: number;
  title: string;
}

const InactiveItemsList = ({
  children,
  count,
  title,
}: IInactiveItemsListProps) => {
  if (count < 1) {
    return null;
  }

  return (
    <>
      <div className="divider mt-12 -mb-8" role="separator" />
      <h2>{title}</h2>
      <ListAsGrid>{children}</ListAsGrid>
    </>
  );
};

export default InactiveItemsList;
