"use client";

import { useMemo } from "react";
import Hint from "../Hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowsOnly: boolean;
}

export default function ChatInfo({
  isDelayed,
  isFollowsOnly
}: ChatInfoProps) {
  const hint = useMemo(() => {
    if (isFollowsOnly && !isDelayed) {
      return "Only followers can chat";
    }

    if (isDelayed && !isFollowsOnly) {
      return "Messages are delayed by 3 seconds"
    }

    if (isDelayed && isFollowsOnly) {
      return "Messages are delayed by 3 seconds and only followers can chat"
    }

    return ""
  }, [isDelayed, isFollowsOnly]);

  const label = useMemo(() => {
    if (isFollowsOnly && !isDelayed) {
      return "Followers only";
    }

    if (isDelayed && !isFollowsOnly) {
      return "Slow mode"
    }

    if (isDelayed && isFollowsOnly) {
      return "Slow mode and followers only"
    }

    return ""
  }, [isDelayed, isFollowsOnly]);

  if (!isDelayed && !isFollowsOnly) {
    return null;
  }


  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">
        {label}
      </p>
    </div>
  )

}