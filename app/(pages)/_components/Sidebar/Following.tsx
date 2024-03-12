"use client"

import { useSidebar } from "@/store/user-sidebar"
import UserItem, { UserItemSkeleton } from "./UserItem"

interface FollowingProps {
  data: any
}
export default function Following({ data }: FollowingProps) {
  const { isOpen } = useSidebar(state => state)

  if (!data.length) return null

  return (
    <div>
      {
        isOpen && (
          <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        )
      }
      <ul className="space-y-2 px-2">
        {data.map(({ following: user }: any) => (
          <UserItem key={user.$id} name={user.name} id={user.$id} imageUrl={user.imageUrl} />
        ))}
      </ul>
    </div >
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </ul>
  )
}