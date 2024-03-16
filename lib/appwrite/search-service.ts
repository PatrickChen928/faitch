import { Query } from "appwrite"
import { appwriteConfig, database } from "."

export const getSearch = async (search: string) => {
  // const self = await getCurrentUser();

  let streams: any = []

  try {
    // TODO: search with user name
    streams = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      // [
      //   Query.search("name", search)
      // ]
    )
    const searchValue = search.toLocaleLowerCase()

    return streams.documents.filter((stream: any) => {
      return stream.name.toLocaleLowerCase().includes(searchValue) || stream.user.name.toLocaleLowerCase().includes(search)
    })
  } catch (e) {
    console.error(e)
  }
  return streams
}