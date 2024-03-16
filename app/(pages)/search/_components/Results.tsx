import { Skeleton } from "@/components/ui/skeleton"
import ResultCart, { ResultCardSkeleton } from "./ResultCard"
import { getSearch } from "@/lib/appwrite/search-service"

interface ResultsProps {
  search: string
}

export default async function Results({ search }: ResultsProps) {

  const data = await getSearch(search)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for "{search}"
      </h2>
      {
        data.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No results found. Try another search term.
          </p>
        )
      }
      <div className="flex flex-col gap-y-4">
        {
          data.map((result: any) => (
            <ResultCart
              key={result.$id}
              data={result}
            />
          ))
        }
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
    </div>
  )
}