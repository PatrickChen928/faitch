import { Query } from "appwrite";
import { appwriteConfig, database } from "."
import { IUser } from "@/types";

export const getRecommended = async () => {
  let userId
  // try {
  //   const self = await getCurrentUser()
  //   userId = self?.$id
  // } catch (e) { }

  let users: IUser[] = []
  if (userId) {
    users = (await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.notEqual("$id", userId),
      ]
    )).documents as IUser[];
  } else {
    users = (await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.orderDesc("$createdAt"),
      ]
    )).documents as IUser[];
  }


  if (!users) throw Error("No users found");
  return users;
}