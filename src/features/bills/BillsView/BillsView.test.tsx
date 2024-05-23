import { act, screen } from "@testing-library/react";
import { BillView } from "./BillsView";
import { render } from "../../../test/test-utils";

describe("BillsView", () => {
  it("should render bills view with filter, table and pagination", () => {
    act(() => {
      render(<BillView />);
    });

    const filter = screen.getByRole("combobox");
    const table = screen.getByRole("table");
    const pagination = screen.getByRole("navigation");

    expect(filter).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });
});
