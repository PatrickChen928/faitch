import { IUser } from "@/types";
import { account, appwriteConfig, avatars, database, ID } from ".";
import { Query } from "appwrite";

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

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export const createUserAccount = async (user: IUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name, 512, 512, "5DA2FC");

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
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
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return null;
  }
}