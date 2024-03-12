'use client'

import Link from "next/link"
import { Clapperboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import User from "@/components/User"
import { useUser } from "@/components/UserContext"

export default function Actions() {
  const { current: data } = useUser()

  return (
    <div className="flex items-center justify-center gap-x-2 ml-2 lg:ml-0">
      {
        !!data && (
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
            <Link href={`/u/${data.name}`}>
              <Clapperboard className="w-5 h-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
        )
      }
      <User />
    </div>
  )
}