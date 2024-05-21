import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BillRow } from "../../components/BillList";
import { useFavoritesContext } from "./useFavoritesContext";

interface FavouriteButtonProps {
  billRow: BillRow;
}

export const FavouriteButton = ({ billRow }: FavouriteButtonProps) => {
  const { favoriteBill, isBillFavorite, unfavoriteBill } =
    useFavoritesContext();

  return isBillFavorite(billRow.id) ? (
    <StarIcon onClick={() => unfavoriteBill(billRow.id)} />
  ) : (
    <StarBorderIcon onClick={() => favoriteBill(billRow.id)} />
  );
};
