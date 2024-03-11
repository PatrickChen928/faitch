import { ID, Query } from "appwrite";
import { appwriteConfig, database } from ".";
import { getCurrentUser } from "./user-service";

export const isFollowingUser = async (id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const selfId = user.$id;

    if (selfId === id) return false;

    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.followCollectionId,
      [
        Query.equal("followerId", selfId),
        Query.equal("followingId", id)
      ]
    );

    return response.documents.length > 0;
  } catch (e) {
    return false
  }
}

export const followUser = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) return false;

  const selfId = user.$id;

  if (selfId === id) {
    throw new Error("You cannot follow yourself");
  };

  const otherUser = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    id
  );

  if (!otherUser) {
    throw new Error("User not found");
  }

  const response = await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.followCollectionId,
    ID.unique(),
    {
      followerId: selfId,
      followingId: id,
      following: true,
      follower: true
    }
  )

  return response;
}

export const unfollowUser = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) return false;

  const selfId = user.$id;

  if (selfId === id) {
    throw new Error("You cannot unfollow yourself");
  };

  const response = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.followCollectionId,
    [
      Query.equal("followerId", selfId),
      Query.equal("followingId", id)
    ]
  );

  if (response.documents.length === 0) {
    throw new Error("You are not following this user");
  }

  const followId = response.documents[0].$id;

  await database.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.followCollectionId,
    followId
  );

  return true;
}