import { Bill } from "../../domain/legislation";
import { useMemo, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { numberOfPages } = useLegislationContext();
  const [billSelected, setBillSelected] = useState<Bill>();
  const statusFilter = useMemo(() => {
    return searchParams.getAll("bill_status");
  }, [searchParams]);

  const handleChange = (e: SelectChangeEvent<typeof statusFilter>) => {
    const value = e.target.value;
    const statusList =
      typeof value === "string"
        ? (value.split(",") as BillStatus[])
        : (value as BillStatus[]);

    searchParams.delete("bill_status");

    statusList.forEach((status) => {
      searchParams.append("bill_status", status);
    });
    setSearchParams(searchParams);
  };

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        gap: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {billSelected && (
        <BillModal
          bill={billSelected}
          onClose={() => setBillSelected(undefined)}
        />
      )}

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Status</InputLabel>
        <Select
          size="medium"
          multiple
          value={statusFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <BillsTable onRowClick={(bill) => setBillSelected(bill)} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={numberOfPages}
          variant="outlined"
          shape="rounded"
          onChange={(_event, value) => {
            searchParams.set("page", value.toString());
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
};
