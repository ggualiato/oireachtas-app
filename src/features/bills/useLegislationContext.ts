import { useContext } from "react";
import {
  LegislationContext,
  LegislationContextValue,
} from "./LegislationContext";

export const useLegislationContext = (): LegislationContextValue => {
  const context = useContext(LegislationContext);

  if (context === undefined || context === null) {
    throw Error(
      "useLegislationContext should be used within LegislationProvider"
    );
  }

  return context;
};
