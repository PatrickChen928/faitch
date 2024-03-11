"use client"
import { useFollowedUsers, useGetUserByName, useIsFollowingUser } from "@/lib/react-query/follow";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import Actions from "./_components/actions";

interface UserPageProps {
  params: {
    userName: string
  }
}

export default function UserPage({ params }: UserPageProps) {

  const { data: user, isLoading: isUserLoading } = useGetUserByName(params.userName);

  const { data: isFollowingUser, mutateAsync } = useIsFollowingUser();

  useEffect(() => {
    if (user) {
      mutateAsync(user.$id);
    }
  }, [user]);

  if (isUserLoading) {
    return <div>Loading...</div>
  }


  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      {user.name}
      {user.email}
      <Actions isFollowing={!!isFollowingUser} userId={user.$id} onChange={() => {
        mutateAsync(user.$id);
      }} />
    </div>
  )
}