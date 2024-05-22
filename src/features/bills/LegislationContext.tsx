import { createContext, useCallback, useState } from "react";
import { LegislationResult } from "../../domain/legislation";
import { useSearchParams } from "react-router-dom";
import { useLegislationQuery } from "./useLegislationQuery";

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

  const { data } = useLegislationQuery(page);

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
