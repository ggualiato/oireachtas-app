import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useFavoritesContext } from "./useFavoritesContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoritesList = () => {
  const { favorites, unfavoriteBill } = useFavoritesContext();

  return (
    <div style={{ width: 500, height: 200 }}>
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
