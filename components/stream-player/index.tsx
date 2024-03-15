"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/lib/user-viewer-token";
import { IUser } from "@/types"
import Chat, { ChatSkeleton } from "./Chat";
import Video, { VideoSkeleton } from "./Video";
import ChatToggle from "./ChatToggle";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

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

  const { isOpen } = useChatSidebar(state => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />
  }

  return (
    <>
      {
        !isOpen && (
          <div className="hidden lg:block fixed top-[100px] right-2 z-50">
            <ChatToggle />
          </div>
        )
      }
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          !isOpen && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.name}
            hostIdentity={user.$id}
          />
        </div>
        <div className={cn(
          "col-span-1",
          !isOpen && "hidden"
        )}>
          <Chat
            viewerName={name}
            hostName={user.name}
            hostIdentity={user.$id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}