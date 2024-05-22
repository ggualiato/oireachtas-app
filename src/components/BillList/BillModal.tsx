import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { CustomTabPanel } from "../CustomTabPanel";
import { Bill } from "../../domain/legislation";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface BillModalProps {
  bill: Bill;
}

export const BillModal = ({ bill }: BillModalProps) => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={style}>
      <Tabs value={value} onChange={(_e, v) => setValue(v)}>
        <Tab label="English" id="english-tab" />
        <Tab label="Gaeilge" id="gaeilge-tab" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {bill.shortTitleEn}
        </Typography>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          <div dangerouslySetInnerHTML={{ __html: bill.longTitleEn }}></div>
        </Typography> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {bill.shortTitleGa}
        </Typography>
      </CustomTabPanel>
    </Box>
  );
};
