import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import UserThumbnail from "./UserThumbnail";

const { getByRole, getByText, queryByText } = screen;

describe("<UserThumbnail />", () => {
  it("should match snapshot", () => {
    const { container } = getRenderer({ email: "john@doe.com" });
    expect(container).toMatchSnapshot();
  });

  it("renders with user name", () => {
    getRenderer({ email: "john@doe.com", name: "John Doe" });
    expect(getByText(/jd/i)).toBeInTheDocument();
  });

  it("renders with user email", () => {
    getRenderer({ email: "jane@von.com" });
    expect(getByText(/jan/i)).toBeInTheDocument();
  });
});

// Helpers
function getRenderer(props: ComponentProps<typeof UserThumbnail>) {
  return render(<UserThumbnail {...props} />);
}
