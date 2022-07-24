/* eslint-disable jest/no-conditional-expect */

import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import APP_MENUS from "~/utils/appMenus";
import AppMenu from "./AppMenu";

const { getByRole, getByText, queryByText } = screen;

describe("<AppMenu />", () => {
  it("should all app Menus", () => {
    getRenderer({ type: "vertical" });

    APP_MENUS.forEach(({ label, subMenus, to }) => {
      if (subMenus) {
        const menu = getByText(label);

        expect(menu).toBeInTheDocument();
        subMenus.forEach((subMenu) => {
          if (subMenu.to) {
            expect(
              getByRole("link", { name: subMenu.label })
            ).toBeInTheDocument();
          } else {
            expect(queryByText(subMenu.label)).not.toBeInTheDocument();
          }
        });
      } else if (!to) {
        expect(queryByText(label)).not.toBeInTheDocument();
      } else {
        expect(getByRole("link", { name: label })).toBeInTheDocument();
      }
    });
  });

  it("should match snapshot for vertical menu", () => {
    const { container } = getRenderer({ type: "vertical" });
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot for horizontal menu", () => {
    const { container } = getRenderer({ type: "horizontal" });
    expect(container).toMatchSnapshot();
  });
});

// Helpers
function getRenderer(props: ComponentProps<typeof AppMenu>) {
  return render(
    <MemoryRouter>
      <AppMenu {...props} />
    </MemoryRouter>
  );
}
