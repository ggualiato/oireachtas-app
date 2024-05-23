import useSWR, { Key, SWRConfiguration } from "swr";
import { oireachtasApi } from "./api";

export const useOireachtasApi = <T>(key: Key, options: SWRConfiguration) =>
  useSWR<T>(
    key,
    (key: string) => oireachtasApi<T>(key).then((resp) => resp.data),
    options
  );
