"use client"

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useFollowUser, useUnfollowUser } from "@/lib/react-query/follow";
import { toast } from "sonner";
import Loading from "@/components/Loading";


interface ActionsProps {
  userId: string
  isFollowing: boolean
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
  const { mutateAsync: followUser, isPending: isFollowPending } = useFollowUser()
  const { mutateAsync: unfollowUser, isPending: isUnfollowPending } = useUnfollowUser()

  const handleFollow = () => {
    if (isFollowing) {
      unfollowUser(userId).then(() => {
        toast.success("Unfollowed the user")
      }).catch((e) => {
        toast.error(e.message)
      })
    } else {
      followUser(userId).then(() => {
        toast.success("Followed the user")
      }).catch((e) => {
        toast.error(e.message)
      })
    }
  }

  return (
    <Button
      disabled={isFollowPending || isUnfollowPending}
      onClick={handleFollow}
      className="shad-button_primary"
    >
      {isFollowPending || isUnfollowPending ? <Loading text="loading" /> : isFollowing ? "Unfollow" : "Follow"}

    </Button>
  )
}