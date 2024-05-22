import { useContext } from "react";
import { LegislationContext } from "./LegislationContext";

export const useLegislationContext = () => {
  const context = useContext(LegislationContext);

  if (context === undefined || context === null) {
    throw Error(
      "useLegislationContext should be used within LegislationProvider"
    );
  }

  return context;
};
