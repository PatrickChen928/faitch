import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  url: process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export { ID } from 'appwrite'

export const account = new Account(client)

export const database = new Databases(client)

export const storage = new Storage(client)

export const avatars = new Avatars(client)