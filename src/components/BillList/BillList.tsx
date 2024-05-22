import useSWR from "swr";
import { Bill, LegislationResponse } from "../../domain/legislation";
import { useState } from "react";
import { FavouriteButton } from "../../features/favorites/FavouriteButton";
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
import { oireachtasApi } from "../../api";
import { Table } from "@mui/material";

const statuses = [
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
];

export const BillList = () => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [billSelected, setBillSelected] = useState<Bill>();
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 10;
  const bill_status = statusFilter.join(",");

  const { data } = useSWR<LegislationResponse>(
    "/v1/legislation?limit=10&skip=" +
      skip +
      (bill_status ? "&bill_status=" + bill_status : ""),
    (url: string) => oireachtasApi(url).then((resp) => resp.data),
    {
      keepPreviousData: true,
    }
  );
  const bills = data?.results ?? [];
  const numberOfPages = Math.ceil((data?.head.counts.billCount ?? 0) / 10);

  const handleChange = (e: SelectChangeEvent<typeof statusFilter>) => {
    const value = e.target.value;

    setStatusFilter(typeof value === "string" ? value.split(",") : value);
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
            <TableCell width={5}></TableCell>
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
          {bills?.map((item) => {
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
        onChange={(_event, value) => setPage(value)}
      />
    </div>
  );
};
