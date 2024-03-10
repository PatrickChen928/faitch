'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/user-sidebar"
import { ToggleSkeleton } from "./Toggle"
import { RecommendedSkeleton } from "./Recommended"

export default function Wrapper({ children }: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
  const { isOpen } = useSidebar((state) => state)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return (
    <aside className="fixed left-0 flex w-[70px] lg:w-60 flex-col h-full bg-sidebar border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  )

  return (
    <aside className={cn(
      "fixed left-0 flex w-[70px] lg:w-60 flex-col h-full bg-sidebar border-r border-[#2D2E35] z-50",
      !isOpen && "w-[70px]"
    )}>
      {children}
    </aside>
  )
}