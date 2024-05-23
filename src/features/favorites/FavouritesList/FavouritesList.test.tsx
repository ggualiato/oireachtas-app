import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from "../../../test/test-utils";
import { FavouritesList } from "./FavouritesList";

describe("FavouritesList", () => {
  it("should render a list of favorites itens", async () => {
    act(() => render(<FavouritesList />));

    const list = await screen.findAllByRole("listitem");
    expect(list).toHaveLength(6);
  });

  it("should remove item from list", async () => {
    act(() => render(<FavouritesList />));

    const list = await screen.findAllByRole("listitem");
    expect(list).toHaveLength(6);

    const deleteBtn = screen.getAllByRole("button")[0];

    fireEvent.click(deleteBtn);

    await waitFor(() => {
      const newList = screen.queryAllByRole("listitem");
      expect(newList).toHaveLength(5);
    });
  });
});
