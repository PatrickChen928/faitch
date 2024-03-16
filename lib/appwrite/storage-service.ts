import { ID } from "appwrite"
import { appwriteConfig, storage } from "."

export const createFile = async (file: File) => {
  const fileData = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    file
  )
  return fileData
}

export const getFileView = (fileId: string) => {
  return storage.getFileView(appwriteConfig.storageId, fileId);
}

export const deleteFile = (fileId: string) => {
  return storage.deleteFile(appwriteConfig.storageId, fileId);
}