import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../CustomTabPanel";
import { BillList } from "../BillList/BillList";
import { FavoritesProvider } from "../../features/favorites/FavoritesContext";
import { FavoritesList } from "../../features/favorites/FavoritesList";

export const MainContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <FavoritesProvider>
        <>
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
        </>
      </FavoritesProvider>
    </div>
  );
};
