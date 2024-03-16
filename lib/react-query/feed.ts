import { useQuery } from "@tanstack/react-query";
import { getFeedStreams } from "../appwrite/feed-service";
import { QUERY_KEYS } from "./queryKeys";

export const useGetFeedStreams = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FEED_STREAMS],
    queryFn: getFeedStreams,
  });
}