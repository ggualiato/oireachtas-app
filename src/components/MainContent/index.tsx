import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CustomTabPanel } from "../CustomTabPanel";
import { BillList } from "../BillList";

export const MainContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Bills" id="bills-tab" />
        <Tab label="Favourites" id="favourites-tab" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <BillList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>favourites</div>
      </CustomTabPanel>
    </div>
  );
};
