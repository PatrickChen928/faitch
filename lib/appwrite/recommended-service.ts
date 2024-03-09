import { Query } from "appwrite";
import { appwriteConfig, database } from "./config"
import { IUser } from "@/types";

export const getRecommended = async () => {
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [
      Query.orderDesc("$updatedAt"),
    ]
  );
  if (!users) throw Error("No users found");
  return users.documents as IUser[];
}