import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  url: process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  followCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FOLLOW_COLLECTION_ID!,
  blockCollectionId: process.env.NEXT_PUBLIC_APPWRITE_BLOCK_COLLECTION_ID!,
  streamCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STREAM_COLLECTION_ID!,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export { ID } from 'appwrite'

export const account = new Account(client)

export const database = new Databases(client)

export const storage = new Storage(client)

export const avatars = new Avatars(client)