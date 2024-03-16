import { useMutation } from "@tanstack/react-query"
import { Stream, createIngress, getStreamByUserId, updateStream, uploadThumbnail } from "../appwrite/stream-service"
import { IngressInput } from "livekit-server-sdk"

export const useGetStreamByUserId = () => {
  return useMutation({
    mutationFn: (userId: string) => getStreamByUserId(userId)
  })
}

export const useUpdateStream = () => {
  return useMutation({
    mutationFn: (values: Partial<Stream>) => updateStream(values)
  })
}

export const useCreateIngress = () => {
  return useMutation({
    mutationFn: (ingressType: IngressInput) => createIngress(ingressType)
  })
}

export const useUpdateThumbnail = () => {
  return useMutation({
    mutationFn: (file: File) => uploadThumbnail(file)
  })
}