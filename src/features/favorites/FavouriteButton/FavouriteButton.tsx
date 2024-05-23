import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavouritesContext } from "../useFavouritesContext";
import { BillWithId } from "../../../domain/legislation";

export type PickBillWithId = Pick<BillWithId, "id" | "shortTitleEn">;

interface FavouriteButtonProps {
  bill: PickBillWithId;
}

export const FavouriteButton = ({ bill }: FavouriteButtonProps) => {
  const { favouriteBill, isBillFavourite, unfavouriteBill } =
    useFavouritesContext();

  return isBillFavourite(bill.id) ? (
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
        console.log("hello");
        e.stopPropagation();
        favouriteBill(bill);
      }}
    />
  );
};
