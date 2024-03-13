'use client'
import { useSidebar } from "@/store/user-sidebar";
import { IUser } from "@/types";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface RecommendedProps {
  data: (IUser & {
    stream: {
      isLive: boolean
    }
  })[]
}

export default function Recommended({
  data
}: RecommendedProps) {
  const { isOpen } = useSidebar((state) => state)

  const showLabel = isOpen && data && data.length > 0

  return (
    <div className="space-y-4 pt-4 lg:pt-0">
      {
        showLabel && (
          <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">
              Recommended
            </p>
          </div>
        )
      }
      <ul className="space-y-2 px-2">
        {
          data.map((user) => (
            <UserItem
              key={user.$id}
              id={user.$id}
              name={user.name}
              imageUrl={user.imageUrl!}
              isLive={user.stream?.isLive}
            />
          ))
        }
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {
        Array.from({ length: 3 }).map((_, i) => (
          <UserItemSkeleton key={i} />
        ))
      }
    </ul>
  )
}