import { useMutation, useQuery } from "@tanstack/react-query"
import { blockUser, isBlockedByUser, unblockUser } from "../appwrite/block-service";
import { QUERY_KEYS } from "./queryKeys";

export const useIsBlockedUser = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_BLOCKED_USER, id],
    queryFn: () => isBlockedByUser(id),
  });
}

export const useBlockUser = () => {
  return useMutation({
    mutationFn: (id: string) => blockUser(id),
  });
}

export const useUnblockUser = () => {
  return useMutation({
    mutationFn: (id: string) => unblockUser(id),
  });
}