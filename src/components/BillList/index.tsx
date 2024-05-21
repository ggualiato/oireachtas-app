import React from "react";
import useSWR from "swr";
import { Legislation } from "../../domain/legislation";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMemo } from "react";

const columns: GridColDef[] = [
  {
    field: "favourite",
    headerName: "Favorite",
    width: 150,
    renderCell: () => (
      <button onClick={() => alert("hello favorite")}>Favorite</button>
    ),
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
        <button
          style={{ color: "red" }}
          onClick={() => alert(JSON.stringify(props.value[0]))}
        >
          View sponsors
        </button>
      );
    },
  },
];

export const BillList = () => {
  const { data } = useSWR<Legislation>(
    "https://api.oireachtas.ie/v1/legislation?limit=50",
    (url: string) => {
      return fetch(url).then((resp) => resp.json());
    }
  );

  const formattedData: GridRowsProp = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.results.map((item) => {
      return {
        id: item.bill.billNo,
        billNumber: item.bill.billNo,
        billType: item.bill.billType,
        billStatus: item.bill.status,
        sponsors: item.bill.sponsors,
        isFavorite: false, // call function to check if is favorite or not
      };
    });
  }, [data]);

  console.log(formattedData.length);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={formattedData} columns={columns} />
      <div>{JSON.stringify(data?.head)}</div>
      <div>{data?.results.length}</div>
    </div>
  );
};
