import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFavouritesContext } from "./useFavoritesContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavouritesList = () => {
  const { favourites, unfavouriteBill } = useFavouritesContext();
  const noFavoritesYet = favourites.length === 0;

  return (
    <div style={{ width: 500, height: 200 }}>
      {noFavoritesYet && (
        <Typography sx={{ mt: 2 }}>{"There is no favourites yet"}</Typography>
      )}
      <List>
        {favourites.map((favourite) => (
          <ListItem
            key={favourite.id}
            secondaryAction={
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => unfavouriteBill(favourite.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={favourite.id} secondary={"Secondary text"} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
