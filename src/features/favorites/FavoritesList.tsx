import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useFavoritesContext } from "./useFavoritesContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoritesList = () => {
  const { favorites, unfavoriteBill } = useFavoritesContext();
  return (
    <div style={{ width: 500, height: 200 }}>
      <List>
        {favorites.map((fav) => (
          <ListItem
            secondaryAction={
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => unfavoriteBill(fav.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={fav.id} secondary={"Secondary text"} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
