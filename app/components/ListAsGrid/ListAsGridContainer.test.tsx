import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { IListAsGridContainerProps } from "./ListAsGridContainer";
import ListAsGridContainer from "./ListAsGridContainer";

const {
  getAllByTestId,
  getByRole,
  getByTestId,
  getByText,
  queryByRole,
  queryByText,
} = screen;

describe("<ListAsGridContainer />", () => {
  it("should match snapshot", () => {
    const { container } = getRenderer();
    expect(container).toMatchSnapshot();
  });

  it.each([
    ["The title", "Button label"],
    ["Another title", "Another button label"],
  ])(
    "should render register first item with title %s",
    (title, buttonLabel) => {
      getRenderer({
        activeList: [],
        registerFirstItem: {
          buttonLabel,
          title,
          to: "/",
        },
      });
      expect(getByText(title)).toBeInTheDocument();
      expect(getByRole("link", { name: buttonLabel })).toBeInTheDocument();
    }
  );

  it("should NOT render register first item when there is an active item", () => {
    getRenderer({
      activeList: [{ id: "1", name: "Item 1" }],
    });
    expect(queryByText("Register")).not.toBeInTheDocument();
    expect(
      queryByRole("link", { name: "Register item" })
    ).not.toBeInTheDocument();
  });

  it("should render ListAsGrid component for active list", () => {
    getRenderer({
      activeList: [{ id: "1", name: "Item 1" }],
      inactiveList: [],
    });
    expect(getByTestId("ListAsGrid")).toBeInTheDocument();
  });

  it("should render ListAsGrid component for both active and inactive lists", () => {
    getRenderer({
      activeList: [{ id: "1", name: "Item 1" }],
      inactiveList: [{ id: "2", name: "Item 2" }],
    });
    expect(getAllByTestId("ListAsGrid")).toHaveLength(2);
  });

  it("should call renderItem for each item", () => {
    const activeList = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    const inactiveList = [{ id: "3", name: "Inactive Item 1" }];

    const renderItem = vitest.fn();
    getRenderer({
      activeList,
      inactiveList,
      renderItem,
    });
    expect(renderItem).toHaveBeenCalledTimes(
      activeList.length + inactiveList.length
    );
  });

  it("should render all items", () => {
    const activeList = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    const inactiveList = [
      { id: "3", name: "Inactive Item 1" },
      { id: "4", name: "Inactive Item 2" },
    ];

    getRenderer({
      activeList,
      inactiveList,
      renderItem: (item) => <p>{item.name}</p>,
    });
    [...activeList, ...inactiveList].forEach(({ name }) =>
      expect(getByText(name)).toBeInTheDocument()
    );
  });

  it.each(["Inactive items", "Another inactive title"])(
    "should render inactive title %s",
    (expected) => {
      getRenderer({
        inactiveList: [{ id: "3", name: "Inactive Item 1" }],
        inactiveTitle: expected,
      });
      expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    }
  );

  it("should NOT render inactive title", () => {
    getRenderer({
      inactiveList: [],
      inactiveTitle: "Inactive items",
    });
    expect(
      queryByRole("heading", { name: "Inactive items" })
    ).not.toBeInTheDocument();
  });
});

// Helpers
type TestItem = {
  id: string;
  name: string;
};

function getRenderer({
  activeList = [],
  inactiveList = [],
  inactiveTitle = "No items",
  registerFirstItem = {
    buttonLabel: "Register",
    title: "Register item",
    to: "/register",
  },
  renderItem = vitest.fn(),
}: Partial<IListAsGridContainerProps<TestItem>> = {}) {
  return render(
    <MemoryRouter>
      <ListAsGridContainer<TestItem>
        activeList={activeList}
        inactiveTitle={inactiveTitle}
        inactiveList={inactiveList}
        registerFirstItem={registerFirstItem}
        renderItem={renderItem}
      />
    </MemoryRouter>
  );
}
