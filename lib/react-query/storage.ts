import { useMutation } from "@tanstack/react-query"
import { createFile } from "../appwrite/storage-service"

export const useCreateFile = () => {
  return useMutation({
    mutationFn: (file: File) => createFile(file)
  })
}
