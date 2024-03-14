import { ID, Query } from "appwrite"
import { appwriteConfig, database } from "."
import { getCurrentUser } from "./user-service"

export const isBlockedByUser = async (id: string, selfId?: string) => {
  try {
    if (!selfId) {
      const self = await getCurrentUser()

      if (!self) return false

      selfId = self.$id
    }

    if (id === selfId) {
      return false
    }


    const otherUser = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id
    )

    if (!otherUser) {
      return false
    }


    const existingBlock = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.blockCollectionId,
      [
        Query.equal("blocker", otherUser.$id),
        Query.equal("blockedBy", selfId)
      ]
    )
    return existingBlock.documents.length > 0
  } catch (e) {
    return false
  }
}

export const blockUser = async (id: string) => {
  const self = await getCurrentUser()
  if (!self) throw Error("Not logged in")

  if (self.$id === id) throw Error("Cannot block yourself")

  const otherUser = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    id
  )

  if (!otherUser) throw Error("User not found")

  const existingBlock = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.blockCollectionId,
    [
      Query.equal("blocker", otherUser.$id),
      Query.equal("blockedBy", self.$id)
    ]
  )

  if (existingBlock.documents.length > 0) throw Error("Already blocked")

  const block = await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.blockCollectionId,
    ID.unique(),
    {
      blocker: otherUser.$id,
      blockedBy: self.$id
    }
  )

  return block
}

export const unblockUser = async (id: string) => {
  const self = await getCurrentUser()
  if (!self) throw Error("Not logged in")

  if (self.$id === id) throw Error("Cannot unblock yourself")

  const otherUser = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    id
  )

  if (!otherUser) throw Error("User not found")

  const existingBlock = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.blockCollectionId,
    [
      Query.equal("blocker", otherUser.$id),
      Query.equal("blockedBy", self.$id)
    ]
  )

  if (existingBlock.documents.length === 0) throw Error("Not blocked")

  const res = await database.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.blockCollectionId,
    existingBlock.documents[0].$id
  )

  return res
}