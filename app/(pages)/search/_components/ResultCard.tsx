import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import VerifiedMark from "@/components/VerifiedMark"
import { Skeleton } from "@/components/ui/skeleton"
import Thumbnail, { ThumbnailSkeleton } from "@/components/Thumbnail"

interface ResultCartProps {
  data: any
}

export default function ResultCard({ data }: ResultCartProps) {
  return (
    <Link href={`/${data.user.name}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.name}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-primary-500">
              {data.user.name}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.$updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
  )
}