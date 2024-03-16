import { IUser } from "@/types";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { createUserAccount, getCurrentUser, getGetSelfByUsername, logout, updateUserBio } from "../appwrite/user-service";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: IUser) => createUserAccount(user),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useLogout = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOGOUT],
    queryFn: logout,
  });
}

export const useGetSelfByUserName = (username: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_NAME, username],
    queryFn: () => getGetSelfByUsername(username),
  });
};

export const useUpdateUserBio = () => {
  return useMutation({
    mutationFn: (bio: string) => updateUserBio(bio),
  });
}