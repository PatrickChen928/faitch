'use client'

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/user-sidebar"
import { ToggleSkeleton } from "./Toggle"
import { RecommendedSkeleton } from "./Recommended"
import { useIsClient } from "usehooks-ts"
import { FollowingSkeleton } from "./Following"

export default function Wrapper({ children }: {
  children: React.ReactNode
}) {
  const isClient = useIsClient()
  const { isOpen } = useSidebar((state) => state)

  if (!isClient) return (
    <aside className="fixed left-0 flex w-[70px] lg:w-60 flex-col h-full bg-sidebar border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )

  return (
    <aside className={cn(
      "fixed left-0 flex w-60 flex-col h-full bg-sidebar border-r border-[#2D2E35] z-50",
      !isOpen && "w-[70px]"
    )}>
      {children}
    </aside>
  )
}