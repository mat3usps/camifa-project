import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import Card from "./Card";

const { getByRole, getByTestId, getByText } = screen;

describe("<Card />", () => {
  it("should have default test id", (expected) => {
    getRenderer();
    expect(getByTestId("Card")).toBeInTheDocument();
  });

  it.each(["The Card", "Another Card id"])(
    "should have test id",
    (expected) => {
      getRenderer({ "data-testid": expected });
      expect(getByTestId(expected)).toBeInTheDocument();
    }
  );

  it("should render card with aria-label", () => {
    getRenderer({ "aria-label": "Card aria label" });
    expect(getByTestId("Card")).toHaveAttribute(
      "aria-label",
      "Card aria label"
    );
  });

  it.each(["Title", "Another title"])(
    "should render card with title '%s'",
    (expected) => {
      getRenderer({ title: expected });
      expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    }
  );

  it.each(["a-class", "another-class"])(
    "should render card with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("Card")).toHaveClass(expected);
    }
  );

  it.each(["Children", "Another children"])(
    "should render card with children '%s'",
    (expected) => {
      getRenderer({ children: <p>{expected}</p> });
      expect(getByText(expected)).toBeInTheDocument();
    }
  );

  it("should render card buttons", () => {
    getRenderer({
      buttons: (
        <>
          <button>Button 1</button>
          <button>Button 2</button>
        </>
      ),
    });
    expect(getByRole("button", { name: "Button 1" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Button 2" })).toBeInTheDocument();
  });

  it("should render card with onClick", async () => {
    const onClick = vitest.fn();
    getRenderer({ onClick });
    expect(onClick).not.toHaveBeenCalled();

    userEvent.click(getByTestId("Card"));
    userEvent.click(getByTestId("Card"));
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(2));
  });
});

// Helpers
function getRenderer({
  children = "Card children",
  ...rest
}: Partial<ComponentProps<typeof Card>> = {}) {
  return render(
    <MemoryRouter>
      <Card {...rest}>{children}</Card>
    </MemoryRouter>
  );
}
