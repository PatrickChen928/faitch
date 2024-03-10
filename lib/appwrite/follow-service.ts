import { Query } from "appwrite";
import { appwriteConfig, database } from ".";
import { getCurrentUser } from "./user-service";

export const isFollowingUser = async (id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const selfId = user.$id;

    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [
        Query.equal("followerId", id),
        Query.equal("followingId", selfId)
      ]
    );

    return response.documents.length > 0;
  } catch (e) {
    return false
  }
}