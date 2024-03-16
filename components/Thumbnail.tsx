import Image from "next/image";
import UserAvatar from "@/components/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import LiveBadge from "./LiveBadge";

interface ThumbnailProps {
  src?: string;
  fallback: string;
  isLive: boolean;
  username: string;
}

export default function Thumbnail({
  src,
  fallback,
  isLive,
  username
}: ThumbnailProps) {
  let content

  if (!src) {
    content = (
      <div className="bg-sidebar flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
        <UserAvatar
          size="lg"
          showBadge
          name={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover rounded-md transition-transform group-hover:translate-x-2 group-hover:-translate-y-1"
      />
    )
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};