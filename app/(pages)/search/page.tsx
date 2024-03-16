import { redirect } from "next/navigation"
import Results, { ResultsSkeleton } from "./_components/Results"
import { Suspense } from "react"

interface SearchPageProps {
  searchParams: {
    search?: string
  }
}

export default function SearchPage({
  searchParams
}: SearchPageProps) {
  if (!searchParams.search) {
    redirect("/")
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results search={searchParams.search} />
      </Suspense>
    </div>
  )
}