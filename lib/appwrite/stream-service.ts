import { Query } from "appwrite"
import {
  IngressInput,
} from "livekit-server-sdk"

import { appwriteConfig, database } from "."
import { getCurrentUser } from "./user-service"
import { createIngressLiveKit, resetIngress } from "@/actions/ingress"

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