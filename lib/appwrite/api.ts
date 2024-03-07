import { IUser } from "@/types";
import { account, ID } from "./config";

export const createUserAccount = async (user: IUser) => {
  try {
    const res = await account.create(ID.unique(), user.email, user.password, user.name)
  } catch (error) {
    return error
  }
}