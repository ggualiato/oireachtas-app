import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFavoritesContext } from "./useFavoritesContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoritesList = () => {
  const { favorites, unfavoriteBill } = useFavoritesContext();
  const noFavoritesYet = favorites.length === 0;

  return (
    <div style={{ width: 500, height: 200 }}>
      {noFavoritesYet && (
        <Typography sx={{ mt: 2 }}>{"There is no favorites yet"}</Typography>
      )}
      <List>
        {favorites.map((favorite) => (
          <ListItem
            key={favorite.id}
            secondaryAction={
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => unfavoriteBill(favorite.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={favorite.id} secondary={"Secondary text"} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
