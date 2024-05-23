import { createContext, useCallback } from "react";
import useSWR from "swr";
import { fakeApi } from "../../services/api";

interface FavouritesContextValue {
  favourites: Favourite[];
  favouriteBill: (billId: string) => Promise<void>;
  unfavouriteBill: (billId: string) => Promise<void>;
  isBillFavourite: (billId: string) => boolean;
}

interface Favourite {
  id: string;
}

export const FavouritesContext = createContext<FavouritesContextValue | null>(
  null
);

interface FavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const favourites = useSWR<Favourite[]>("/favorites", (url: string) =>
    fakeApi.get(url).then((resp) => resp.data)
  );

  const isBillFavorite = useCallback(
    (billId: string) => {
      return !!favourites.data?.find((fav) => fav.id === billId);
    },
    [favourites.data]
  );

  const favoriteBill = useCallback(
    async (billId: string) => {
      const favoritedBil = { id: billId };
      await fakeApi.post<void>("/favorites/", favoritedBil).then(() => {
        console.log("request to favorite a bill dispatched");
      });
      favourites.mutate([...(favourites?.data ?? []), favoritedBil]);
    },
    [favourites]
  );

  const unfavoriteBill = useCallback(
    async (billId: string) => {
      await fakeApi.delete<void>("/favorites/" + billId).then(() => {
        console.log("request to unfavorite a bill");
      });
      favourites.mutate(
        (favourites?.data ?? []).filter((fav) => fav.id !== billId)
      );
    },
    [favourites]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favourites: favourites.data ?? [],
        favouriteBill: favoriteBill,
        unfavouriteBill: unfavoriteBill,
        isBillFavourite: isBillFavorite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
