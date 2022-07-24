import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import LinkButton from "./LinkButton";

type LinkButtonProps = ComponentProps<typeof LinkButton>;

const { getByRole, getByText } = screen;

describe("<LinkButton />", () => {
  it.each(["primary", "secondary", "ghost", "error", "link"])(
    "should render a link with variant %s",
    (variant) => {
      getRenderer({ variant: variant as LinkButtonProps["variant"] });
      expect(getByRole("link")).toHaveClass(`btn btn-${variant}`);
    }
  );

  it.each(["sm", "lg"])("should render a link with size %s", (size) => {
    getRenderer({ size: size as LinkButtonProps["size"] });
    expect(getByRole("link")).toHaveClass(`btn btn-${size}`);
  });

  it("should render a outlined link button", () => {
    getRenderer({ isOutlined: true });
    expect(getByRole("link")).toHaveClass("btn-outline");
  });

  it("should render a full width link button", () => {
    getRenderer({ isFullWidth: true });
    expect(getByRole("link")).toHaveClass("btn-block");
  });

  it("should render a loading link button", () => {
    getRenderer({ isLoading: true });
    expect(getByRole("link")).toHaveClass("loading");
  });

  it.each(["Child text", "Another child text"])(
    "should render button children %s",
    (expected) => {
      getRenderer({ children: <p>{expected}</p> });
      expect(getByRole("link")).toContainElement(getByText(expected));
    }
  );
});

// Helpers
function getRenderer({ to = "/", ...rest }: Partial<LinkButtonProps>) {
  return render(
    <MemoryRouter>
      <LinkButton to={to} {...rest} />
    </MemoryRouter>
  );
}
