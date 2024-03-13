import { Query } from "appwrite";
import { RegisterProps } from "@/types";
import { account, appwriteConfig, avatars, database, ID } from ".";
import { getRadomBgOfAvatar } from "@/lib/utils";

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
}) => {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      ID.unique(),
      {
        name: `${user.name}'s stream`,
        user: newUser.$id,
      }
    );


    return newUser;
  } catch (error) {
    return null
  }
}

export const createUserAccount = async (user: RegisterProps) => {
  // is username exists
  const usernameExists = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("name", user.name)]
  );

  if (usernameExists.documents.length > 0) throw Error('Username already exists');

  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  );

  if (!newAccount) throw Error;

  const avatarUrl = avatars.getInitials(user.name, 512, 512, getRadomBgOfAvatar());

  const newUser = await saveUserToDB({
    accountId: newAccount.$id,
    name: newAccount.name,
    email: newAccount.email,
    imageUrl: avatarUrl,
  });

  return newUser;
}

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
  }
}

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    return null
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    const res = currentUser.documents[0];
    res.stream = {
      isLive: res.stream?.live
    }
    return res;
  } catch (error) {
    return null;
  }
}

export const getUserByName = async (name: string) => {
  try {
    const user = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("name", name)]
    );

    if (!user) throw Error;
    return user.documents[0];
  } catch (error) {
    return null;
  }
}

export const getGetSelfByUsername = async (name: string) => {
  try {
    const self = await getCurrentUser();

    if (!self) throw Error('Unauthorized');

    const user = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("name", name)]
    );

    if (!user || user.documents.length === 0) throw Error("User not found");

    const res = user.documents[0];

    if (res.username !== self.username) throw Error('Unauthorized');

    return res;
  } catch (error) {
    return null;
  }
}