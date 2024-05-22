import axios from "axios";
import { createContext, useCallback } from "react";
import useSWR from "swr";

interface FavoritesContextValue {
  favorites: Favorite[];
  favoriteBill: (billId: string) => Promise<void>;
  unfavoriteBill: (billId: string) => Promise<void>;
  isBillFavorite: (billId: string) => boolean;
}

interface Favorite {
  id: string;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

interface FavoritesProviderProps {
  children: React.ReactElement;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favorite = useSWR<Favorite[]>(
    "http://localhost:3000/favorites",
    (url: string) => axios.get(url).then((resp) => resp.data)
  );

  const isBillFavorite = useCallback(
    (billId: string) => {
      return !!favorite.data?.find((fav) => fav.id === billId);
    },
    [favorite.data]
  );

  const favoriteBill = useCallback(
    async (billId: string) => {
      const favoritedBil = { id: billId };
      await axios
        .post<void>("http://localhost:3000/favorites/", favoritedBil)
        .then((data) => {
          console.log(data);
        });
      favorite.mutate([...(favorite?.data ?? []), favoritedBil]);
    },
    [favorite]
  );

  const unfavoriteBill = useCallback(
    async (billId: string) => {
      await axios
        .delete<void>("http://localhost:3000/favorites/" + billId)
        .then((data) => {
          console.log(data);
        });
      favorite.mutate(
        (favorite?.data ?? []).filter((fav) => fav.id !== billId)
      );
    },
    [favorite]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorite.data ?? [],
        favoriteBill,
        unfavoriteBill,
        isBillFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
