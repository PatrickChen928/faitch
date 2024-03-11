import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserByName } from "../appwrite/user-service";
import { QUERY_KEYS } from "./queryKeys";
import { followUser, getFollowedUsers, isFollowingUser, unfollowUser } from "../appwrite/follow-service";

export const useGetUserByName = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_NAME, userName],
    queryFn: () => getUserByName(userName),
  });
}

export const useIsFollowingUser = () => {
  return useMutation({
    mutationFn: (userId: string) => isFollowingUser(userId),
  });
}

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
  });
}

export const useUnfollowUser = () => {
  return useMutation({
    mutationFn: (userId: string) => unfollowUser(userId),
  });
}

export const useFollowedUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWED_USERS],
    queryFn: getFollowedUsers,
  });
}