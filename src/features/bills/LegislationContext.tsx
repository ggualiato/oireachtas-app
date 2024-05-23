import { createContext } from "react";
import { LegislationResult } from "../../domain/legislation";
import { useSearchParams } from "react-router-dom";
import { useLegislationQuery } from "./useLegislationQuery";

export interface LegislationContextValue {
  results: LegislationResult[];
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

  const { data } = useLegislationQuery();

  const numberOfPages = Math.ceil((data?.head.counts.billCount ?? 0) / 10);

  return (
    <LegislationContext.Provider
      value={{
        results: data?.results ?? [],
        statusFilter: searchParams.getAll("bill_status"),
        numberOfPages,
      }}
    >
      {children}
    </LegislationContext.Provider>
  );
};
