import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

type ButtonProps = Partial<ComponentProps<typeof Button>>;

const { getByRole, getByText } = screen;

describe("<Button />", () => {
  it.each(["primary", "secondary", "ghost", "error", "link"])(
    "should render a button with variant %s",
    (variant) => {
      getRenderer({ variant: variant as ButtonProps["variant"] });
      expect(getByRole("button")).toHaveClass(`btn btn-${variant}`);
    }
  );

  it.each(["sm", "lg"])("should render a button with size %s", (size) => {
    getRenderer({ size: size as ButtonProps["size"] });
    expect(getByRole("button")).toHaveClass(`btn btn-${size}`);
  });

  it("should render a outlined button", () => {
    getRenderer({ isOutlined: true });
    expect(getByRole("button")).toHaveClass("btn-outline");
  });

  it("should render a full width button", () => {
    getRenderer({ isFullWidth: true });
    expect(getByRole("button")).toHaveClass("btn-block");
  });

  it("should render a loading button", () => {
    getRenderer({ isLoading: true });
    expect(getByRole("button")).toHaveClass("loading");
  });

  it("should render a enabled button", () => {
    getRenderer({ isDisabled: false });
    expect(getByRole("button")).toBeEnabled();
  });

  it("should render a disabled button", () => {
    getRenderer({ isDisabled: true });
    expect(getByRole("button")).toBeDisabled();
  });

  it.each(["button", "submit", "reset"])(
    "should render a %s button",
    (type) => {
      getRenderer({ type: type as ButtonProps["type"] });
      expect(getByRole("button")).toHaveAttribute("type", type);
    }
  );

  it.each(["Child text", "Another child text"])(
    "should render button children %s",
    (expected) => {
      getRenderer({ children: <p>{expected}</p> });
      expect(getByRole("button")).toContainElement(getByText(expected));
    }
  );
});

// Helpers
function getRenderer({ children = "Button label", ...rest }: ButtonProps) {
  return render(
    <MemoryRouter>
      <Button {...rest}>{children}</Button>
    </MemoryRouter>
  );
}
