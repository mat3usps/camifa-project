import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import ListAsGrid from "./ListAsGrid";

const { getByText } = screen;

describe("<ListAsGrid />", () => {
  it("should match snapshot", () => {
    const { container } = getRenderer({ children: <p>A children</p> });
    expect(container).toMatchSnapshot();
  });

  it.each(["A children", "Another children"])(
    "should render the children %p",
    (expected) => {
      getRenderer({
        children: <p>{expected}</p>,
      });
      expect(getByText(expected)).toBeInTheDocument();
    }
  );
});

// Helpers
function getRenderer({ children }: ComponentProps<typeof ListAsGrid>) {
  return render(<ListAsGrid>{children}</ListAsGrid>);
}
