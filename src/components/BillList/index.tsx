import useSWR from "swr";
import { Legislation, Sponsor } from "../../domain/legislation";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMemo } from "react";
import { FavoriteButton } from "../../features/favorites/FavoriteButton";
import axios from "axios";
import { SponsorsView } from "./SponsorsView";

const columns: GridColDef[] = [
  {
    field: "favourite",
    type: "actions",
    width: 80,
    getActions: (params) => [<FavoriteButton billRow={params.row} />],
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
  const { data } = useSWR<Legislation>(
    "https://api.oireachtas.ie/v1/legislation?limit=50",
    (url: string) => {
      return axios(url).then((resp) => resp.data);
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
      <DataGrid rows={formattedData} columns={columns} />
      <div>{JSON.stringify(data?.head)}</div>
      <div>{data?.results.length}</div>
    </div>
  );
};
