"use client";

import { toast } from "sonner";
import { MinusCircle } from "lucide-react";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { useBlockUser } from "@/lib/react-query/block";
import { cn, stringToColor } from "@/lib/utils";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export default function CommunityItem({
  hostName,
  viewerName,
  participantIdentity,
  participantName
}: CommunityItemProps) {

  const { mutateAsync, isPending } = useBlockUser()

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    mutateAsync(participantIdentity)
      .then(() => {
        toast.success(`Blocked ${participantName}`)
      })
      .catch(() => {
        toast.error("Failed to block")
      })
  }
  return (
    <div className={cn(
      "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
      isPending && "opacity-50 pointer-events-none"
    )}>
      <p style={{ color: color }}>
        {participantName}
      </p>
      {
        isHost && !isSelf && (
          <Hint label="Block">
            <Button
              variant="ghost"
              disabled={isPending}
              onClick={handleBlock}
              className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            >
              {isPending ? <Loading text={<MinusCircle className="h-4 w-4 text-muted-foreground" />} /> : <MinusCircle className="h-4 w-4 text-muted-foreground" />}
            </Button>

          </Hint>
        )
      }
    </div>
  )
}