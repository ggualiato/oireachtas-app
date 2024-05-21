import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined || context === null) {
    throw Error("useFavoritesContext should be used within FavoritesProvider");
  }

  return context;
};
