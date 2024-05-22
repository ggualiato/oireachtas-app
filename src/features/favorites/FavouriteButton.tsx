import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavoritesContext } from "./useFavoritesContext";

interface FavouriteButtonProps {
  billUid: string;
}

export const FavouriteButton = ({ billUid }: FavouriteButtonProps) => {
  const { favoriteBill, isBillFavorite, unfavoriteBill } =
    useFavoritesContext();

  return isBillFavorite(billUid) ? (
    <StarIcon
      onClick={(e) => {
        e.stopPropagation();
        unfavoriteBill(billUid);
      }}
    />
  ) : (
    <StarBorderIcon
      onClick={(e) => {
        e.stopPropagation();
        favoriteBill(billUid);
      }}
    />
  );
};
