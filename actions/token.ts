"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getUserById } from "@/lib/appwrite/user-service";
import { isBlockedByUser } from "@/lib/appwrite/block-service";

export const createViewerToken = async (hostIdentity: string, self?: { id: string; name: string }) => {
  let isGuest = false;
  if (!self) {
    self = {
      id: v4(),
      name: `guest#${Math.floor(Math.random() * 1000)}`,
    };
    isGuest = true;
  }

  const host = await getUserById(hostIdentity);

  if (!host) throw Error("User not found");

  if (!isGuest) {
    const isBlocked = await isBlockedByUser(host.$id, self.id);
    if (isBlocked) throw Error("User is blocked");
  }

  const isHost = self.id === host.$id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.name,
    }
  );
  token.addGrant({
    room: host.$id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
}