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

export const BillView = () => {
  const { updatePage, updateStatusFilter, statusFilter, numberOfPages } =
    useLegislationContext();
  const [billSelected, setBillSelected] = useState<Bill>();

  const handleChange = (e: SelectChangeEvent<typeof statusFilter>) => {
    const value = e.target.value;

    updateStatusFilter(
      typeof value === "string"
        ? (value.split(",") as BillStatus[])
        : (value as BillStatus[])
    );
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
