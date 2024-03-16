"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { IUser, RegisterProps } from "@/types";
import { createUserAccount, getCurrentUser } from "@/lib/appwrite/user-service";

interface UserContextProps {
  loading: boolean;
  current: null | IUser;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: RegisterProps) => Promise<void>;

}

const UserContext = createContext<UserContextProps>({
  loading: true,
  current: null,
  refresh: async () => { },
  login: async () => { },
  logout: async () => { },
  register: async () => { }
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    await account.createEmailSession(email, password);
    const user = await getCurrentUser();
    setUser(user as IUser);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(values: RegisterProps) {
    await createUserAccount(values)
    await login(values.email, values.password);
  }

  async function init() {
    try {
      setLoading(true);
      const res = await getCurrentUser();
      setUser(res as IUser);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, loading, login, logout, register, refresh: init }}>
      {children}
    </UserContext.Provider>
  );
}
