'use client'

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useSidebar } from "@/store/user-sidebar"
import Link from "next/link"
import UserAvatar from "../UserAvatar"
import LiveBadge from "../LiveBadge"

interface UserItemProps {
  id: string
  name: string
  imageUrl: string
  isLive?: boolean
}

export default function UserItem({
  id,
  name,
  imageUrl,
  isLive
}: UserItemProps) {
  const pathname = usePathname()
  const { isOpen } = useSidebar((state) => state)

  const href = `/${name}`
  const isActive = pathname === href
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        !isOpen ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className={cn(
          'flex items-center w-full gap-x-4',
          !isOpen && "justify-center"
        )}>
          <UserAvatar
            imageUrl={imageUrl}
            name={name}
            isLive={isLive}
            showBadge={!isOpen}
          />
          {
            isOpen && (
              <p className="truncate">
                {name}
              </p>
            )
          }
          {
            isOpen && isLive && (
              <LiveBadge className="ml-auto" />
            )
          }
        </div>
      </Link>
    </Button>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}