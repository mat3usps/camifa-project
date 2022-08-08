import type { ReactNode } from "react";

interface IListAsGridProps {
  children: ReactNode;
}

const ListAsGrid = ({ children }: IListAsGridProps) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      data-testid="ListAsGrid"
    >
      {children}
    </div>
  );
};

export default ListAsGrid;
