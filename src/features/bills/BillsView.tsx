import { Bill } from "../../domain/legislation";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BillModal } from "./BillModal";
import { useLegislationContext } from "./useLegislationContext";
import { BillStatus, statuses } from "./status";
import { BillsTable } from "./BillsTable";
import { useSearchParams } from "react-router-dom";

export const BillView = () => {
  const setSearchParams = useSearchParams()[1];
  const { updatePage, statusFilter, numberOfPages } = useLegislationContext();
  const [billSelected, setBillSelected] = useState<Bill>();

  const handleChange = (e: SelectChangeEvent<typeof statusFilter>) => {
    const value = e.target.value;
    const statusList =
      typeof value === "string"
        ? (value.split(",") as BillStatus[])
        : (value as BillStatus[]);

    const p = new URLSearchParams(statusList.map((i) => ["bill_status", i]));

    setSearchParams(p);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      {billSelected && (
        <Modal open={!!billSelected} onClose={() => setBillSelected(undefined)}>
          <BillModal bill={billSelected} />
        </Modal>
      )}

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Status</InputLabel>
        <Select multiple value={statusFilter} onChange={handleChange}>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <BillsTable onRowClick={(bill) => setBillSelected(bill)} />
      <Pagination
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
        onChange={(_event, value) => updatePage(value)}
      />
    </div>
  );
};
