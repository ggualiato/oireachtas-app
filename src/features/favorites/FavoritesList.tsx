import { useFavoritesContext } from "./useFavoritesContext";

export const FavoritesList = () => {
  const { favorites } = useFavoritesContext();
  console.log("x", favorites);
  return <>Hello</>;
};
