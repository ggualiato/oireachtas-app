import useSWR from "swr";
import { Legislation, Sponsor } from "../../domain/legislation";
import { useMemo, useState } from "react";
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

// const columns: GridColDef[] = [
//   {
//     field: "favourite",
//     type: "actions",
//     width: 80,
//     getActions: (params) => [<FavouriteButton billRow={params.row} />],
//   },
//   { field: "billNumber", headerName: "Bill number", width: 150 },
//   { field: "billType", headerName: "Bill type", width: 150 },
//   { field: "billStatus", headerName: "Bill status", width: 150 },
//   {
//     field: "sponsors",
//     headerName: "Sponsors",
//     width: 200,
//     renderCell: (props) => {
//       return (
//         <>
//           <SponsorsView sponsors={props.value} />
//         </>
//       );
//     },
//   },
// ];

export interface BillRow {
  id: string;
  billNumber: string;
  billType: string;
  billStatus: string;
  sponsors: Sponsor[];
}

export const BillList = () => {
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [page, setPage] = useState(1);
  const { data } = useSWR<Legislation>(
    "/v1/legislation?limit=10&skip=" + (page - 1) * 10,
    (url: string) => {
      return oireachtasApi(url).then((resp) => resp.data);
    },
    {
      keepPreviousData: true,
    }
  );
  const numberOfPages = Math.ceil((data?.head.counts.billCount ?? 0) / 10);

  const billRows: BillRow[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.results.map((item) => {
      return {
        id: item.bill.billNo + item.contextDate,
        billNumber: item.bill.billNo,
        billType: item.bill.billType,
        billStatus: item.bill.status,
        sponsors: item.bill.sponsors,
      };
    });
  }, [data]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Modal
        open={showBillDetails}
        onClose={() => setShowBillDetails(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BillModal />
      </Modal>

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
          {billRows.map((item) => {
            return (
              <TableRow
                key={item.id}
                onClick={(params) => {
                  setShowBillDetails(true);
                  console.log("params", params);
                }}
              >
                <TableCell>
                  <FavouriteButton billRow={item} />
                </TableCell>
                <TableCell>{item.billNumber}</TableCell>
                <TableCell>{item.billType}</TableCell>
                <TableCell>{item.billStatus}</TableCell>
                <TableCell>
                  <SponsorsView sponsors={item.sponsors} />
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
