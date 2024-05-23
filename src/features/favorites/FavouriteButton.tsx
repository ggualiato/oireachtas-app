import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavouritesContext } from "./useFavouritesContext";
import { BillWithId } from "../../domain/legislation";

interface FavouriteButtonProps {
  bill: BillWithId;
}

export const FavouriteButton = ({ bill }: FavouriteButtonProps) => {
  const { favouriteBill, isBillFavourite, unfavouriteBill } =
    useFavouritesContext();

  return isBillFavourite(bill) ? (
    <StarIcon
      color="warning"
      onClick={(e) => {
        e.stopPropagation();
        unfavouriteBill(bill.id);
      }}
    />
  ) : (
    <StarBorderIcon
      color="warning"
      onClick={(e) => {
        e.stopPropagation();
        favouriteBill(bill);
      }}
    />
  );
};
