import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getSearch } from "../appwrite/search-service";

export const useGetFeedStreams = (search: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH],
    queryFn: () => getSearch(search),
  });
}