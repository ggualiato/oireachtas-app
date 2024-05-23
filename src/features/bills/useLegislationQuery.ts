import { LegislationResponse } from "../../domain/legislation";
import { useSearchParams } from "react-router-dom";
import { useOireachtasApi } from "../../services/useOireachtasApi";

export const useLegislationQuery = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const skip = `${(page - 1) * 10}`;

  const { data } = useOireachtasApi<LegislationResponse>(
    () => {
      const query = new URLSearchParams();

      query.set("limit", "10");
      query.set("skip", skip);

      return (
        "/v1/legislation?" +
        [query.toString(), searchParams.toString()].join("&")
      );
    },
    {
      keepPreviousData: true,
    }
  );

  return { data };
};
