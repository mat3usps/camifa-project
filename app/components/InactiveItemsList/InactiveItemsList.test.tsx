import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import InactiveItemsList from "./InactiveItemsList";

const { getByRole, getByText, queryByRole } = screen;

describe("<InactiveItemsList />", () => {
  it.each(["A title", "Another title"])(
    "should render the title %s when count is bigger than zero",
    (expected) => {
      getRenderer({
        count: 2,
        title: expected,
      });
      expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    }
  );

  it("should render nothing when count is zero", () => {
    getRenderer({
      count: 0,
      title: "No items",
    });
    expect(
      queryByRole("heading", { name: "No items" })
    ).not.toBeInTheDocument();
  });

  it.each(["A children", "Another children"])(
    "should render the children %p",
    (expected) => {
      getRenderer({
        children: <p>{expected}</p>,
        count: 2,
        title: "Items",
      });
      expect(getByText(expected)).toBeInTheDocument();
    }
  );

  it("should render separator", () => {
    getRenderer({
      count: 2,
      title: "Items",
    });
    expect(getByRole("separator")).toHaveClass("divider");
  });
});

// Helpers
function getRenderer({
  children,
  count = 1,
  title = "The title",
}: Partial<ComponentProps<typeof InactiveItemsList>>) {
  return render(
    <InactiveItemsList count={count} title={title}>
      {children}
    </InactiveItemsList>
  );
}
