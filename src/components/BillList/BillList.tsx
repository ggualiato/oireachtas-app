import useSWR from "swr";
import { Bill, LegislationResponse } from "../../domain/legislation";
import { useState } from "react";
import { FavouriteButton } from "../../features/favorites/FavouriteButton";
import { SponsorsView } from "./SponsorsView";
import {
  Modal,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BillModal } from "./BillModal";
import { oireachtasApi } from "../../api";
import { Table } from "@mui/material";

export const BillList = () => {
  const [billSelected, setBillSelected] = useState<Bill>();
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 10;
  const { data } = useSWR<LegislationResponse>(
    "/v1/legislation?limit=10&skip=" + skip,
    (url: string) => oireachtasApi(url).then((resp) => resp.data),
    {
      keepPreviousData: true,
    }
  );
  const bills = data?.results ?? [];
  const numberOfPages = Math.ceil((data?.head.counts.billCount ?? 0) / 10);

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

      <Table>
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
      <div>{JSON.stringify(data?.head)}</div>
      <div>{data?.results.length}</div>
    </div>
  );
};
