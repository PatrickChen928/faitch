import { Skeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-9 w-40" />
      </div>
      <Skeleton className="mb-2 h-9 w-[300px]" />
      <div>
        <Skeleton className="h-10 w-full mb-1" />
        <Skeleton className="h-10 w-full mb-1" />
        <Skeleton className="h-10 w-full mb-1" />
      </div>
    </div>
  )
}