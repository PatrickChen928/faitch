import { create } from "zustand";

interface UserInfo {
  name: string;
  email: string;
  imageUrl: string;
}

interface UserInfoStore {
  userInfo: UserInfo | null
  updateUserInfo: (newUserInfo: UserInfo) => void;
};

export const userInfoStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  updateUserInfo: (newUserInfo: UserInfo) => set({
    userInfo: newUserInfo
  }),
}));