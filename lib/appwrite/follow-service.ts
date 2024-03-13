import { ID, Query } from "appwrite";
import { appwriteConfig, database } from ".";
import { getCurrentUser } from "./user-service";


export const getFollowedUsers = async () => {
  const user = await getCurrentUser();
  if (!user) return [];

  const selfId = user.$id;

  const response = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.followCollectionId,
    [
      Query.equal("follower", selfId)
    ]
  );

  const res = response.documents.map((doc) => {
    return {
      ...doc,
      following: {
        ...doc.following,
        stream: {
          isLive: doc.following.stream?.live
        }
      },
      follower: {
        ...doc.follower,
        stream: {
          isLive: doc.follower.stream?.live
        }
      }
    }
  });

  return res;
}

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
        Query.equal("follower", selfId),
        Query.equal("following", id)
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
      follower: selfId,
      following: id,
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
      Query.equal("follower", selfId),
      Query.equal("following", id)
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