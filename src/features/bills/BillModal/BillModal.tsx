import { Box, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CustomTabPanel } from "../../../components/CustomTabPanel/CustomTabPanel";
import { Bill } from "../../../domain/legislation";
import { BillModalContent } from "./BillModalContent";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #0288d1",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

type PickBill = Pick<
  Bill,
  "longTitleEn" | "longTitleGa" | "shortTitleEn" | "shortTitleGa"
>;

export interface BillModalProps {
  bill: PickBill;
  onClose: () => void;
}

export const BillModal = ({ bill, onClose }: BillModalProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Modal open={!!bill} onClose={onClose}>
      <Box sx={style}>
        <Tabs value={currentTab} onChange={(_e, v) => setCurrentTab(v)}>
          <Tab label="English" id="english-tab" />
          <Tab label="Gaeilge" id="gaeilge-tab" />
        </Tabs>
        <CustomTabPanel value={currentTab} index={0}>
          <BillModalContent
            longTitle={bill.longTitleEn}
            shortTitle={bill.shortTitleEn}
          />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
          <BillModalContent
            longTitle={bill.longTitleGa}
            shortTitle={bill.shortTitleGa}
          />
        </CustomTabPanel>
      </Box>
    </Modal>
  );
};
