import { Query } from "appwrite";
import { appwriteConfig, database } from "."
import { IUser } from "@/types";
import { getCurrentUser } from "./user-service";

export const getRecommended = async () => {
  let userId
  const followingIds: string[] = []
  try {
    const self = await getCurrentUser()
    userId = self?.$id

    self?.following?.forEach((fol: any) => {
      followingIds.push(fol.following?.$id)
    })
  } catch (e) { }

  let users: IUser[] = []
  if (userId) {
    users = (await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.notEqual("$id", userId),
        ...followingIds.map((id) => Query.notEqual("$id", id))
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

  users.forEach(user => {
    user.stream = {
      isLive: user.stream?.live
    }
  })
  return users;
}