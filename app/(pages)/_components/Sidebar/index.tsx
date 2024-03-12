"use client"

import { getRecommended } from "@/lib/appwrite/recommended-service";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import Toggle, { ToggleSkeleton } from "./Toggle";
import Wrapper from "./Wrapper";
import Following, { FollowingSkeleton } from "./Following";
import { useGetRecommended } from "@/lib/react-query/recommended";
import { useFollowedUsers } from "@/lib/react-query/follow";

export default function Sidebar() {
  const { data: recommended, isLoading } = useGetRecommended()
  const { data: followed, isLoading: isFollowedLoading } = useFollowedUsers()

  if (isLoading || isFollowedLoading) {
    return <SidebarSkeleton />
  }
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={followed} />
        <Recommended data={recommended!} />
      </div>
    </Wrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-sidebar border-r z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}