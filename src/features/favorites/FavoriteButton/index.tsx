import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BillRow } from "../../../components/BillList";
import { useFavoritesContext } from "../useFavoritesContext";

interface FavoriteButtonProps {
  billRow: BillRow;
}

export const FavoriteButton = ({ billRow }: FavoriteButtonProps) => {
  const { favoriteBill, isBillFavorite, unfavoriteBill } =
    useFavoritesContext();

  return isBillFavorite(billRow.id) ? (
    <StarIcon onClick={() => unfavoriteBill(billRow.id)} />
  ) : (
    <StarBorderIcon onClick={() => favoriteBill(billRow.id)} />
  );
};
