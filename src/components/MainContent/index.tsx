import React, { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../CustomTabPanel";
import { BillList } from "../../features/bills/BillsView";
import { FavoritesProvider } from "../../features/favorites/FavoritesContext";
import { FavoritesList } from "../../features/favorites/FavoritesList";
import { LegislationProvider } from "../../features/bills/LegislationContext";

export const MainContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <LegislationProvider>
        <FavoritesProvider>
          <Container maxWidth="sm">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Bills" id="bills-tab" />
              <Tab label="Favourites" id="favourites-tab" />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <BillList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <FavoritesList />
            </CustomTabPanel>
          </Container>
        </FavoritesProvider>
      </LegislationProvider>
    </div>
  );
};
