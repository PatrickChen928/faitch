import { useMutation } from "@tanstack/react-query"
import { Stream, getStreamByUserId, updateStream } from "../appwrite/stream-service"

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