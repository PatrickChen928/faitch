import { Skeleton } from "@/components/ui/skeleton";
import { getPublicStreams } from "@/lib/appwrite/stream-service";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";

export default async function Results() {

  // TODO: filter blocked users
  const data = await getPublicStreams();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you'll like
      </h2>
      {
        data.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No streams found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {
              data.map((stream) => (
                <ResultCard key={stream.$id} data={stream} />
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
    </div>
  );
}