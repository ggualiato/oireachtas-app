import { useContext } from "react";
import { FavouritesContext } from "./FavoritesContext";

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext);

  if (context === undefined || context === null) {
    throw Error(
      "useFavouritesContext should be used within FavouritesProvider"
    );
  }

  return context;
};
