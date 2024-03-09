'use client'

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useSidebar } from "@/store/user-sidebar"
import Link from "next/link"
import UserAvatar from "../UserAvatar"

interface UserItemProps {
  name: string
  imageUrl: string
  isLive?: boolean
}

export default function UserItem({
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
            showBadge={true}
          />
        </div>
      </Link>
    </Button>
  )
}