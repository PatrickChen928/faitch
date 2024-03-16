import { ID, Query } from "appwrite"
import { appwriteConfig, database } from "."
import { getCurrentUser } from "./user-service"
import { removeParticipant } from "@/actions/ingress"

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
        Query.equal("blocked", selfId),
        Query.equal("blocker", id)
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

  try {
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
        Query.equal("blocked", self.$id),
        Query.equal("blocker", id)
      ]
    )

    if (existingBlock.documents.length > 0) throw Error("Already blocked")

    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.blockCollectionId,
      ID.unique(),
      {
        blocked: self.$id,
        blocker: id
      }
    )
  } catch (e) { }

  try {
    await removeParticipant(self.$id, id)
  } catch (e) { }



  return null
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
      Query.equal("blocked", self.$id),
      Query.equal("blocker", id)
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

export const getBlockedUsers = async () => {
  const self = await getCurrentUser()
  if (!self) throw Error("Unauthorized")

  const blocks = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.blockCollectionId,
    [
      Query.equal("blocked", self.$id)
    ]
  )

  return blocks.documents;
}