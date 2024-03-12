import { Query } from "appwrite"
import { appwriteConfig, database } from "."
import { getCurrentUser } from "./user-service"

export interface Stream {
  name: string
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export const getStreamByUserId = async (userId: string) => {
  const stream = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    [
      Query.equal("user", userId)
    ]
  )

  return stream.documents[0]
}

export const updateStream = async (values: Partial<Stream>) => {
  const self = await getCurrentUser()

  if (!self) {
    throw new Error("Unauthorized")
  }

  const selfStream = await getStreamByUserId(self.$id)

  if (!selfStream) {
    throw new Error("Stream not found")
  }


  const validData = {
    name: values.name,
    isChatEnabled: values.isChatEnabled,
    isChatDelayed: values.isChatDelayed,
    isChatFollowersOnly: values.isChatFollowersOnly,
  }

  const stream = await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    selfStream.$id,
    validData
  )
  return stream
}