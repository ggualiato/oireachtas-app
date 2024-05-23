import React from "react";
import { LegislationProvider } from "../features/bills/LegislationContext";
import { FavouritesProvider } from "../features/favorites/FavoritesContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <LegislationProvider>
      <FavouritesProvider>{children}</FavouritesProvider>
    </LegislationProvider>
  );
};
