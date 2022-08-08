import type { ReactNode } from "react";
import LinkButton from "~/components/button/LinkButton";
import InactiveItemsList from "~/components/InactiveItemsList/InactiveItemsList";
import ListAsGrid from "~/components/ListAsGrid/ListAsGrid";
import type { LinkTo } from "~/types/LinkTo";

export interface IListAsGridContainerProps<T> {
  activeList: T[];
  inactiveList: T[];
  inactiveTitle: string;
  registerFirstItem: {
    buttonLabel: string;
    title: string;
    to: LinkTo;
  };
  renderItem: (item: T) => ReactNode;
}

const ListAsGridContainer = <T,>({
  activeList,
  inactiveList,
  inactiveTitle,
  registerFirstItem,
  renderItem,
}: IListAsGridContainerProps<T>) => {
  return (
    <>
      {activeList.length < 1 && (
        <>
          <p className="font-bold">{registerFirstItem.title}</p>
          <LinkButton to={registerFirstItem.to} size="lg">
            {registerFirstItem.buttonLabel}
          </LinkButton>
        </>
      )}
      <ListAsGrid>{activeList.map(renderItem)}</ListAsGrid>
      <InactiveItemsList count={inactiveList.length} title={inactiveTitle}>
        {inactiveList.map(renderItem)}
      </InactiveItemsList>
    </>
  );
};

export default ListAsGridContainer;
