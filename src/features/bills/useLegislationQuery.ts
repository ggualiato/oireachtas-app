import { LegislationResponse } from "../../domain/legislation";
import { useSearchParams } from "react-router-dom";
import { useOireachtasApi } from "../../services/useOireachtasApi";

export const useLegislationQuery = (page: number) => {
  const [searchParams] = useSearchParams();
  const skip = (page - 1) * 10;
  const { data } = useOireachtasApi<LegislationResponse>(
    "/v1/legislation?limit=10&skip=" +
      skip +
      (searchParams ? "&" + searchParams.toString() : ""),

    {
      keepPreviousData: true,
    }
  );

  return { data };
};
