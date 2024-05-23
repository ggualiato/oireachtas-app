import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavouritesContext } from "./useFavoritesContext";

interface FavouriteButtonProps {
  billUid: string;
}

export const FavouriteButton = ({ billUid }: FavouriteButtonProps) => {
  const { favouriteBill, isBillFavourite, unfavouriteBill } =
    useFavouritesContext();

  return isBillFavourite(billUid) ? (
    <StarIcon
      color="warning"
      onClick={(e) => {
        e.stopPropagation();
        unfavouriteBill(billUid);
      }}
    />
  ) : (
    <StarBorderIcon
      color="warning"
      onClick={(e) => {
        e.stopPropagation();
        favouriteBill(billUid);
      }}
    />
  );
};
