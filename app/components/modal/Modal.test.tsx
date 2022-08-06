import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import Modal from "./Modal";

const { getByLabelText, getByRole, getByText, queryByRole } = screen;

describe("<Modal />", () => {
  it("should render dialog", () => {
    getRenderer({ isOpen: true });
    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it("should NOT render dialog", () => {
    getRenderer({ isOpen: false });
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each(["A title", "Another title"])(
    "should render dialog with title '%s'",
    (expected) => {
      getRenderer({ isOpen: true, title: expected });
      expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    }
  );

  it("should render dialog aria-labelled with the title", () => {
    getRenderer({ isOpen: true, title: "Some title" });
    expect(getByLabelText("Some title")).toEqual(queryByRole("dialog"));
  });

  it.each(["Cancel", "Save"])(
    "should render dialog with %s button",
    (expected) => {
      getRenderer({ isOpen: true, buttons: <button>{expected}</button> });
      expect(getByRole("button", { name: expected })).toBeInTheDocument();
    }
  );

  it.each(["Child text", "Another child text"])(
    "should render dialog with children %s",
    (expected) => {
      getRenderer({ isOpen: true, children: <div>{expected}</div> });
      expect(getByRole("dialog")).toContainElement(getByText(expected));
    }
  );

  it("should render close button", () => {
    getRenderer({ isOpen: true, onCloseLinkTo: "/" });
    expect(getByRole("link", { name: "Fechar" })).toBeInTheDocument();
  });

  it("should NOT render close button", () => {
    getRenderer({ isOpen: true, onCloseLinkTo: undefined });
    expect(queryByRole("link", { name: "Fechar" })).not.toBeInTheDocument();
  });
});

// Helpers
function getRenderer({
  children = "Modal children",
  isOpen = true,
  ...rest
}: Partial<ComponentProps<typeof Modal>>) {
  return render(
    <MemoryRouter>
      <Modal isOpen={isOpen} {...rest}>
        {children}
      </Modal>
    </MemoryRouter>
  );
}
