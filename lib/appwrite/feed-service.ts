import { getPublicStreams, getStreamsFilterBlock } from "./stream-service";
import { getCurrentUser } from "./user-service";

export const getFeedStreams = async () => {
  let self;
  try {
    self = await getCurrentUser();
  } catch (error) {
    self = null;
  }

  let streams = [];

  if (self) {
    const blockedIds = self.blocking.map((user: any) => user.$id);
    streams = await getStreamsFilterBlock(blockedIds);
  } else {
    streams = await getPublicStreams();
  }
}