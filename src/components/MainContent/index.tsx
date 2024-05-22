import React, { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../CustomTabPanel";
import { BillView } from "../../features/bills/BillsView";
import { FavoritesList } from "../../features/favorites/FavoritesList";

export const MainContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Bills" id="bills-tab" />
          <Tab label="Favourites" id="favourites-tab" />
        </Tabs>
        <CustomTabPanel value={activeTab} index={0}>
          <BillView />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <FavoritesList />
        </CustomTabPanel>
      </Container>
    </div>
  );
};
