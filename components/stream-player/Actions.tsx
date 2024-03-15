"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useFollowUser, useUnfollowUser } from "@/lib/react-query/follow";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/components/UserContext";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export default function Actions({
  isFollowing,
  hostIdentity,
  isHost
}: ActionsProps) {
  const router = useRouter();
  const { current } = useUser();
  const { mutateAsync: followUser, isPending: followingPending } = useFollowUser();
  const { mutateAsync: unfollowUser, isPending: unfollowingPending } = useUnfollowUser();

  const toggleFollow = () => {
    if (!current) {
      router.push("/sign-in");
      return;
    };

    if (isHost) return;

    if (isFollowing) {
      unfollowUser(hostIdentity).then(() => {
        toast.success("Unfollowed");
      }).catch(() => {
        toast.error("Failed to unfollow");
      });
    } else {
      followUser(hostIdentity).then(() => {
        toast.success("Followed");
      }).catch(() => {
        toast.error("Failed to follow");
      });
    }
  }

  return (
    <Button
      disabled={followingPending || unfollowingPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      {
        followingPending || unfollowingPending ? (
          <Loading text={isFollowing ? "Following" : "Follow"} />
        ) : (
          <>
            <Heart className={cn(
              "h-4 w-4",
              isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Following" : "Follow"}
          </>
        )
      }

    </Button>
  )
}

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  )
}