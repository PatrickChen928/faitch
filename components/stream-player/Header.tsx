"use client";

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import VerifiedMark from "@/components/VerifiedMark";
import UserAvatar, { UserAvatarSkeleton } from "@/components/UserAvatar";
import Actions, { ActionsSkeleton } from "./Actions";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

export default function Header({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name
}: HeaderProps) {

  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          name={hostName}
          imageUrl={imageUrl}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {
            isLive ? (
              <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                <UserIcon className="w-4 h-4" />
                <p>
                  {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                </p>
              </div>
            ) : (
              <p className="font-semibold text-xs text-muted-foreground">Offline</p>
            )
          }
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  )
}