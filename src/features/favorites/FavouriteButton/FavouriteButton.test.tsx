import { act } from "react";
import { FavouriteButton } from "./FavouriteButton";
import { render, fireEvent, screen, waitFor } from "../../../test/test-utils";

describe("FavouriteButton", () => {
  it("should render not favorite", async () => {
    act(() => {
      render(
        <FavouriteButton
          bill={{
            id: "123",
            shortTitleEn: "short title english",
          }}
        />
      );
    });

    const startIcon = await screen.findByTestId("StarBorderIcon");

    expect(startIcon).toBeInTheDocument();
  });

  it("should change icon when clicked", async () => {
    act(() => {
      render(
        <FavouriteButton
          bill={{
            id: "123",
            shortTitleEn: "short title english",
          }}
        />
      );
    });

    const starIcon = await screen.findByTestId("StarBorderIcon");

    fireEvent.click(starIcon);

    await waitFor(() => {
      const favorited = screen.queryByTestId("StarIcon");

      expect(favorited).toBeInTheDocument();
    });
  });
});
