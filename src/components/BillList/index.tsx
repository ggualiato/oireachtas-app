import useSWR from "swr";
import { Legislation, Sponsor } from "../../domain/legislation";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { FavouriteButton } from "../../features/favorites/FavouriteButton";
import { SponsorsView } from "./SponsorsView";
import { Modal } from "@mui/material";
import { BillModal } from "./BillModal";
import { oireachtasApi } from "../../api";

const columns: GridColDef[] = [
  {
    field: "favourite",
    type: "actions",
    width: 80,
    getActions: (params) => [<FavouriteButton billRow={params.row} />],
  },
  { field: "billNumber", headerName: "Bill number", width: 150 },
  { field: "billType", headerName: "Bill type", width: 150 },
  { field: "billStatus", headerName: "Bill status", width: 150 },
  {
    field: "sponsors",
    headerName: "Sponsors",
    width: 150,
    renderCell: (props) => {
      return (
        <>
          <button
            style={{ color: "red" }}
            onClick={() => alert(JSON.stringify(props.value))}
          >
            View sponsors
          </button>
          <SponsorsView sponsors={props.value} />
        </>
      );
    },
  },
];

export interface BillRow {
  id: string;
  billNumber: string;
  billType: string;
  billStatus: string;
  sponsors: Sponsor[];
}

export const BillList = () => {
  const [showBillDetails, setShowBillDetails] = useState(false);
  const { data } = useSWR<Legislation>(
    "/v1/legislation?limit=50",
    (url: string) => {
      return oireachtasApi(url).then((resp) => resp.data);
    }
  );

  const formattedData: GridRowsProp = useMemo(() => {
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
      } as BillRow;
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
      <DataGrid
        onRowClick={(params) => {
          setShowBillDetails(true);
          console.log("params", params);
        }}
        rows={formattedData}
        columns={columns}
      />
      <div>{JSON.stringify(data?.head)}</div>
      <div>{data?.results.length}</div>
    </div>
  );
};
