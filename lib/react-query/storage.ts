import { useMutation } from "@tanstack/react-query"
import { createFile, deleteFile } from "../appwrite/storage-service"

export const useCreateFile = () => {
  return useMutation({
    mutationFn: (file: File) => createFile(file)
  })
}

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (fileId: string) => deleteFile(fileId)
  })
}