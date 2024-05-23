import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFavouritesContext } from "../useFavouritesContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavouritesList = () => {
  const { favourites, unfavouriteBill } = useFavouritesContext();
  const noFavouritesYet = favourites.length === 0;

  return (
    <div style={{ width: 500, height: 200 }}>
      {noFavouritesYet && (
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
            <ListItemText primary={favourite.shortTitle} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
