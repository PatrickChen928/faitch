"use client"

import { useRouter } from "next/navigation"
import qs from 'query-string'
import { SearchIcon, X } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!search) return

    const url = qs.stringifyUrl({ url: '/search', query: { search: search } }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full lg:w-420 flex items-center">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="h-9 rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {
        search && (
          <X
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            onClick={() => setSearch('')}
          />
        )
      }
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  )
}