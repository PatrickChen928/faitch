'use client'
import { useSidebar } from "@/store/user-sidebar";
import { IUser } from "@/types";
import UserItem from "./UserItem";

interface RecommendedProps {
  data: IUser[]
}

export default function Recommended({
  data
}: RecommendedProps) {
  const { isOpen } = useSidebar((state) => state)

  const showLabel = isOpen && data.length > 0
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
              name={user.name}
              imageUrl={user.imageUrl!}
              isLive={true}
            />
          ))
        }
      </ul>
    </div>
  )
}