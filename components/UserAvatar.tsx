import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import LiveBadge from "./LiveBadge"

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "w-8 h-8",
      lg: "w-14 h-14",
    },
    defaultVariants: {
      size: "default",
    }
  }
})


interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  name: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
}

export default function UserAvatar({
  imageUrl,
  name,
  isLive,
  showBadge,
  size
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback className="flex items-center justify-center w-full">{name[0]} {name[name.length - 1]}</AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { }

export const UserAvatarSkeleton = ({
  size
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        "rounded-full",
        avatarSizes({ size })
      )}
    />
  )
}