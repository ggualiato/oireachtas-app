import { createContext, useCallback, useState } from "react";
import {
  LegislationResponse,
  LegislationResult,
} from "../../domain/legislation";
import useSWR from "swr";
import { oireachtasApi } from "../../api";
import { BillStatus } from "./status";

export interface LegislationContextValue {
  results: LegislationResult[];
  updatePage: (newPage: number) => void;
  updateStatusFilter: (newStatuses: BillStatus[]) => void;
  statusFilter: string[];
  numberOfPages: number;
}

export const LegislationContext = createContext<LegislationContextValue | null>(
  null
);

interface LegislationProviderProps {
  children: React.ReactNode;
}

export const LegislationProvider = ({ children }: LegislationProviderProps) => {
  const [statusFilter, setStatusFilter] = useState<BillStatus[]>([]);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 10;
  const bill_status = statusFilter.join(",");
  const { data } = useSWR<LegislationResponse>(
    "/v1/legislation?limit=10&skip=" +
      skip +
      (bill_status ? "&bill_status=" + bill_status : ""),
    (url: string) =>
      oireachtasApi<LegislationResponse>(url).then((resp) => resp.data),
    {
      keepPreviousData: true,
    }
  );

  const numberOfPages = Math.ceil((data?.head.counts.billCount ?? 0) / 10);

  const updatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const updateStatusFilter = useCallback((filters: BillStatus[]) => {
    setStatusFilter(filters);
  }, []);

  return (
    <LegislationContext.Provider
      value={{
        results: data?.results ?? [],
        updateStatusFilter,
        updatePage,
        statusFilter,
        numberOfPages,
      }}
    >
      {children}
    </LegislationContext.Provider>
  );
};
