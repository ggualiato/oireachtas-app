import { Bill } from "../../domain/legislation";
import { useState } from "react";
import { FavouriteButton } from "../favorites/FavouriteButton";
import { SponsorsView } from "./SponsorsView";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  SelectChangeEvent,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BillModal } from "./BillModal";
import { Table } from "@mui/material";
import { useLegislationContext } from "./useLegislationContext";
import { BillStatus, statuses } from "./status";

export const BillList = () => {
  const {
    results,
    updatePage,
    updateStatusFilter,
    statusFilter,
    numberOfPages,
  } = useLegislationContext();
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
        <Modal
          open={!!billSelected}
          onClose={() => setBillSelected(undefined)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left" width={80}>
              Bill number
            </TableCell>
            <TableCell align="left" width={80}>
              Bill type
            </TableCell>
            <TableCell align="left" width={80}>
              Bill status
            </TableCell>
            <TableCell align="left" width={200}>
              Sponsors
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((item) => {
            const bill = item.bill;
            const uid = bill.billNo + bill.billYear;
            return (
              <TableRow
                key={uid}
                onClick={() => {
                  setBillSelected(bill);
                }}
              >
                <TableCell>
                  <FavouriteButton billUid={uid} />
                </TableCell>
                <TableCell>{bill.billNo}</TableCell>
                <TableCell>{bill.billType}</TableCell>
                <TableCell>{bill.status}</TableCell>
                <TableCell>
                  <SponsorsView sponsors={bill.sponsors} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
        onChange={(_event, value) => updatePage(value)}
      />
    </div>
  );
};
