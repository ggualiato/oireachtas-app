import { createContext, useCallback } from "react";
import useSWR from "swr";
import { fakeApi } from "../../services/api";
import { BillWithId } from "../../domain/legislation";

interface FavouritesContextValue {
  favourites: Favourite[];
  favouriteBill: (bill: BillWithId) => Promise<void>;
  unfavouriteBill: (billId: string) => Promise<void>;
  isBillFavourite: (bill: BillWithId) => boolean;
}

interface Favourite {
  id: string;
  shortTitle: string;
}

export const FavouritesContext = createContext<FavouritesContextValue | null>(
  null
);

interface FavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const favourites = useSWR<Favourite[]>("/favourites", (url: string) =>
    fakeApi.get(url).then((resp) => resp.data)
  );

  const isBillFavourite = useCallback(
    (bill: BillWithId) => {
      return !!favourites.data?.find((fav) => fav.id === bill.id);
    },
    [favourites.data]
  );

  const favouriteBill = useCallback(
    async (bill: BillWithId) => {
      await fakeApi
        .post<void>("/favourites/", {
          id: bill.id,
          shortTitle: bill.shortTitleEn,
        })
        .then(() => {
          console.log("request to favorite a bill dispatched");
        });
      favourites.mutate([
        ...(favourites?.data ?? []),
        { id: bill.id, shortTitle: bill.shortTitleEn },
      ]);
    },
    [favourites]
  );

  const unfavouriteBill = useCallback(
    async (billId: string) => {
      await fakeApi.delete<void>("/favourites/" + billId).then(() => {
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
        favouriteBill,
        unfavouriteBill,
        isBillFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
