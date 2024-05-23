import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FavouriteButton } from "../favorites/FavouriteButton";
import { SponsorsView } from "./SponsorsView";
import { useLegislationContext } from "./useLegislationContext";
import { Bill } from "../../domain/legislation";

interface BillsTableProps {
  onRowClick: (bill: Bill) => void;
}

export const BillsTable = ({ onRowClick }: BillsTableProps) => {
  const { results } = useLegislationContext();

  return (
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
            <TableRow key={uid} onClick={() => onRowClick(bill)}>
              <TableCell>
                <FavouriteButton bill={{ id: uid, ...bill }} />
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
  );
};
