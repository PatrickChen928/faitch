"use client"
import { useFollowedUsers, useGetUserByName, useIsFollowingUser } from "@/lib/react-query/follow";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import Actions from "./_components/actions";
import { useIsBlockedUser } from "@/lib/react-query/block";
import StreamPlayer from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string
  }
}

export default function UserPage({ params }: UserPageProps) {

  const { data: user, isLoading: isUserLoading } = useGetUserByName(params.username);
  const { data: isFollowingUser, mutateAsync: getIsFollowingUser, isPending: followingLoading } = useIsFollowingUser();
  const { data: isBlockedUser, mutateAsync: getIsBlockedUser, isPending: blockedLoading } = useIsBlockedUser();

  useEffect(() => {
    if (user) {
      getIsFollowingUser(user.$id);
      getIsBlockedUser(user.$id);
    }
  }, [user]);

  if (isUserLoading || followingLoading || blockedLoading) {
    return <div>Loading...</div>
  }

  if (!user || (!blockedLoading && isBlockedUser)) {
    notFound();
  }


  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowingUser!}
    />
  )
}
