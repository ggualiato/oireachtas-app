import { createContext, useCallback, useState } from "react";
import {
  LegislationResponse,
  LegislationResult,
} from "../../domain/legislation";
import useSWR from "swr";
import { oireachtasApi } from "../../api";
import { useSearchParams } from "react-router-dom";

export interface LegislationContextValue {
  results: LegislationResult[];
  updatePage: (newPage: number) => void;
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
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const skip = (page - 1) * 10;

  const { data } = useSWR<LegislationResponse>(
    "/v1/legislation?limit=10&skip=" +
      skip +
      (searchParams ? "&" + searchParams.toString() : ""),
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

  return (
    <LegislationContext.Provider
      value={{
        results: data?.results ?? [],
        updatePage,
        statusFilter: searchParams.getAll("bill_status"),
        numberOfPages,
      }}
    >
      {children}
    </LegislationContext.Provider>
  );
};
