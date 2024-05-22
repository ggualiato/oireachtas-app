import { createContext, useCallback } from "react";
import useSWR from "swr";
import { fakeApi } from "../../api";

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
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favorite = useSWR<Favorite[]>("/favorites", (url: string) =>
    fakeApi.get(url).then((resp) => resp.data)
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
      await fakeApi.post<void>("/favorites/", favoritedBil).then((data) => {
        console.log(data);
      });
      favorite.mutate([...(favorite?.data ?? []), favoritedBil]);
    },
    [favorite]
  );

  const unfavoriteBill = useCallback(
    async (billId: string) => {
      await fakeApi.delete<void>("/favorites/" + billId).then((data) => {
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
