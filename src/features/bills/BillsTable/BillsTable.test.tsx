import { act, render, screen, waitFor } from "../../../test/test-utils";
import { BillsTable } from "./BillsTable";

describe("BillsTable", () => {
  it("should render BillsTable with itens", async () => {
    act(() => {
      render(<BillsTable onRowClick={vi.fn()} />);
    });

    await waitFor(() => {
      const rows = screen.queryAllByRole("row");

      expect(rows).toHaveLength(6);
    });
  });
});
