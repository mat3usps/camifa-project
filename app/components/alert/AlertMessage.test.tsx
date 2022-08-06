import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import AlertMessage from "./AlertMessage";

type AlertMessageProps = ComponentProps<typeof AlertMessage>;

const { getByRole, queryByRole } = screen;

describe("<Button />", () => {
  it("should render without errors", () => {
    getRenderer({ children: "Hello World" });
    expect(getByRole("alert")).toBeInTheDocument();
  });

  it("should NOT render without children", () => {
    getRenderer({ children: null });
    expect(queryByRole("alert")).not.toBeInTheDocument();
  });

  it.each(["A message", "Another message"])(
    "should render the message %s",
    (expected) => {
      getRenderer({ children: expected });
      expect(getByRole("alert")).toHaveTextContent(expected);
    }
  );

  it.each(["a-class", "another-class"])(
    "should render the class %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByRole("alert")).toHaveClass(`alert ${expected}`);
    }
  );

  it("should render alert info", () => {
    const { container } = getRenderer({ type: "info" });
    expect(getByRole("alert")).toHaveClass("alert");
    expect(container).toMatchSnapshot();
  });

  it.each(["error", "success", "warning"])(
    "should render alert type %s",
    (expected) => {
      const { container } = getRenderer({
        type: expected as AlertMessageProps["type"],
      });
      expect(getByRole("alert")).toHaveClass(`alert alert-${expected}`);
      expect(container).toMatchSnapshot();
    }
  );
});

// Helpers
function getRenderer({
  children = "Hello World",
  ...rest
}: Partial<AlertMessageProps> = {}) {
  return render(<AlertMessage {...rest}>{children}</AlertMessage>);
}
