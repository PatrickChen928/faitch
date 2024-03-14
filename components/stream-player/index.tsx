"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/lib/user-viewer-token";
import { IUser } from "@/types"
import Video from "./Video";

interface StreamPlayerProps {
  user: IUser;
  stream: any;
  isFollowing: boolean;
}

export default function StreamPlayer({
  user,
  stream,
  isFollowing
}: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.$id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>
  }

  return (
    <div className="w-full h-96">
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.name}
            hostIdentity={user.$id}
          />
        </div>
      </LiveKitRoom>
    </div>
  )
}