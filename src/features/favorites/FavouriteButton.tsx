import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BillRow } from "../../components/BillList/BillList";
import { useFavoritesContext } from "./useFavoritesContext";

interface FavouriteButtonProps {
  billRow: BillRow;
}

export const FavouriteButton = ({ billRow }: FavouriteButtonProps) => {
  const { favoriteBill, isBillFavorite, unfavoriteBill } =
    useFavoritesContext();

  return isBillFavorite(billRow.id) ? (
    <StarIcon
      onClick={(e) => {
        e.stopPropagation();
        unfavoriteBill(billRow.id);
      }}
    />
  ) : (
    <StarBorderIcon
      onClick={(e) => {
        e.stopPropagation();
        favoriteBill(billRow.id);
      }}
    />
  );
};
