import { useQuery } from "@tanstack/react-query";
import { getRecommended } from "../appwrite/recommended-service";
import { QUERY_KEYS } from "./queryKeys";

export const useGetRecommended = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECOMMENDED],
    queryFn: getRecommended,
  });
}