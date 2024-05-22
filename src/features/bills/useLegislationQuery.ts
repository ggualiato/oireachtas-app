import useSWR from "swr";
import { LegislationResponse } from "../../domain/legislation";
import { oireachtasApi } from "../../api";
import { useSearchParams } from "react-router-dom";

export const useLegislationQuery = (page: number) => {
  const [searchParams] = useSearchParams();
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

  return { data };
};
