import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import Thumbnail, { ThumbnailSkeleton } from "@/components/Thumbnail"
import UserAvatar, { UserAvatarSkeleton } from "@/components/UserAvatar"

interface ResultCard {
  data: any
}

export default function ResultCard({ data }: ResultCard) {

  return (
    <Link href={`/${data.user.name}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.name}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            name={data.user.name}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-primary-600">{data.name}</p>
            <p className="text-muted-foreground">{data.user.name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}