import { Query } from "appwrite"
import {
  IngressInput,
} from "livekit-server-sdk"

import { appwriteConfig, database } from "."
import { getCurrentUser } from "./user-service"
import { createIngressLiveKit, resetIngress } from "@/actions/ingress"
import { createFile, getFileView } from "./storage-service"

export interface Stream {
  name: string
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  thumbnailUrl: string
  thumbnailId: string
}

export const getPublicStreams = async () => {
  const streams = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    [
      Query.equal("isLive", true),
      Query.orderDesc("isLive"),
      Query.orderDesc("$updatedAt")
    ]
  )

  return streams.documents
}

export const getStreamsFilterBlock = async (blockedIds: string[]) => {
  const userInfo = await getCurrentUser()
  const streams = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    [
      ...blockedIds.map((id) => Query.notEqual("user", id)),
      Query.equal("isLive", true),
      Query.orderDesc("isLive"),
      Query.orderDesc("$updatedAt")
    ]
  )

  return streams.documents
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

  const stream = await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    selfStream.$id,
    values
  )
  return stream
}

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getCurrentUser()

  if (!self) {
    throw new Error("Unauthorized")
  }

  await resetIngress(self.$id)

  const ingress = await createIngressLiveKit(ingressType, self.$id, self.name)

  const stream = await getStreamByUserId(self.$id)

  if (!stream) {
    throw new Error("Stream not found")
  }

  await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.streamCollectionId,
    stream.$id,
    {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey
    }
  )
}

export const uploadThumbnail = async (file: File) => {
  const res = await createFile(file)
  const fileId = res.$id
  const fileUrl = getFileView(fileId)
  return updateStream({ thumbnailUrl: fileUrl.href, thumbnailId: fileId })
}